import React, { useState, useMemo } from 'react'
import styles from '../index.module.css'

const ShoppingCartIconLink = () => {
    const [isFilled, setIsFilled] = useState(false)

    const fillColor = useMemo(() => {
        return isFilled
            ? '#e2e835'
            : 'none'
    }, [isFilled])

    return (
        <div
            className={styles.container}
            onMouseEnter={() => setIsFilled(true)}
            onMouseLeave={() => setIsFilled(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50.777 43.976">
                <path id="Path_22" data-name="Path 22" d="M1649.249,1011.555c-34.153,5.007-7.243,24.784-7.243,24.784l20.723,3.242s15.609,5.188,0-10.375,19.156-14.914,19.156-14.914h0Z" transform="translate(-1631.171 -997.218)" fill={fillColor} stroke="#707070" strokeWidth="1.5" />
                <path id="Path_23" data-name="Path 23" d="M1655.163,1042.674c2.861-13.971,16.748-22.455,14.59-23.344-4.651-1.925-27.883,17.508-27.883,17.508h0" transform="translate(-1629.737 -1018.466)" fill="none" stroke="#707070" strokeWidth="1.5" />
            </svg>
        </div>
    )
}

export default ShoppingCartIconLink