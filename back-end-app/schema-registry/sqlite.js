/* eslint-disable id-length */
/* eslint-disable max-params */
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.join(__dirname, 'asyncapi.db')

// Open a connection to the SQLite database
const dataBase = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        // Log an error message if there was an issue opening the database
        console.error('Error opening SQLite database:', error.message)
    } else {
        // Log a success message if the connection was established successfully
        console.log('Connected to SQLite database.')
    }
})

// Serialize database operations to ensure they are executed sequentially
dataBase.serialize(() => {
    // Create a table named 'asyncapi_document' if it doesn't already exist
    dataBase.run(
        `
    CREATE TABLE IF NOT EXISTS asyncapi_document (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apiName TEXT UNIQUE,
      version TEXT,
      schemas TEXT,
      examples TEXT,
      urls TEXT
    )
  `,
        (error) => {
            if (error) {
                // Log an error message if there was an issue creating the table
                console.error('Error creating table:', error.message)
            }
        },
    )
})

/**
 * @function checkDocumentExists
 * @description Checks if a document with the specified API name exists.
 * @param {string} apiName - The name of the API document.
 * @returns {Promise<boolean>} Resolves to true if the document exists, otherwise false.
 */
const checkDocumentExists = (apiName) => {
    return new Promise((resolve, reject) => {
        dataBase.get(
            `
      SELECT id FROM asyncapi_document WHERE apiName = ?
    `,
            [apiName],
            (error, row) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(!!row)
                }
            },
        )
    })
}

/**
 * @async
 * @function insertOrUpdateDocument
 * @description Inserts a new document or updates an existing one.
 * @param {string} apiName - The name of the API document.
 * @param {string} version - The version of the API document.
 * @param {object} schemas - The schemas associated with the API document.
 * @param {object} examples - The examples associated with the API document.
 * @param {object} urls - The URLs associated with the API document.
 * @returns {Promise<object>} Resolves to an object indicating the action taken ('inserted' or 'updated').
 * @throws {Error} Throws an error if inserting or updating fails.
 */
const insertOrUpdateDocument = async (
    apiName,
    version,
    schemas,
    examples,
    urls,
) => {
    const schemasString = JSON.stringify(schemas)
    const examplesString = JSON.stringify(examples)
    const urlsString = JSON.stringify(urls)

    try {
        const exists = await checkDocumentExists(apiName)

        if (exists) {
            // Update existing document
            const result = await new Promise((resolve, reject) => {
                dataBase.run(
                    `
          UPDATE asyncapi_document
          SET version = ?, schemas = ?, examples = ?, urls = ?
          WHERE apiName = ?
        `,
                    [
                        version,
                        schemasString,
                        examplesString,
                        urlsString,
                        apiName,
                    ],
                    (error) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve({
                                action: 'updated',
                                changes: this.changes,
                            })
                        }
                    },
                )
            })
            return result
        }
        // Insert new document
        const result = await new Promise((resolve, reject) => {
            dataBase.run(
                `
          INSERT INTO asyncapi_document (apiName, version, schemas, examples, urls)
          VALUES (?, ?, ?, ?, ?)
        `,
                [apiName, version, schemasString, examplesString, urlsString],
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({ action: 'inserted', id: this.lastID })
                    }
                },
            )
        })
        return result
    } catch (error) {
        throw new Error(
            `Error inserting or updating document: ${error.message}`,
        )
    }
}

/**
 * @async
 * @function getDocument
 * @description Retrieves a document by its API name.
 * @param {string} apiName - The name of the API document.
 * @returns {Promise<object>} Resolves to the document data.
 * @throws {Error} Throws an error if retrieving the document fails.
 */
const getDocument = async (apiName) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.get(
                'SELECT * FROM asyncapi_document WHERE apiName = ?',
                [apiName],
                (error, row) => {
                    if (error) {
                        reject(error)
                    } else {
                        row.urls = JSON.parse(row.urls)
                        row.examples = JSON.parse(row.examples)
                        row.schemas = JSON.parse(row.schemas)
                        resolve(row)
                    }
                },
            )
        })
    } catch (error) {
        throw new Error(`Error getting document: ${error.message}`)
    }
}

/**
 * @async
 * @function getAllDocuments
 * @description Retrieves all documents.
 * @returns {Promise<object[]>} Resolves to an array of document data.
 * @throws {Error} Throws an error if retrieving the documents fails.
 */
const getAllDocuments = async () => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.all(
                'SELECT * FROM asyncapi_document',
                [],
                (error, rows) => {
                    if (error) {
                        reject(error)
                    } else {
                        rows.forEach((row) => {
                            row.urls = JSON.parse(row.urls)
                            row.examples = JSON.parse(row.examples)
                            row.schemas = JSON.parse(row.schemas)
                        })
                        resolve(rows)
                    }
                },
            )
        })
    } catch (error) {
        throw new Error(`Error getting all documents: ${error.message}`)
    }
}

/**
 * @async
 * @function updateDocument
 * @description Updates an existing document by its ID.
 * @param {number} id - The ID of the document to update.
 * @param {string} apiName - The new API name of the document.
 * @param {string} version - The new version of the document.
 * @param {object} schemas - The new schemas associated with the document.
 * @param {object} examples - The new examples associated with the document.
 * @param {object} urls - The new URLs associated with the document.
 * @returns {Promise<number>} Resolves to the number of rows changed.
 * @throws {Error} Throws an error if updating the document fails.
 */
const updateDocument = async (
    id,
    apiName,
    version,
    schemas,
    examples,
    urls,
) => {
    const schemasString = JSON.stringify(schemas)
    const examplesString = JSON.stringify(examples)
    const urlsString = JSON.stringify(urls)

    try {
        return await new Promise((resolve, reject) => {
            dataBase.run(
                `
        UPDATE asyncapi_document
        SET apiName = ?, version = ?, schemas = ?, examples = ?, urls = ?
        WHERE id = ?
      `,
                [
                    apiName,
                    version,
                    schemasString,
                    examplesString,
                    urlsString,
                    id,
                ],
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(this.changes)
                    }
                },
            )
        })
    } catch (error) {
        throw new Error(`Error updating document: ${error.message}`)
    }
}

/**
 * @async
 * @function deleteDocument
 * @description Deletes a document by its ID.
 * @param {number} id - The ID of the document to delete.
 * @returns {Promise<number>} Resolves to the number of rows changed.
 * @throws {Error} Throws an error if deleting the document fails.
 */
const deleteDocument = async (idValue) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.run(
                `
        DELETE FROM asyncapi_document WHERE id = ?
      `,
                [idValue],
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(this.changes)
                    }
                },
            )
        })
    } catch (error) {
        throw new Error(`Error deleting document: ${error.message}`)
    }
}

module.exports = {
    deleteDocument,
    getAllDocuments,
    getDocument,
    insertOrUpdateDocument,
    updateDocument,
}
