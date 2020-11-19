import React, { useCallback, useState } from 'react'
import styles from './index.module.css'

import ImageCard from '../imageCard'
import { getImagePath } from '../../utils/product'
import getCookie from '../../utils/cookie'

const ImageCards = ({ productId, images }) => {
    const imageUrls = images ? [...images] : []
    const [imageCards, setImageCards] = useState(imageUrls)

    const handleImageAdd = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const result = await fetch(`http://localhost:3001/api/admin/product/${productId}/images`,
            {
                method: 'POST',
                body: JSON.stringify({
                    path: imagePath
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-cookie')
                }
            })

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

    const containsImages = imageCards && imageCards.length > 0

    return (
        <div className={styles.container}>
            {
                containsImages
                    ? (<div className={styles['card-container']}>
                        {imageCards.map(imageUrl => {
                            return <ImageCard key={imageUrl} src={imageUrl} dispatch={handleImageRemove} />
                        })}
                    </div>)
                    : <div>No images available</div>
            }

            <button onClick={showWidget}>Upload Images</button>
        </div>
    )
}

export default ImageCards