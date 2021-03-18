import React, { useState, useReducer, useEffect, useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import styles from './index.module.css'
import ErrorContext from '../../contexts/ErrorContext'
import DragAndDrop from '../DragAndDrop'
import GenderInput from '../InputFields/GenderInput'
import TextInput from '../InputFields/TextInput'
import QuantityInput from '../InputFields/QuantityInput'
import NumberInput from '../InputFields/NumberInput'
import DescriptionInput from '../InputFields/DescriptionInput'
import CategoriesInputWrapper from '../InputFields/CategoriesInputWrapper'

import { createProduct, addImagesToProduct } from '../../services/adminProduct'
import { uploadImages } from '../../services/product'
import { getValidationConstants } from '../../services/info'
import ValidationErrorMessage from '../ValidationErrorMessage'
import WindowContainer from '../WindowContainer'
import SubmitButton from '../SubmitButton'
import ProductsContext from '../../contexts/ProductsContext'
import DateInput from '../InputFields/DateInput'

const AddProductWindow = ({ hideWindow }) => {
    const [categories, setCategories] = useState([])
    const [sizeCount, setSizeCount] = useState(0)
    const [discountInPercent, setDiscountInPercent] = useState('')
    const [discountEndDate, setDiscountEndDate] = useState(null)
    const [gender, setGender] = useState('M')
    const [validationConstants, setValidationConstants] = useState(null)

    const { addMessage } = useContext(ErrorContext)
    const { updateProductsPage, filtersDispatch } = useContext(ProductsContext)

    const { register, errors, handleSubmit, setError, clearErrors } = useForm()
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
            setError('categories', { message: 'Product must have at least one category set' })
            return setTimeout(() => clearErrors('categories'), 5000)
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
            addMessage('Create Product', 'Something went wrong when trying to create product.')
            return
        }

        const addedImagePaths = await uploadImages(images)

        const imagesAddResult = await addImagesToProduct(productCreationResult.id, addedImagePaths)
        if (imagesAddResult.error) {
            addMessage('Product Add Image', 'Something went wrong when trying to add image to product.')
            return
        }

        updateProductsPage()
        filtersDispatch({ type: 'page', newPage: 0 })
        hideWindow()
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
        <WindowContainer hideWindow={hideWindow}>
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
                    <SubmitButton text='Add Image' onClick={handleImageBrowseClick} />
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
                        {errors.brand && <ValidationErrorMessage message={errors.brand.message} />}
                        <CategoriesInputWrapper
                            addedCategories={categories}
                            handleAdd={cat => setCategories([...categories, cat])}
                            handleRemove={cat => setCategories(categories.filter(c => c !== cat))} 
                        />
                        {errors.categories && <ValidationErrorMessage message={errors.categories.message} />}
                        <NumberInput
                            name='price'
                            placeholder='Price'
                            reference={register(validationConstants.price)}
                            unitsPlaceholder='$'
                        />
                        {errors.price && <ValidationErrorMessage message={errors.price.message} />}
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
                            {errors.sizeName && <ValidationErrorMessage message={errors.sizeName.message} />}
                        </div>
                        <div className={styles['input-group']}>
                            <div className={styles['discount-container']}>
                                <QuantityInput
                                    name='discountPercent'
                                    label='Discount in %'
                                    value={discountInPercent}
                                    reference={register(validationConstants.discount.percent)}
                                    setNewValue={setDiscountInPercent}
                                />
                            </div>
                            <div>End date of discount</div>
                            <DateInput 
                                value={discountEndDate}
                                onChange={e => setDiscountEndDate(e.target.value)}
                            />
                            {errors.discountPercent &&
                                <ValidationErrorMessage message={errors.discountPercent.message} />}
                        </div>
                        <DescriptionInput
                            name='description'
                            reference={register(validationConstants.description)}
                        />
                        {errors.description &&
                            <ValidationErrorMessage message={errors.description.message} />}
                        <GenderInput currentGender={gender} onChange={setGender} />
                        <SubmitButton text='SAVE' />
                    </form>
                </div>
            </main>
        </WindowContainer>
    )
}

export default AddProductWindow