import React, { useCallback, useState } from 'react'
import styles from './index.module.css'

import ImageCards from '../imageCards'

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../../utils/constants'
import { getImagePath } from '../../utils/product'
import { addImagesToProduct, removeImage } from '../../services/adminProduct'

const AdminImageCards = ({ productId, images }) => {
    const imageUrls = images ? [...images] : []
    const [imageCards, setImageCards] = useState(imageUrls)

    const handleImageAdd = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const addResult = await addImagesToProduct(productId, imagePath)
        if (addResult.error) {
            //TODO: handle errors
        }

        setImageCards([...imageCards, imageUrl])
    }

    const handleImageRemove = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const imageRemoveResult = await removeImage(productId, imagePath)
        if (imageRemoveResult.error) {
            //TODO: handle errors
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

            //TODO: Handle cloudinary upload errors
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