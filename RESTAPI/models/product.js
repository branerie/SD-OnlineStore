const mongoose = require('mongoose')
const { getAllCategories } = require('../utils/product')

const getValidationConstants = require('../utils/validationContasts')
const vc = getValidationConstants('product')

// const SIZE_MIN_LENGTH = 1
// const SIZE_MAX_LENGTH = 30
// const BRAND_MAX_LENGTH = 30
// const DESCRIPTION_MAX_LENGTH = 1000

const productSchema = new mongoose.Schema({
    sizes: [{
        sizeName: {
            type: String,
            required: [vc.sizes.sizeName.required.value, vc.sizes.sizeName.required.message],
            minlength: [vc.sizes.sizeName.minLength.value, vc.sizes.sizeName.minLength.message],
            maxlength: [vc.sizes.sizeName.maxLength.value, vc.sizes.sizeName.maxLength.message]
        },
        count: {
            type: Number,
            required: [vc.sizes.count.required.value, vc.sizes.count.required.message],
            min: [vc.sizes.count.min.value, vc.sizes.count.min.message],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        }
    }],
    price: {
        type: Number,
        required: [vc.price.required.value, vc.price.required.message],
        min: [vc.price.min.value, vc.price.min.message]
    },
    discount: {
        percent: {
            type: Number,
            min: [vc.discount.percent.min.value, vc.discount.percent.min.message],
            max: [vc.discount.percent.max.value, vc.discount.percent.max.message]
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
        required: [vc.brand.required.value, vc.brand.required.message],
        maxlength: [vc.brand.maxLength.value, vc.brand.maxLength.message]
    },
    description: {
        type: String,
        required: [vc.description.required.value, vc.description.required.message],
        maxlength: [vc.description.maxLength.value, vc.description.maxLength.message]
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
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rating: {
        currentRating: {
            type: Number,
            min: 0
        },
        counter: {
            type: Number,
            min: 0,
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        }
    }
})

// productSchema.pre('validate', preprocessDiscountOnCreate)
// productSchema.pre('findOneAndUpdate', preprocessDiscountOnUpdate)
// productSchema.pre('update', preprocessDiscountOnUpdate)
productSchema.pre('save', processAddDateOnCreate)

productSchema.virtual('discountPrice').get(function () {
    return this.discount.percent
        ? parseFloat((this.price * (1 - this.discount.percent)).toFixed(2))
        : this.price
})

productSchema.virtual('viewRatingStars').get(function() {
    if (this.rating.counter === 0) {
        return 0
    }

    return Math.round(this.rating.currentRating / this.rating.counter)
})

productSchema.virtual('viewRatingCount').get(function() {
    return this.rating.counter
})

// productSchema.index({ categories: 'text' })

function processAddDateOnCreate(next) {
    if (this.isNew) {
        this.addDate = new Date()
    }

    return next()
}

// function preprocessDiscountOnCreate(next) {
//     if (this.discount.$isEmpty() || !this.discount.isModified()){
//         return next()
//     }

//     if (this.discount.hasOwnProperty('endDate') &&
//         this.discount.hasOwnProperty('percent')) {
//         if (this.discount.percent && this.discount.endDate) {
//             this.discount.percent /= 100

//             return next()  
//         }            
//     }

//     throw new SyntaxError('Invalid input. Product discount must contain "percent" and "endDate" fields.')
// }

// function preprocessDiscountOnUpdate(next) {
//     const update = this.getUpdate()

//     if (update.hasOwnProperty('$set') &&
//         update.$set.hasOwnProperty('discount') &&
//         update.$set.discount.hasOwnProperty('percent')) {

//         const discount = update.$set.discount
//         if (!discount.hasOwnProperty('endDate') || !discount.endDate) {
//             throw new SyntaxError('Product discount must have an end date.')
//         }

//         update.$set.discount.percent /= 100
//     }

//     next()
// }

module.exports = mongoose.model('Product', productSchema)