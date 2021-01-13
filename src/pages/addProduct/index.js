import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from './index.module.css'
import Input from '../../components/input'
import DragAndDrop from '../../components/dragAndDrop'
import GenderInput from '../../components/inputFields/genderInput'
import TextInput from '../../components/inputFields/textInput'
import QuantityInput from '../../components/inputFields/quantityInput'
import NumberInput from '../../components/inputFields/numberInput'
import DescriptionInput from '../../components/inputFields/descriptionInput'
import CategoriesInputWrapper from '../../components/inputFields/categoriesInputWrapper'

import { createProduct, addImagesToProduct } from '../../services/adminProduct'
import { uploadImages } from '../../services/product'
import { getValidationConstants } from '../../services/info'
import ValidationErrorMessage from '../../components/validationErrorMessage'

const AddProductCard = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [sizeCount, setSizeCount] = useState(0)
    const [discountInPercent, setDiscountInPercent] = useState('')
    const [discountEndDate, setDiscountEndDate] = useState(null)
    const [gender, setGender] = useState('U')
    const [validationConstants, setValidationConstants] = useState(null)
    
    const { register, errors, handleSubmit, setError } = useForm()
    const [images, imagesDispatch] = useReducer(reducer, [])

    const getProductValidationConstants = useCallback(async () => {
        const constants = await getValidationConstants('product')
        setValidationConstants(constants)
    }, [setValidationConstants])

    useEffect(() => {
        getProductValidationConstants()
    }, [getProductValidationConstants])

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

    if (!validationConstants) {
        return null
    }

    const handleFormSubmit = async ({ 
        brand,
        price,
        description, 
        discountPercent,
        sizeName,
        sizeCount
    }) => {
        if (categories.length === 0) {
            setError('categories', { message: 'Product be part of at least one category' })
            return
        }

        const newProduct = {
            brand,
            sizes: [{ sizeName: sizeName, count: sizeCount }],
            price,
            description,
            gender,
            categories,
        }

        if (discountPercent !== '' && discountEndDate !== null) {
            newProduct.discount = { percent: discountPercent, endDate: discountEndDate }
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
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(handleFormSubmit)}
                    onKeyPress={preventEnterSubmit}>
                    <TextInput
                        name='brand'
                        type='text'
                        placeholder='Brand'
                        reference={register(validationConstants.brand)}
                    />
                    { errors.brand && <ValidationErrorMessage message={errors.brand.message} /> }
                    <CategoriesInputWrapper
                        addedCategories={categories}
                        handleAdd={cat => setCategories([...categories, cat])}
                        handleRemove={cat => setCategories(categories.filter(c => c !== cat))} />
                    { errors.categories && <ValidationErrorMessage message={errors.categories.message} /> }
                    <NumberInput
                        name='price'
                        placeholder='Price'
                        reference={register(validationConstants.price)}
                        unitsPlaceholder='$'
                    />
                    { errors.price && <ValidationErrorMessage message={errors.price.message} /> }
                    <div className={styles['input-group']}>
                        <TextInput
                            name='sizeName'
                            type='text'
                            placeholder='Initial size name'
                            reference={register(validationConstants.sizes.sizeName)}
                        />
                        <QuantityInput
                            name='sizeCount'
                            label='Initial size count'
                            max={99999}
                            value={sizeCount}
                            reference={register(validationConstants.sizes.count)}
                            setNewValue={setSizeCount}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <QuantityInput
                            name='discountPercent'
                            label='Discount in %'
                            value={discountInPercent}
                            reference={register(validationConstants.discount.percent)}
                            setNewValue={setDiscountInPercent}
                        />
                        <Input
                            type='date'
                            label='End date of discount'
                            onChange={e => setDiscountEndDate(e.target.value)}
                        />
                        { errors.discountPercent &&
                            <ValidationErrorMessage message={errors.discountPercent.message} />}
                    </div>
                    <DescriptionInput
                        name='description'
                        reference={register(validationConstants.description)}
                    />
                    {errors.description && 
                        <ValidationErrorMessage message={errors.description.message} />}
                    <GenderInput currentGender={gender} onChange={setGender} />
                    <button className={styles.button} type='submit'>SAVE</button>
                </form>
            </div>
        </main>
    )
}

export default AddProductCard