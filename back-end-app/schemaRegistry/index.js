const { processAsyncAPIDocument } = require('./asyncApi')
const {
    deleteDocument,
    getAllDocuments,
    getDocument,
    insertOrUpdateDocument,
    updateDocument,
} = require('./sqlite')
module.exports = {
    processAsyncAPIDocument,
    deleteDocument,
    getAllDocuments,
    getDocument,
    insertOrUpdateDocument,
    updateDocument,
}
