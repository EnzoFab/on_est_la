module.exports = {
    MISSING_PARAMETER: {type: 'MISSING_PARAMETERS', message: 'One or several parameters are missing/invalid', status: 400},
    customError (errorMessage, type, status) {
        return {
            type: type || 'INTERNAL_ERROR',
            message: errorMessage,
            status: status || 500
        }
    }
}