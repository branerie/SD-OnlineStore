const mongoose = require('mongoose')
const { getAllCategories } = require('../utils/product')

const SIZE_MIN_LENGTH = 1
const SIZE_MAX_LENGTH = 4
const BRAND_MAX_LENGTH = 30
const DESCRIPTION_MAX_LENGTH = 1000

const productSchema = new mongoose.Schema({
    sizes: [{
        sizeName: {
            type: String,
            required: true,
            match: [/^[A-Z0-9]{1,4}$/, `Size can only contain capital letters and digits and must be between ${SIZE_MIN_LENGTH} and ${SIZE_MAX_LENGTH} symbols`],
        },
        count: {
            type: Number,
            required: true,
            min: [0, 'Negative product count is not allowed.']
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, 'Negative price is not allowed.']
    },
    discount: {
        percent: {
            type: Number,
            min: [0, 'Negative discount is not allowed.'],
            max: [1, 'Cannot have more than 100% discount']
        },
        endDate: {
            validate: {
                validator: (value) => value > new Date(),
                message: () => 'Cannot set a discount expiration date in the past.'
            },
            type: Date,
        }
    },
    brand: {
        type: String,
        required: true,
        maxlength: [BRAND_MAX_LENGTH, `Please rename your brand. Maximum ${BRAND_MAX_LENGTH} symbols allowed.`]
    },
    description: {
        type: String,
        required: true,
        max: [DESCRIPTION_MAX_LENGTH, `Description cannot be longer than ${DESCRIPTION_MAX_LENGTH} symbols.`]
    },
    images: [{
        type: String,
        // match: [/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/, 'Invalid image URL']
    }],
    gender: {
        type: String,
        enum: ['M', 'F', 'U']
    },
    categories: [{
        type: String,
        enum: getAllCategories()
    }],
    addDate: {
        type: Date
    }
})

productSchema.pre('validate', preprocessDiscountOnCreate)
productSchema.pre('findOneAndUpdate', preprocessDiscountOnUpdate)
productSchema.pre('update', preprocessDiscountOnUpdate)
productSchema.pre('save', processAddDateOnCreate )

productSchema.virtual('discountPrice').get(function () {
    return this.price * (1 - this.discount.percent)
})

function processAddDateOnCreate(next) {
    if(this.isNew){
        this.addDate = new Date()
    }

    return next()
}

function preprocessDiscountOnCreate(next) {
    if (this.discount.$isEmpty()){
        return next()
    }
    
    if (this.discount.hasOwnProperty('endDate') &&
        this.discount.hasOwnProperty('percent')) {
        if (this.discount.percent && this.discount.endDate) {
            this.discount.percent /= 100
            return next() 
        }                   
    }

    throw new SyntaxError('Invalid input. Product discount must contain "percent" and "endDate" fields.')
}

function preprocessDiscountOnUpdate(next) {
    const update = this.getUpdate()

    if (update.hasOwnProperty('$set') &&
        update.$set.hasOwnProperty('discount') && 
        update.$set.discount.hasOwnProperty('percent')) {

        const discount = update.$set.discount
        if (!discount.hasOwnProperty('endDate') || !discount.endDate) {
            throw new SyntaxError('Product discount must have an end date.')
        }
        
        update.$set.discount.percent /= 100
    }

    next()
}

module.exports = mongoose.model('Product', productSchema)