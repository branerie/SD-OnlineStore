import React, { useCallback, useState } from 'react'
import styles from './index.module.css'
import CarouselButton from '../carouselButton'

const ImageGrid = ({imgCollection, setCurrentImage}) => {
    const [initialImg, setInitialImg] = useState(0)
    // const [isMoreUp, setIsMoreUp] = useState(true)
    const changeCarousel = useCallback((indexOfChange) => changeInitialIndex(indexOfChange),[initialImg])
    let isMoreUp = true
    let isMoreDown = false

    if (initialImg === (imgCollection.length - 2)) {
        isMoreUp = false
    } 

    if (initialImg !== 0) {
        isMoreDown = true
    }
    
    const changeInitialIndex = (indexOfChange) => {
        if (isNaN(indexOfChange)){
            return
        }
        const changedIndex = initialImg + indexOfChange

        if (changedIndex >= imgCollection.length - 1 || changedIndex < 0) {
            return
        }

        setInitialImg(changedIndex)
    }


    return (
        <div className={styles['img-grid']}>
            <CarouselButton changeCarousel={changeCarousel} isUp={false} isFill={isMoreDown}/>
            <div className={styles['img-frame']}>
                <img
                    className={styles['img-img']}
                    src={imgCollection[initialImg]}
                    onClick={() => setCurrentImage(imgCollection[initialImg])}
                />
            </div>
            <div className={styles['img-frame']}>
                <img
                    className={styles['img-img']}
                    src={imgCollection[initialImg + 1]}
                    onClick={() => setCurrentImage(imgCollection[initialImg + 1])}
                />
            </div>
            <CarouselButton changeCarousel={changeCarousel} isUp={true} isFill={isMoreUp}/>
        </div>
    )
}

export default ImageGrid