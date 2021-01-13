import React from 'react'
import styles from './index.module.css'

const ImageGrid = ({src, setCurrentImage}) => {

    return (
        <div className={styles['img-grid']}>
            {src ?
                src.map(line => {
                return (
                    <div className={styles['img-list']}>
                        <img
                            className={styles['img-img']}
                            src={line}
                            onClick={() => setCurrentImage(line)}
                        />
                    </div>)})
                : <></>
            }
        </div>
    )
}

export default ImageGrid