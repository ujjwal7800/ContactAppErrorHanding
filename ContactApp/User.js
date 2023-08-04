const Contact = require("./Contact")
const UnAuthorizedError = require("./UnAuthorisedError")
const NotFound = require("./NotFound")
const ValidationError = require("./ValidationError") 

class User {
    static Id = 0;
    static allUsers = []
    constructor(fullName, gender, age, isAdmin) {
        this.Id = User.Id++
        this.fullName = fullName
        this.gender = gender
        this.age = age
        this.isAdmin = isAdmin
        this.contacts = []
    }

    newUser(fullName, gender, age) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            if (typeof fullName != "string") {
                throw new ValidationError("full name is not valid")
            }
            if (typeof gender != "string") {
                throw new ValidationError("Gender is not valid")
            }
            if (typeof age != "number") {
                throw new ValidationError("Age is not valid")
            }
            let userObj = new User(fullName, gender, age, false)
            User.allUsers.push(userObj)
            return userObj
        } 
        catch (error) {
            return error
        }
    }

    static newAdmin(fullName, gender, age) {
        try {
            if (typeof fullName != "string") {
                throw new ValidationError("full name is not valid")
            }
            if (typeof gender != "string") {
                throw new ValidationError("Gender is not valid")
            }
            if (typeof age != "number") {
                throw new ValidationError("Age is not valid")
            }
            return new User(fullName, gender, age, true)
        } catch (error) {
            return error
        }
    }

    getAllUsers() {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    findUser(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            if (typeof userID != "number") {
                throw new ValidationError("user ID invalid input")
            }
            for (let index = 0; index < User.allUsers.length; index++) {
                if (userID == User.allUsers[index].Id) {
                    return index
                }
            }
            throw new NotFound("user ID not found") 
        } catch (error) {
            throw error
        }
    }

    updateUser(userId, parameter, newValue) {
        try {
            if (typeof userId != "number") {
                throw new ValidationError("user ID is not valid")
            }
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            let indexOfUser = this.findUser(userId)
            switch (parameter) {
                case "fullName": if (typeof newValue != "string") { throw new ValidationError("full name is not valid") }
                    User.allUsers[indexOfUser].fullName = newValue
                    return User.allUsers[indexOfUser]
                case "gender": if (typeof newValue != "string") { throw new ValidationError("gender is not valid") }
                    User.allUsers[indexOfUser].gender = newValue
                    return User.allUsers[indexOfUser]
                case "age": if (typeof newValue != "number") { throw new ValidationError("age is not valid") }
                    User.allUsers[indexOfUser].country = newValue
                    return User.allUsers[indexOfUser]
                default: throw new NotFound("parameter not found") 
            }
        } catch (error) {
            return error
        }
    }

    deleteUser(userId) {
        try {
            if (typeof userId != "number") {
                throw new ValidationError("user ID is not valid")
            }
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            let indexOfUser = this.findUser(userId)
            User.allUsers.splice(indexOfUser, 1)
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    createContact(ContactName,country) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof ContactName != "string") {
                throw new ValidationError("Contact name is not valid")  
            }
            if (typeof country != "string") {
                throw new ValidationError("country is not valid")  
            }
            let createdContact = new Contact(ContactName,country)
            this.contacts.push(createdContact)
        } catch (error) {
            return error
        }
    }
   
    getAllContact() {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            return this.contacts
        } catch (error) {
            return error
        }
    }

    findContact(contactId) {
        try {
            for (let i = 0; i < this.contacts.length; i++) {
                if (contactId == this.contacts[i].getContactId()) {
                    return i
                }
            }
            throw new NotFound("contact ID not found")
        } catch (error) {
            throw error
        }
    }
    updateContact(contactId, parameter, newValue) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            
            let indexOfContact = this.findContact(contactId)
            
            let modifiedContact=this.contacts[indexOfContact].updateContact(parameter, newValue)
            return modifiedContact
        } catch (error) {
            return error
        }
    }

   

    deleteContact(contactId) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts.splice(indexOfContact, 1)
        } catch (error) {
            return error
        }
    }

    createContactInfo(contactId, typeOfContact, valueOfContact) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].createContactInfo(typeOfContact, valueOfContact)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    getAllContactInfo(contactId) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].getAllContactInfo()
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    
    updateContactInfo(contactId, contactInfoId, typeOfContact, valueOfContact) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].updateContactInfo(contactInfoId, typeOfContact, valueOfContact)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    deleteContactInfo(contactId, contactInfoId){
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].deleteContactInfo(contactInfoId)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    getUserById(userId){
        try {
            if(!this.isAdmin){
                throw new UnAuthorizedError("you are not admin")
            }
            if(typeof userId != "number"){
                throw new ValidationError("user ID is not valid")
            }
            let indexOfUser = this.findUser(userId)
            return User.allUsers[indexOfUser]
        } catch (error) {
            return error
        }
    }

    getContactById(contactId){
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if(typeof contactId != "number"){
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    getContactInfoById(contactId, contactInfoId){
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if(typeof contactId != "number"){
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            return this.contacts[indexOfContact].getContactInfoById(contactInfoId)
        } catch (error) {
            return error   
        }
    }
}

//New Admin
console.log("Create admin:");
let admin = User.newAdmin("Ujjwal Jha", "male", 22)
console.log(admin);

//Create user
console.log("Create user:");
let user1 = admin.newUser("Rahul saha","Male",30)
console.log(user1);
let user2 = admin.newUser("siddhi ", "Female",20)
console.log(user2);
let user3 = admin.newUser("xyz", "male",15)
console.log(user3);

//Read user
console.log("read user before updation: ");
console.log(admin.getAllUsers());

// // update user
let updateuser3 = admin.updateUser(3, "fullName", "Anchal")
console.log("read user after updation:");
console.log(admin.getAllUsers());

delete user
let deleteuser3 = admin.deleteUser(3)
console.log("read user after deletion:");
console.log(admin.getAllUsers());

//Create Contact
user1.createContact("Ujjwal Jha contact", "India")
user1.createContact("Rahul saha contact", "Australia")
user1.createContact("Siddhi contact", "Srilanka")

// //Read contact
console.log("Read Contact before updation:");
console.log(user1.getAllContact());

//Update contact
console.log("Read Contact after updation:");
console.log(user1.updateContact(2, "fullName","Xyz Contact")); 
console.log(user1.updateContact(2, "country","USA"));

//Delete contact
console.log(user1.deleteContact(1));
console.log("Read contact after deletion:");
console.log(user1.getAllContact());

//Create contact info
console.log("Create contact info:");
console.log(user1.createContactInfo(0, "phone", 1234567890));
console.log(user1.createContactInfo(2, "email", "siddhi@gmail.com"));

//Read contact info
console.log("Read contact info before updation:");
console.log(user1.getAllContactInfo(0));

//Update contact info
console.log("Read contact info after updation:");
console.log(user1.updateContactInfo(0,0,"typeOfContact","email"));
console.log(user1.updateContactInfo(0,0,"valueOfContact","ujjwal@fmail.com"));

//Delete contact info
console.log(user1.deleteContactInfo(0, 0));
console.log("Read contact info after deletion:");
console.log(user1.getAllContactInfo(0));












// // //Get user by ID
// // console.log("Get user by ID:");
// // console.log(admin.getUserById(1));

// // //get contact by ID
// // console.log("Get contact by ID:");
// // console.log(user1.getContactById(0));

// // //get contact info by ID
// // console.log("Get contact info by ID:");
// // console.log(user1.getContactInfoById(0, 0));