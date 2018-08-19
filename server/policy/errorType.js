module.exports = {
    MISSING_PARAMETER: {type: 'MISSING_PARAMETERS', message: 'One or several parameters are missing/invalid', status: 400},
    FORBIDDEN: {type: 'FORBIDDEN', message: 'User try to do something he isn\'t granted do', status: 403},
    customError (errorMessage, type, status) {
        return {
            type: type || 'INTERNAL_ERROR',
            message: errorMessage,
            status: status || 500
        }
    }
}