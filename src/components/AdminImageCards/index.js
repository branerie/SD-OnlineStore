import React, { useContext } from 'react'
import ErrorContext from '../../contexts/ErrorContext'
import styles from './index.module.css'

import ImageCards from '../ImageCards'

import { getImagePath } from '../../utils/product'
import { removeImage } from '../../services/adminProduct'

const AdminImageCards = ({ productId, imageCards, setImageCards }) => {
    const { addMessage } = useContext(ErrorContext)

    const handleImageRemove = async (imageUrl) => {
        const imagePath = getImagePath(imageUrl)

        const imageRemoveResult = await removeImage(productId, imagePath)
        if (imageRemoveResult.error) {
            addMessage(
                'Add Product Image',
                'An error occurred while trying to remove an image from a product.'
            )

            return
        }

        setImageCards(imageCards.filter(img => img !== imageUrl))
    }

    return (
        <div className={styles.container}>
            <ImageCards imageCards={imageCards} handleImageRemove={handleImageRemove}/>
        </div>
    )
}

export default AdminImageCards