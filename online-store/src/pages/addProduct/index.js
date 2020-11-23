import React, { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Input from '../../components/input'
import DragAndDrop from '../../components/dragAndDrop'
import GenderInput from '../../components/genderInput'

import { createProduct, addImagesToProduct } from '../../services/adminProduct'
import { uploadImages } from '../../services/product'

const BRAND_MAX_LENGTH = 30
const DESCRIPTION_MAX_LENGTH = 1000

const AddProductCard = () => {
    const history = useHistory()
    const [brand, setBrand] = useState('')
    const [categories, setCategories] = useState([])
    const [sizeName, setSizeName] = useState(null)
    const [sizeCount, setSizeCount] = useState(null)
    const [price, setPrice] = useState(0)
    const [discountInPercent, setDiscountInPercent] = useState(null)
    const [discountEndDate, setDiscountEndDate] = useState(null)
    const [description, setDescription] = useState('')
    const [gender, setGender] = useState('U')
    const sizes = []
    const newCategories = []

    const [images, imagesDispatch] = useReducer(reducer, [])

    function reducer(state, action) {
        switch (action.type) {
            case 'addToList':
                return [...state, action.files]
                  
            case 'removeFromList':
                return state.filter(file => file.url !== action.fileToRemove)
            case 'reset':
                return []
            default:
                return state
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const sizeValue = { sizeName: sizeName, count: sizeCount }
        sizes.push(sizeValue)
        newCategories.push(categories)

        const newProduct = {
            brand,
            sizes,
            price,
            description,
            gender,
            categories: newCategories,
        }

        if (discountInPercent !== null && discountEndDate !== null) {
            newProduct.discount = { percent: discountInPercent, endDate: discountEndDate }
        }

        const productCreationResult = await createProduct(newProduct)
        if (productCreationResult.error) {
            //TODO: handle errors
        }

        const addedImagePaths = await uploadImages(images)

        const imagesAddResult = await addImagesToProduct(productCreationResult.id, addedImagePaths)
        if (imagesAddResult.error) {
            //TODO: handle error if adding images was unsuccessful 
        }

        history.push('/admin/products')
    }

    const preventEnterSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    const handleImageRemove = (removedImage) => {
        imagesDispatch({ type: 'removeFromList', fileToRemove: removedImage })
    }

    const handleImageAdd = (addedImages) => {
        imagesDispatch({ type: 'addToList', files: addedImages })
    }

    const browseImageAdd = (event) => {
        const inputElement = event.target
        let files = Array.from(inputElement.files)

        files.forEach(file => {
            handleImageAdd({ file, url: URL.createObjectURL(file)})
        })
    }

    const handleImageBrowseClick = () => {
        document.getElementById('imageBrowseInput').click()
    }

    return (
        <main className={styles.container}>
            <div className={styles['input-images']}>
                <DragAndDrop
                    imageCards={images.map(img => img.url)}
                    handleImageRemove={handleImageRemove}
                    handleImageAdd={handleImageAdd} />
                <input
                    id='imageBrowseInput'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={browseImageAdd} />
                <button type="button" onClick={handleImageBrowseClick}>Add Image</button>
            </div>
            <div className={styles['input-fields']}>
                <form className={styles.form} onSubmit={handleSubmit} onKeyPress={preventEnterSubmit}>
                    <Input
                        type='text'
                        label='Brand'
                        id='brand'
                        onChange={e => setBrand(e.target.value)}
                        maxLength={BRAND_MAX_LENGTH}
                    />
                    <Input
                        type='text'
                        label='Categories'
                        id='categories'
                        placeholder='Shoes, Bags, T-shirts ...'
                        onChange={e => setCategories(e.target.value)}
                    />
                    <Input
                        type='text'
                        label='Add size name'
                        id='sizeName'
                        placeholder='XS, S, M, L, XL, XXL'
                        onChange={e => setSizeName(e.target.value)}
                    />
                    <Input
                        type='number'
                        label='Add amount'
                        id='amount'
                        placeholder='100, 200, 250 ...'
                        onChange={e => setSizeCount(e.target.value)}
                        step='1'
                    />
                    <Input
                        type='number'
                        label='Price'
                        id='price'
                        onChange={e => setPrice(Number(e.target.value).toFixed(2))}
                    />
                    <Input
                        type='number'
                        label='Discount in %'
                        id='discount'
                        placeholder='10, 15, 20, 50 ...'
                        onChange={e => setDiscountInPercent(Number(e.target.value))}
                    />
                    <Input
                        type='date'
                        label='End date of discount'
                        id='discountEndDate'
                        onChange={e => setDiscountEndDate(e.target.value)}
                    />
                    <label htmlFor="description">Product description :</label><br></br>
                    <textarea
                        id="description"
                        rows="4"
                        cols="20"
                        onChange={e => setDescription(e.target.value)}
                        className={styles.descriptionArea}
                        maxLength={DESCRIPTION_MAX_LENGTH}>
                    </textarea>
                    <GenderInput currentGender={gender} onChange={setGender} />
                    <button className={styles.button} type='submit'>SAVE</button>
                </form>
            </div>
        </main>
    )
}

export default AddProductCard