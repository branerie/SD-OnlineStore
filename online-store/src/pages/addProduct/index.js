import React, { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import getCookie from '../../utils/cookie'
import styles from './index.module.css'
import Input from '../../components/input'
import DragAndDrop from '../../components/dragAndDrop'
import { getImagePath } from '../../utils/product'

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
    const [gender, setGender] = useState('Unspecified')
    const sizes = []
    const newCategories = []

    const [images, imagesDispatch] = useReducer(reducer, [])

    function reducer(state, action) {
        switch (action.type) {
            // case 'addToDropZone':
            //     return { ...state, inDropZone: action.inDropZone }
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

        const productResponse = await fetch('http://localhost:3001/api/admin/product/', {
            method: 'POST',
            body: JSON.stringify(
                newProduct
            ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        const productResult = await productResponse.json()
        if (productResult.error) {
            //TODO: handle errors
        }

        const addedImagePaths = []
        for (let img of images) {
            //TODO: switch to signed uploads and hide cloudinary info
            const formData = new FormData()
            formData.append('file', img.file)
            formData.append('upload_preset', 'j8qqeqco')
            const response = await fetch(`https://api.cloudinary.com/v1_1/drk3sslgq/image/upload`, {
                method: 'POST',
                body: formData
            })

            const result = await response.json()
            addedImagePaths.push(getImagePath(result.url))
        }

        const addImageUrl = `http://localhost:3001/api/admin/product/${productResult.id}/images`
        const imagesResponse = await fetch(addImageUrl, {
            method: 'POST',
            body: JSON.stringify({ data: addedImagePaths }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        const imagesResult = await imagesResponse.json()
        if (imagesResult.error) {
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
                    <label for="description">Product description :</label><br></br>
                    <textarea
                        id="description"
                        rows="4"
                        cols="20"
                        onChange={e => setDescription(e.target.value)}
                        className={styles.descriptionArea}
                        maxLength={DESCRIPTION_MAX_LENGTH}>
                    </textarea>
                    <div onChange={(e) => setGender(e.target.value)}>
                        <label>
                            <input type="radio" value="M" name="gender" />
                                Male
                        </label>
                        <label>
                            <input type="radio" value="F" name="gender" />
                                Female
                        </label>
                        <label>
                            <input type="radio" value="Unspecified" name="gender" checked />
                                Unspecified
                        </label>
                    </div>
                    <button className={styles.button} type='submit'>SAVE</button>
                </form>
            </div>
        </main>
    )
}

export default AddProductCard