const express = require('express')
const chai = require('chai')
const chaiHttp = require('chai-http')
const dbHandler = require('../dbHandler')
const Product = require('../../models/product')
const productController = require('../../controllers/product')

const app = express()
app.use('/', productController)

chai.use(chaiHttp)
const { expect } = chai

const checkForErrors = (err, res) => {
    expect(err).to.be.null
    expect(res).to.have.status(200)
    expect(res.header['content-type']).to.contain('application/json')

    expect(res.body.error).to.be.undefined
}

const fillDatabase = async () => {
    await Product.create([
        {
            brand: 'Armani',
            categories: ['Dresses'],
            price: 140.50,
            sizes: [
                { sizeName: 'XL', count: 3 }
            ],
            description: 'Very cool Armani dress',
            gender: 'F',
            discount: {
                percent: 0.1,
                endDate: new Date(2020, 12, 31)
            }
        },
        {
            brand: 'Armani',
            categories: ['Dresses'],
            price: 120.30,
            sizes: [
                { sizeName: 'M', count: 14 },
                { sizeName: 'L', count: 18 }
            ],
            description: 'Amazing Armani style, very cool',
            gender: 'F'
        },
        {
            brand: 'Gucci',
            categories: ['Shoes'],
            price: 180,
            sizes: [
                { sizeName: '38', count: 2 },
                { sizeName: '41', count: 18 }
            ],
            description: 'Another very cool thing',
            gender: 'M',
            discount: {
                percent: 0.4,
                endDate: new Date(2020, 12, 31)
            }
        },
        {
            brand: 'Mat Star',
            categories: ['Shoes'],
            price: 15,
            sizes: [
                { sizeName: '42', count: 40 },
                { sizeName: '45', count: 31 }
            ],
            description: 'The affordable option',
            gender: 'M'
        },
        {
            brand: 'D&G',
            categories: ['Jeans'],
            price: 100,
            sizes: [
                { sizeName: 'XS', count: 8 },
                { sizeName: 'S', count: 17 }
            ],
            description: 'Best in the biz and very cool',
            gender: 'F'
        },
    ])
}

let createTextIndex

/**
    * Connect to a new in-memory database before running any tests.
    */
before(async () => {
    const { connection: db } = await dbHandler.connect()

    createTextIndex = async () => {
        await db.collections.products.createIndex({
            brand: 'text',
            description: 'text',
            categories: 'text'
        })
    }

    await createTextIndex()
})

/**
 * Remove and close the db and server.
 */
after(async () => await dbHandler.closeDatabase())

const makeSuite = (name, tests) => {
    describe(name, function () {
        before(async () => {
            await fillDatabase()
            await createTextIndex()
        })
        tests()
        after(async () => {
            // await dbHandler.clearDatabase()
        })
    })
}

// /**
// * Clear all test data after every test.
// */
// afterEach(async () => await dbHandler.clearDatabase())

