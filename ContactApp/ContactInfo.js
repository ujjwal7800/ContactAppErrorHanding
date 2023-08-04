class ContactInfo {
    static Id = 0
    constructor(typeOfContact, valueOfContact) {
        this.Id = ContactInfo.Id++
        this.typeOfContact = typeOfContact
        this.valueOfContact = valueOfContact
    }

    // updateContactInfo(newValue) {
    //     return this.valueOfContact = newValue
    // }

    updateContactInfo(parameter, newValue){
        switch (parameter){
            case "typeOfContact":
                if (typeof(newValue) != 'string'){
                    return "Invalid Type"
                }
                this.typeOfContact = newValue
                return this
            case "valueOfContact":
                if (typeof(newValue) != 'string'){
                    return "Invalid Type"
                }
                this.valueOfContact = newValue
                return this
            default:
                return "Invalid Parameter"
        }
    }


}

module.exports = ContactInfo 