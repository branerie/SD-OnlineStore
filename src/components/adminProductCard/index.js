import React, { useCallback, useContext, useState } from 'react'
import UserContext from '../../UserContext'
import ErrorContext from '../../ErrorContext'
import styles from './index.module.css'

import ProductCard from '../productCard'
import ModifyProductWindow from '../modifyProductWindow'
import ProductsContext from '../../ProductsContext'
import AdminImageCards from '../adminImageCards'

import { getImagePath } from '../../utils/product'
import { addImagesToProduct, deleteProduct } from '../../services/adminProduct'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../../utils/constants'
import SubmitButton from '../submitButton'

const AdminProductCard = (props) => {
    const [imageCards, setImageCards] = useState(props.images ? [...props.images] : [])
    const [showModifyWindow, setShowModifyWindow] = useState(false)
    const { user: { isAdmin } } = useContext(UserContext)
    const productsContext = useContext(ProductsContext)
    const { addMessage } = useContext(ErrorContext)

    const productId = props.id

    const handleDelete = useCallback(async (event) => {
        event.preventDefault()

        const deleteResult = await deleteProduct(productId)
        if (deleteResult.error) {
            addMessage(
                'Delete Product',
                'An internal error occurred which prevented the removal of a product.'
            )

            return
        }

        productsContext.handleProductDelete(productId)
        productsContext.updateFilters()
        productsContext.updateProductsPage()
    })

    const handleImageAdd = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const addResult = await addImagesToProduct(productId, imagePath)
        if (addResult.error) {
            addMessage(
                'Add Product Image',
                'An error occurred while trying to add an image to a product.'
            )

            return
        }

        setImageCards([...imageCards, imageUrl])
    }

    const showWidget = useCallback(() => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET
        }, (error, result) => {
            if (result.event === 'success') {
                const imageUrl = result.info.url

                handleImageAdd(imageUrl)
            }

            if (error) {
                addMessage(
                    'Cloudinary Widget',
                    'Product image widget failed to load.'
                )

                return
            }
        })

        widget.open()
    })

    return (
        <div className={styles.container}>
            <AdminImageCards 
                images={props.images} 
                productId={productId} 
                imageCards={imageCards} 
                setImageCards={setImageCards} 
            />
            <div className={styles['inner-container']}>
                {isAdmin &&
                    <>
                    <ProductCard key={props.id} {...props} />
                    <div className={styles['btn-admin']}>
                        <SubmitButton 
                            text='Edit' 
                            onClick={() => setShowModifyWindow(!showModifyWindow)} 
                            btnType='edit'
                            style={{ marginRight: '0.5rem', minWidth: '6rem' }}
                        />
                        <SubmitButton 
                            text='Delete' 
                            onClick={handleDelete}
                            btnType='delete'
                            style={{ marginRight: '0.5rem', minWidth: '6rem' }}
                        />
                        <SubmitButton 
                            text='Images' 
                            onClick={showWidget}  
                            style={{ minWidth: '6rem' }}
                        />
                    </div>
                    </>
                }
                {showModifyWindow &&
                    <ModifyProductWindow
                        key={props.id}
                        {...props}
                        hideWindow={() => setShowModifyWindow(false)} 
                    />
                }
            </div>
        </div>
    )
}

export default AdminProductCard