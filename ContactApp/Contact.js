const ContactInfo = require("./ContactInfo")
const NotFound = require("./NotFound")
const ValidationError = require("./ValidationError") 

class Contact {
    static Id = 0
    constructor(fullName,country) {
        this.Id = Contact.Id++
        this.fullName = fullName
        this.country=country
        this.contactInfo = []
    }

    getContactId(){
        return this.Id
    }

    getContactFullName(){
        return this.fullName
    }

    updateContactFullName(newValue){
        return this.fullName = newValue
    }

    getCountry(){
        return this.country
    }

    updateCountry(newValue){
        return this.country = newValue
    }

    updateContact (parameter, newValue){
        switch (parameter){
            case "fullName":
                if (typeof(newValue) != 'string'){
                    return "Invalid Name"
                }
                this.fullName = newValue
                return this
            case "country":
                if (typeof(newValue) != 'string'){
                    return "Invalid Country"
                }
                this.country = newValue
                return this
            default:
                return "Invalid Parameter"
        }
    }

    createContactInfo(typeOfContact, valueOfContact) {
        let contactInfoCreated = new ContactInfo(typeOfContact, valueOfContact)
        this.contactInfo.push(contactInfoCreated)
        return contactInfoCreated
    }

    getAllContactInfo() {
        return this.contactInfo
    }

    findContactInfo(contactInfoId) {
        try {
            for (let index = 0; index < this.contactInfo.length; index++) {
                if (contactInfoId == this.contactInfo[index].Id) {
                    return index
                }
            }
            throw new NotFound("contact info ID not found")
        } catch (error) {
            throw error
        }
    }

    // updateContactInfo(contactInfoId, newValue) {
    //     try {
    //         if (typeof contactInfoId != "number") {
    //             throw new ValidationError("contact info ID invalid input")
    //         }
    //         let indexOfContactInfo = this.findContactInfo(contactInfoId)
    //         this.contactInfo[indexOfContactInfo].updateContactInfo(newValue)
    //         return this.contactInfo[indexOfContactInfo]
    //     } catch (error) {
    //         throw error
    //     }
    // }
    updateContactInfo(contactInfoId, parameter, newValue) {
        try {
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact info ID invalid input")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoId)
            this.contactInfo[indexOfContactInfo].updateContactInfo(parameter, newValue)
            return this.contactInfo[indexOfContactInfo]
        } catch (error) {
            throw error
        }
    }

    deleteContactInfo(contactInfoId){
        try {
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact info ID invalid input")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoId)
            this.contactInfo.splice(indexOfContactInfo, 1)
            return this.contactInfo
        } catch (error) {
            throw error   
        }
    }

    getContactInfoById(contactInfoId){
        try {
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact info ID invalid input")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoId)
            return this.contactInfo[indexOfContactInfo]
        } catch (error) {
            throw error
        }
    }
}

module.exports = Contact