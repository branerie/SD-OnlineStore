import React, { useCallback, useState } from 'react'
import styles from './index.module.css'

import ImageCards from '../imageCards'

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../../utils/constants'
import { getImagePath } from '../../utils/product'
import { addImagesToProduct, removeImage } from '../../services/adminProduct'
import { useAsyncError } from '../../hooks'
import { InternalError } from '../../utils/info'

const AdminImageCards = ({ productId, images }) => {
    const imageUrls = images ? [...images] : []
    const [imageCards, setImageCards] = useState(imageUrls)
    const throwInternalError = useAsyncError()

    const handleImageAdd = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const addResult = await addImagesToProduct(productId, imagePath)
        if (addResult.error) {
            throwInternalError(new InternalError(500, 'Failed to add image to product'))
        }

        setImageCards([...imageCards, imageUrl])
    }

    const handleImageRemove = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const imageRemoveResult = await removeImage(productId, imagePath)
        if (imageRemoveResult.error) {
            throwInternalError(new InternalError(500, 'Failed to remove image from product'))
        }

        setImageCards(imageCards.filter(img => img !== imageUrl))
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
                throwInternalError()
            }
        })

        widget.open()
    })

    return (
        <div className={styles.container}>
            <ImageCards imageCards={imageCards} handleImageRemove={handleImageRemove}/>

            <button onClick={showWidget}>Upload Images</button>
        </div>
    )
}

export default AdminImageCards