describe('controllers/product', () => {
    describe('GET', async () => {
        makeSuite('/ranges', () => {
            it('should return correct product ranges', () => {
                chai.request(app)
                    .get('/ranges')
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body

                        expect(data.brand).to.have.members(['Armani', 'D&G', 'Gucci', 'Mat Star'])
                        expect(data.brand).to.have.length(4)

                        expect(data.categories).to.have.members(['Dresses', 'Jeans', 'Shoes'])
                        expect(data.categories).to.have.length(3)

                        expect(data.gender).to.have.members(['M', 'F'])
                        expect(data.gender).to.have.length(3)

                        expect(data.minPrice).to.equal(15)
                        expect(data.maxPrice).to.equal(180)

                        expect(data.minCount).to.equal(2)
                        expect(data.maxCount).to.equal(40)

                        expect(data.sizes).to.have.members(['36 - 40', '41 - 45', 'XS', 'S', 'M', 'L', 'XL'])
                        expect(data.sizes).to.have.length(7)
                    })
            })

            it('should return empty array if db is empty', () => {
                dbHandler.clearDatabase().then(() => {
                    chai.request(app)
                        .get('/ranges')
                        .send()
                        .end((err, res) => {
                            checkForErrors(err, res)

                            const data = res.body
                            console.log(data)
                            expect(Array.isArray(data)).to.equal(true)
                            expect(data).to.have.length(0)
                        })

                })
            })
        })


        makeSuite('/products', () => {
            it('should return valid data about all products', () => {
                chai.request(app)
                    .get('/products?pageLength=100')
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(5)
                        expect(data.productInfo).to.have.length(5)

                        data.productInfo.forEach(product => {
                            expect(product).to.have.property('id').that.is.a('string')
                            expect(product).to.have.property('brand').that.is.a('string')
                            expect(product).to.have.property('description').that.is.a('string')
                            expect(product).to.have.property('categories').that.is.an('array')
                            expect(product).to.have.property('sizes').that.is.an('array')
                            expect(product).to.have.property('ratingCount').that.is.a('Number')
                            expect(product).to.have.property('ratingStars')
                            expect(product).to.have.property('gender').that
                                .is
                                .a('string')
                                .which
                                .is
                                .oneOf(Product.schema
                                    .path('gender')
                                    .enumValues)

                            product.categories.forEach(category => {
                                expect(category).to.be.oneOf(Product.schema.path('categories.0').enumValues)
                            })

                            product.sizes.forEach(size => {
                                expect(size).to.have.property('sizeName').that.is.a('string')
                                expect(size).to.have.property('count').that.is.a('number').at.least(0)
                            })
                        })
                    })
            })

            it('should return sorted data if sort parameter is passed in query string', () => {
                chai.request(app)
                    .get('/products?pageLength=100&sort=price,desc')
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body

                        expect(data.total).to.equal(5)
                        expect(data.productInfo).to.have.length(5)

                        const sortedPricesDesc = [180, 140.50, 120.30, 100, 15]
                        for (let index = 0; index < data.productInfo.length; index++) {
                            expect(data.productInfo[index].price).to.equal(sortedPricesDesc[index])
                        }
                    })
            })

            it('should adjust length of products array based on passed parameter "pageLength"', () => {
                const pageLength = 3

                chai.request(app)
                    .get(`/products?pageLength=${pageLength}`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(5)
                        expect(data.productInfo).to.have.length(pageLength)
                    })
            })

            it('should return correct page if "page" query string parameter is passed', () => {
                chai.request(app)
                    .get('/products?pageLength=2&page=2&sort=price,desc')
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(5)
                        expect(data.productInfo).to.have.length(1)

                        expect(data.productInfo[0].price).to.equal(15)
                    })

                chai.request(app)
                    .get('/products?pageLength=2&page=1&sort=price,desc')
                    .send()
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.header['content-type']).to.contain('application/json')

                        const data = res.body
                        expect(data.error).to.be.undefined

                        expect(data.total).to.equal(5)
                        expect(data.productInfo).to.have.length(2)

                        expect(data.productInfo[0].price).to.equal(120.30)
                        expect(data.productInfo[1].price).to.equal(100)
                    })
            })

            it('should filter data based on categorical filter', () => {
                const filteringBrands = 'Armani,Gucci'

                chai.request(app)
                    .get(`/products?pageLength=100&cat_brand=${filteringBrands}`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(3)
                        expect(data.productInfo).to.have.length(3)

                        data.productInfo.forEach(product => {
                            expect(product.brand).to.be.oneOf(filteringBrands.split(','))
                        })
                    })

                const filteringCategories = 'Shoes,Dresses'

                chai.request(app)
                    .get(`/products?pageLength=100&cat_categories=${filteringCategories}`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(4)
                        expect(data.productInfo).to.have.length(4)

                        data.productInfo.forEach(product => {
                            const filteredCategoriesArray = filteringCategories.split(',')

                            product.categories.forEach(category => {
                                expect(category).to.be.oneOf(filteredCategoriesArray)
                            })
                        })
                    })

                chai.request(app)
                    .get(`/products?pageLength=100&cat_categories=${filteringCategories}&cat_brand=Gucci`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(1)
                        expect(data.productInfo).to.have.length(1)

                        data.productInfo.forEach(product => {
                            const filteredCategoriesArray = filteringCategories.split(',')

                            expect(product.brand).to.equal('Gucci')

                            product.categories.forEach(category => {
                                expect(category).to.be.oneOf(filteredCategoriesArray)
                            })
                        })
                    })
            })

            it('should filter data based on range filter', () => {
                chai.request(app)
                    .get(`/products?pageLength=100&rng_price=15,100`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(2)
                        expect(data.productInfo).to.have.length(2)

                        data.productInfo.forEach(product => {
                            expect(product.price).to.be.within(15, 100)
                        })
                    })
            })

            it('should filter based on discount price if available', () => {
                chai.request(app)
                    .get(`/products?pageLength=100&rng_price=125,105&sort=price,desc`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(2)
                        expect(data.productInfo).to.have.length(2)

                        expect(data.productInfo[0].discountPrice).to.equal(108)
                        expect(data.productInfo[1].price).to.equal(120.30)
                    })
            })

            it('should filter data based on boolean filter', () => {
                chai.request(app)
                    .get(`/products?pageLength=100&bool_discount=true`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(2)
                        expect(data.productInfo).to.have.length(2)

                        expect(data.productInfo[0]).to.haveOwnProperty('discountPrice')
                        expect(data.productInfo[1]).to.haveOwnProperty('discountPrice')
                    })
            })

            it('should filter data based on string search', () => {
                const firstSearchTerm = 'affordable'

                chai.request(app)
                    .get(`/products?pageLength=100&searchTerm=${firstSearchTerm}`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(1)
                        expect(data.productInfo).to.have.length(1)

                        expect(data.productInfo[0].description).to.contain(firstSearchTerm)
                    })

                const secondSearchTerm = 'Armani'
                chai.request(app)
                    .get(`/products?pageLength=100&searchTerm=${secondSearchTerm}`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(2)
                        expect(data.productInfo).to.have.length(2)

                        expect(data.productInfo[0].brand).to.equal(secondSearchTerm)
                        expect(data.productInfo[1].brand).to.equal(secondSearchTerm)
                    })
            })

            it('should filter data based on a combination of filters', () => {
                const searchTerm = 'very cool'

                chai.request(app)
                    .get(`/products?pageLength=100&searchTerm=${searchTerm}&cat_brand=Gucci,Armani&bool_discount=true&rng_price=100,110`)
                    .send()
                    .end((err, res) => {
                        checkForErrors(err, res)

                        const data = res.body
                        expect(data.total).to.equal(1)
                        expect(data.productInfo).to.have.length(1)

                        const filteredProduct = data.productInfo[0]

                        expect(filteredProduct.brand).to.equal('Gucci')
                        expect(filteredProduct.discountPrice).to.equal(108)
                    })
            })

            it('should return empty array if db is empty', () => {
                dbHandler.clearDatabase().then(() => {
                    chai.request(app)
                        .get('/products?pageLength=100')
                        .send()
                        .end((err, res) => {
                            checkForErrors(err, res)

                            const data = res.body
                            expect(Array.isArray(data)).to.equal(true)
                            expect(data).to.have.length(0)
                        })

                })
            })
        })
    })
})