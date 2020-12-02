import React, { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Input from '../../components/input'
import DragAndDrop from '../../components/dragAndDrop'
import GenderInput from '../../components/inputFields/genderInput'
import TextInput from '../../components/inputFields/textInput'
import QuantityInput from '../../components/inputFields/quantityInput'
import NumberInput from '../../components/inputFields/numberInput'
import DescriptionInput from '../../components/inputFields/descriptionInput'
import CategoriesInput from '../../components/inputFields/categoriesInput'

import { createProduct, addImagesToProduct } from '../../services/adminProduct'
import { uploadImages } from '../../services/product'

const BRAND_MAX_LENGTH = 30

const AddProductCard = () => {
    const history = useHistory()
    const [brand, setBrand] = useState('')
    const [categories, setCategories] = useState([])
    const [sizeName, setSizeName] = useState(null)
    const [sizeCount, setSizeCount] = useState(0)
    const [price, setPrice] = useState(0)
    const [discountInPercent, setDiscountInPercent] = useState(null)
    const [discountEndDate, setDiscountEndDate] = useState(null)
    const [description, setDescription] = useState('')
    const [gender, setGender] = useState('U')

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

        const newProduct = {
            brand,
            sizes: [{ sizeName: sizeName, count: sizeCount }],
            price,
            description,
            gender,
            categories,
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
            handleImageAdd({ file, url: URL.createObjectURL(file) })
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
                    <TextInput
                        type='text'
                        id='brand'
                        placeholder='Brand'
                        onChange={e => setBrand(e.target.value)}
                    />
                    {/* <Input
                        type='text'
                        label='Categories'
                        id='categories'
                        placeholder='Shoes, Bags, T-shirts ...'
                        onChange={e => setCategories(e.target.value)}
                    /> */}
                    <CategoriesInput
                        addedCategories={categories}
                        handleAdd={cat => setCategories([...categories, cat])}
                        handleRemove={cat => setCategories(categories.filter(c => c !== cat))} />
                    <NumberInput
                        placeholder='Price'
                        min='0.01'
                        onChange={e => setPrice(Number(e.target.value).toFixed(2))}
                        unitsPlaceholder='$'
                    />
                    <div class={styles['input-group']}>
                        <TextInput
                            type='text'
                            id='sizeName'
                            placeholder='Initial size name'
                            onChange={e => setSizeName(e.target.value)}
                        />
                        <QuantityInput
                            value={sizeCount}
                            name='Initial size count'
                            max={99999}
                            setNewValue={setSizeCount}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <QuantityInput
                            value={discountInPercent}
                            name='Discount in %'
                            setNewValue={setDiscountInPercent}
                        />
                        <Input
                            type='date'
                            label='End date of discount'
                            id='discountEndDate'
                            onChange={e => setDiscountEndDate(e.target.value)}
                        />
                    </div>
                    <DescriptionInput
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <GenderInput currentGender={gender} onChange={setGender} />
                    <button className={styles.button} type='submit'>SAVE</button>
                </form>
            </div>
        </main>
    )
}

export default AddProductCard