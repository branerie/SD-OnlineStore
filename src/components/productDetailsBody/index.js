import React, { useState, useCallback} from 'react'
import styles from './index.module.css'
import NavButtons from '../navButtons'
import BackIconLink from '../iconLinks/backIconLink'
import ImageGrid from '../imageGrid'
import ProductDetailsAside from '../productDetailsAside'

const ProductDetailsBody = ({ product }) => {
    const images = product.images
    const [selectedImg, setSelectedImg] = useState(images && images[0])

    const setCurrentImg = useCallback((selectedUrl) => setSelectedImg(selectedUrl), [])

    return (
        <div className={styles.container}>
            <ProductDetailsAside {...product} />
            <main className={styles['main-container']}>
                <div className={styles['button-wrapper']}>
                    <NavButtons />
                </div>
                <div className={styles['img-container']}>
                    <div className={styles['img-selected']}>
                        <img 
                            src={selectedImg}
                            alt={'No Image'}
                            className={styles['product-image']}
                        />
                    </div>
                    <ImageGrid src={images} setCurrentImage={setCurrentImg}/>
                </div>
                <BackIconLink />
            </main>
        </div>
    )
}
export default ProductDetailsBody