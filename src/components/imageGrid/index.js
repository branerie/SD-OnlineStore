import React, { useCallback, useMemo, useState } from 'react'
import styles from './index.module.css'
import CarouselButton from '../carouselButton'

const ImageGrid = ({ imgCollection, setCurrentImage }) => {
    const [initialImgIndex, setInitialImgIndex] = useState(0)
    
    const changeCarousel = useCallback((indexOfChange) => {
        if (isNaN(indexOfChange)){
            return
        }
        const changedIndex = initialImgIndex + indexOfChange

        if (changedIndex >= imgCollection.length - 1 || changedIndex < 0) {
            return
        }

        setInitialImgIndex(changedIndex)
    }, [initialImgIndex, imgCollection.length])

    const hasMoreUp = useMemo(() => initialImgIndex < imgCollection.length - 2, [initialImgIndex, imgCollection.length])
    const hasMoreDown = useMemo(() => initialImgIndex > 0, [initialImgIndex])

    return (
        <div className={styles['img-grid']}>
            <CarouselButton changeCarousel={changeCarousel} isUp={false} isFill={hasMoreDown}/>
            <div className={styles['img-frame']}>
                <img
                    className={styles['img-img']}
                    src={imgCollection[initialImgIndex]}
                    alt=''
                    onClick={() => setCurrentImage(imgCollection[initialImgIndex])}
                />
            </div>
            <div className={styles['img-frame']}>
                <img
                    className={styles['img-img']}
                    src={imgCollection[initialImgIndex + 1]}
                    alt=''
                    onClick={() => setCurrentImage(imgCollection[initialImgIndex + 1])}
                />
            </div>
            <CarouselButton changeCarousel={changeCarousel} isUp={true} isFill={hasMoreUp}/>
        </div>
    )
}

export default ImageGrid