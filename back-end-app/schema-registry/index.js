const fs = require('fs').promises;
const { convert } = require('@asyncapi/converter');
const jsf = require('json-schema-faker');
const yaml = require('yaml');
const path = require('path');
const sqliteOperations = require('./sqlite');
const { randomUUID } = require('crypto');

/**
 * Determines the file type based on the file extension.
 * @param {string} filePath - Path to the file.
 * @returns {string} - Returns 'json' or 'yaml'.
 * @throws {Error} - Throws an error if the file type is unsupported.
 */
const getFileType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.json') return 'json';
    if (ext === '.yaml' || ext === '.yml') return 'yaml';
    throw new Error('Unsupported file type');
};

/**
 * Loads an AsyncAPI document from a file.
 * @param {string} filePath - Path to the file.
 * @returns {Promise<object>} - Returns the parsed AsyncAPI document.
 * @throws {Error} - Throws an error if reading or parsing the file fails.
 * @async
 */
const loadAsyncAPIDocument = async (filePath) => {
    try {
        const fileType = getFileType(filePath);
        const content = await fs.readFile(filePath, 'utf8'); // Use async fs.readFile

        if (fileType === 'json') {
            return JSON.parse(content);
        } else if (fileType === 'yaml') {
            return yaml.parse(content);
        }
    } catch (error) {
        console.error('Error loading AsyncAPI document:', error.message);
        throw error;
    }
};

/**
 * Converts an AsyncAPI document to the latest version.
 * @param {object} asyncapiDoc - The AsyncAPI document.
 * @returns {Promise<object>} - Returns the converted AsyncAPI document.
 * @throws {Error} - Throws an error if the conversion fails.
 * @async
 */
const convertAsyncAPIDocument = async (asyncapiDoc) => {
    try {
        return await convert(asyncapiDoc, '3.0.0'); // Replace with the latest version if different
    } catch (error) {
        console.error('Error converting AsyncAPI document:', error.message);
        throw error;
    }
};

/**
 * Extracts schemas from an AsyncAPI document.
 * @param {object} asyncapiDoc - The AsyncAPI document.
 * @returns {object} - Returns the schemas object.
 */
const extractSchemas = (asyncapiDoc) => {
    if (asyncapiDoc.components && asyncapiDoc.components.schemas) {
        return asyncapiDoc.components.schemas;
    }
    return {};
};

/**
 * Extracts messages from an AsyncAPI document.
 * @param {object} asyncapiDoc - The AsyncAPI document.
 * @returns {object} - Returns the messages object.
 */
const extractMessages = (asyncapiDoc) => {
    if (asyncapiDoc.components && asyncapiDoc.components.messages) {
        return asyncapiDoc.components.messages;
    }
    return {};
};

/**
 * Extracts URLs from an AsyncAPI document.
 * @param {object} asyncapiDoc - The AsyncAPI document.
 * @returns {string[]} - Returns an array of URLs.
 */
const extractUrls = (asyncapiDoc) => {
    const urls = [];
    if (asyncapiDoc.servers) {
        for (const serverName in asyncapiDoc.servers) {
            const server = asyncapiDoc.servers[serverName];
            urls.push(`${server.protocol}://${server.host}`);
        }
    }
    return urls;
};

/**
 * Generates a default event based on schema.
 * @param {object} schema - The schema object.
 * @param {string} schemaId - The schema ID.
 * @param {object} messages - The messages object.
 * @param {string} apiName - The API name.
 * @returns {object} - Returns the generated example event.
 */
const generateDefaultEvent = (schema, schemaId, messages, apiName) => {
    jsf.option({
        requiredOnly: true,
        useDefaultValue: true,
        useExamplesValue: true,
    });

    try {
        // Find corresponding message example
        let exampleJson = null;
        if (messages) {
            const messageWithExample = Object.values(messages).find(
                (message) => message.payload && message.payload.$ref && message.payload.$ref.includes(schemaId)
            );
            if (messageWithExample && messageWithExample.examples && messageWithExample.examples.length > 0) {
                exampleJson = { ...messageWithExample.examples[0], apiName, id: randomUUID() };
            }
        }

        // Generate example if not found in messages
        if (!exampleJson) {
            exampleJson = {
                apiName,
                id: randomUUID(),
                name: schemaId.substring(schemaId.lastIndexOf('/') + 1),
                payload: jsf.generate(schema),
            };
        }

        return exampleJson;
    } catch (error) {
        console.error('Error generating default event:', error.message);
        throw error;
    }
};

/**
 * Processes subschemas to generate examples.
 * @param {object} schema - The schema object.
 * @param {string} schemaId - The schema ID.
 * @param {object} messages - The messages object.
 * @param {string} apiName - The API name.
 * @returns {object} - Returns the generated example event.
 */
const processSubschemas = (schema, schemaId, messages, apiName) => {
    try {
        return generateDefaultEvent(schema, schemaId, messages, apiName);
    } catch (error) {
        console.error('Error processing subschemas:', error.message);
        throw error;
    }
};

/**
 * Processes an AsyncAPI document: loads, converts, extracts data, and stores it in SQLite.
 * @param {string} filePath - Path to the AsyncAPI document file.
 * @returns {Promise<string>} - Returns the API name.
 * @throws {Error} - Throws an error if any processing step fails.
 * @async
 */
const processAsyncAPIDocument = async (filePath) => {
    try {
        // Load AsyncAPI document
        const asyncapiDoc = await loadAsyncAPIDocument(filePath);

        // Convert to the latest version
        const latestAsyncAPIDoc = await convertAsyncAPIDocument(asyncapiDoc);

        // Extract information
        const apiName = latestAsyncAPIDoc.info.title || 'Unknown API';
        const version = latestAsyncAPIDoc.info.version || 'Unknown Version';
        const asyncapiDocument = {
            apiName,
            examples: [],
            schemas: [],
            urls: extractUrls(latestAsyncAPIDoc),
            version,
        };

        // Extract schemas and messages
        const componentsSchemas = extractSchemas(latestAsyncAPIDoc);
        const componentsMessages = extractMessages(latestAsyncAPIDoc);

        // Process each schema
        for (const schemaNamespace in componentsSchemas) {
            const namespaceSchemas = componentsSchemas[schemaNamespace];
            for (const schemaName in namespaceSchemas) {
                const schema = namespaceSchemas[schemaName];
                const schemaId = `#/components/schemas/${schemaNamespace}/${schemaName}`;

                // Generate examples for the main schema and subschemas recursively
                const examples = processSubschemas(schema, schemaId, componentsMessages, apiName);

                // Add schema and examples to the document
                asyncapiDocument.schemas.push({
                    [schemaName]: schema
                });

                asyncapiDocument.examples.push(examples);
            }
        }

        // Store document in SQLite
        const result = await sqliteOperations.insertOrUpdateDocument(
            'abc',
            asyncapiDocument.version,
            asyncapiDocument.schemas,
            asyncapiDocument.examples,
            asyncapiDocument.urls
        );

        if (result.action === 'inserted') {
            console.log(`Inserted new AsyncAPI document with ID ${result.id}`);
        } else if (result.action === 'updated') {
            console.log(`Updated existing AsyncAPI document with ${result.changes} changes`);
        }
        return apiName;
    } catch (error) {
        console.error('Error processing AsyncAPI document:', error.message);
        throw error;
    }
};

module.exports = { processAsyncAPIDocument };
