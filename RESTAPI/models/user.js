const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const getValidationConstants = require('../utils/validationContasts')
const vc = getValidationConstants('user')

// const EMAIL_MAX_LENGTH = 80
// const NAME_MAX_LENGTH = 20
// const PASSWORD_MIN_LENGTH = 6
// const PASSWORD_MAX_LENGTH = 30
// const PASSWORD_PATTERN = new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`)

// const PASSWORD_ERROR = `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`
const PASSWORD_PATTERN = vc.password.pattern.value
const PASSWORD_ERROR = vc.password.pattern.message

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [vc.email.required.value, vc.email.required.message],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'Invalid email'],
        maxlength: [vc.email.maxLength.value, vc.email.maxLength.message]
    },
    firstName: {
        type: String,
        // required: [true, 'First name is required'],
        match: [vc.firstName.pattern.value, vc.firstName.pattern.message],
        maxlength: [vc.firstName.maxLength.value, vc.firstName.maxLength.message]
    },
    lastName: {
        type: String,
        // required: [true, 'Last name is required'],
        match: [vc.lastName.pattern.value, vc.lastName.pattern.message],
        maxlength: [vc.lastName.maxLength.value, vc.lastName.maxLength.message]
    },
    password: {
        type: String,
        // required: [true, 'Password is required'],
        // minlength: [PASSWORD_MIN_LENGTH, `Minimum length of password is ${PASSWORD_MIN_LENGTH} symbols.`],
        // maxlength: [PASSWORD_MAX_LENGTH, `Maximum length of password is ${PASSWORD_MAX_LENGTH} symbols.`]
    },
    isAdmin: {
        type: Boolean
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    confirmationToken: {
        type: String
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        sizeName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        }
    }]
})

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

function formatName(name) {
    const splitNames = name.split('-')
    return splitNames.map(sn => sn.charAt(0).toUpperCase() + sn.slice(1).toLowerCase()).join('-')
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){

        if(!PASSWORD_PATTERN.test(this.password)) {
            throw new SyntaxError(PASSWORD_ERROR)
        }

       this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT))
    }

    if(this.isModified('firstName')){
        this.firstName = formatName(this.firstName)
    }

    if(this.isModified('lastName')){
        this.lastName = formatName(this.lastName)
    }

    next()
})

module.exports = mongoose.model('User' , userSchema)