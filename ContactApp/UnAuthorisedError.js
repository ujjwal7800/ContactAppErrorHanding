const BaseError = require("./BaseError")
class UnAuthorisedError extends BaseError{
    constructor(specificMessage){
        super("UnAuthorisedError", "UnAuthorised Access", 401)
        this.specificMessage = specificMessage
    }
}

module.exports = UnAuthorisedError
