import React, { useCallback, useState } from 'react'
import styles from './index.module.css'

import ImageCards from '../imageCards'
import { getImagePath } from '../../utils/product'
import getCookie from '../../utils/cookie'

const AdminImageCards = ({ productId, images }) => {
    const imageUrls = images ? [...images] : []
    const [imageCards, setImageCards] = useState(imageUrls)

    const handleImageAdd = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const result = await fetch(`http://localhost:3001/api/admin/product/${productId}/images`,
            {
                method: 'POST',
                body: JSON.stringify({
                    data: imagePath
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-cookie')
                }
        })

        if (result.error) {
            //TODO: handle errors
        }

        setImageCards([...imageCards, imageUrl])
    }

    const handleImageRemove = (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        fetch(`http://localhost:3001/api/admin/product/${productId}/images/${imagePath}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        setImageCards(imageCards.filter(img => img !== imageUrl))
    }

    const showWidget = useCallback(() => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: 'drk3sslgq',
            uploadPreset: 'j8qqeqco'
        }, (error, result) => {
            if (result.event === 'success') {
                const imageUrl = result.info.url

                handleImageAdd(imageUrl)
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