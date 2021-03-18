import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.css'
import ErrorContext from '../../contexts/ErrorContext'
import { getProductDetails } from '../../services/product'
import BackIconLink from '../IconLinks/BackIconLink'
import ImageGrid from '../ImageGrid'
import ProductDetailsAside from '../ProductDetailsAside'
import NavButtons from '../NavButtons'

const ProductDetailsBody = () => {
    const [currentProduct, setCurrentProduct] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)
    const { addMessage } = useContext(ErrorContext)
    const { id } = useParams()
    const history = useHistory()

    const setCurrentImg = useCallback((selectedUrl) => setSelectedImg(selectedUrl), [])
    
    const getCurrentProduct = useCallback(async () => {
        const response = await getProductDetails(id)
        if (response.error) {
            addMessage(
                'Product Details', 
                'An error occurred while trying to receive product information. Please be patient as we try to solve this issue.'
            )

            return history.goBack()
        }

        setCurrentProduct(response)
        if (response.images) {
            setSelectedImg(response.images[0])
        }
    }, [id, history, addMessage])

    useEffect(() => {
        getCurrentProduct()
    }, [getCurrentProduct])

    if (!currentProduct) {
        return null
    }

    return (
        <div className={styles.container}>
            <ProductDetailsAside {...currentProduct} />
            <main className={styles['main-container']}>
                <div className={styles['nav-secondary']}>
                    <BackIconLink />
                    <NavButtons />
                </div>
                <div className={styles['img-container']}>
                    <div className={styles['img-selected']}>
                        {/* eslint-disable-next-line */}
                        <img
                            src={selectedImg}
                            alt={'No Image'}
                            className={styles['product-image']}
                        />
                    </div>
                    <ImageGrid imgCollection={currentProduct.images || []} setCurrentImage={setCurrentImg} />
                </div>
            </main>
        </div>
    )
}
export default ProductDetailsBody