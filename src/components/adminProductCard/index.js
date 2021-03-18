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
import ConfirmWindow from '../confirmWindow'

const AdminProductCard = ({
    brand,
    categories,
    description,
    discount,
    discountPrice,
    gender,
    id: productId,
    images,
    price,
    ratingCount,
    ratingStars,
    sizes
}) => {
    const [imageCards, setImageCards] = useState(images ? [...images] : [])
    const [showModifyWindow, setShowModifyWindow] = useState(false)
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    const { user: { isAdmin } } = useContext(UserContext)
    const { handleProductDelete, updateFilters, updateProductsPage } = useContext(ProductsContext)
    const { addMessage } = useContext(ErrorContext)

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

        handleProductDelete(productId)
        updateFilters()
        updateProductsPage()
    }, [addMessage, updateFilters, updateProductsPage, handleProductDelete, productId])

    const handleImageAdd = useCallback(async (imageUrl) => {
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
    }, [addMessage, imageCards, productId])

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
    }, [handleImageAdd, addMessage])

    return (
        <div className={styles.container}>
            <AdminImageCards 
                images={images} 
                productId={productId} 
                imageCards={imageCards} 
                setImageCards={setImageCards} 
            />
            <div className={styles['inner-container']}>
                {isAdmin &&
                    <>
                    <ProductCard  
                        brand={brand}
                        discount={discount}
                        discountPrice={discountPrice}
                        productId={productId}
                        images={images}
                        price={price}
                        ratingCount={ratingCount}
                        ratingStars={ratingStars}
                    />
                    <div className={styles['btn-admin']}>
                        <SubmitButton 
                            text='Edit' 
                            onClick={() => setShowModifyWindow(!showModifyWindow)} 
                            btnType='edit'
                            style={{ marginRight: '0.5rem', minWidth: '6rem' }}
                        />
                        <SubmitButton 
                            text='Delete' 
                            onClick={() => setShowDeleteWarning(true)}
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
                { showModifyWindow &&
                    <ModifyProductWindow
                        brand={brand}
                        price={price}
                        discount={discount}
                        description={description}
                        gender={gender}
                        sizes={sizes}
                        categories={categories}
                        productId={productId}
                        hideWindow={() => setShowModifyWindow(false)} 
                    />
                }
                { showDeleteWarning &&
                    <ConfirmWindow
                        hideWindow={() => setShowDeleteWarning(false)} 
                        handleConfirm={handleDelete}
                        title='Confirm Delete'
                        text='Are you sure you wish to remove this product?'
                    />
                }
            </div>
        </div>
    )
}

export default AdminProductCard