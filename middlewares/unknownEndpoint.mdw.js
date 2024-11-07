const { ErrorHandler } = require('./errorHandler.mdw');

function unknownEndpoint(req, res) {
    throw new ErrorHandler(404, "Unknown endpoint")
};

module.exports = unknownEndpoint;