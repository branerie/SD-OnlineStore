import React, { useState, useMemo } from 'react'
import styles from '../index.module.css'

const SearchIconLink = () => {
    const [isFilled, setIsFilled] = useState(false)

    const fillColor = useMemo(() => {
        return isFilled
            ? '#16ee9d'
            : 'none'
    }, [isFilled])

    return (
        <div
            className={styles.container}
            style={{ paddingLeft: '5px' }}
            onMouseEnter={() => setIsFilled(true)}
            onMouseLeave={() => setIsFilled(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="110%" height="110%" viewBox="0 0 44.786 67.971">
                <g id="Group_1" data-name="Group 1" transform="translate(-1534.241 -103.111)">
                    <path id="Path_299" data-name="Path 299" d="M12343.864-986.766s2.248,22.468,8.171,26.145,4.7-2.247,4.7-2.247-11.029-17.362-8.374-23.9" transform="translate(-10787 1130)" fill={fillColor} stroke="#707070" strokeWidth="1" />
                    <path id="Path_52" data-name="Path 52" d="M2032.987,880.678c-.776-9.463,8.725-21.229,24.043-22.712s18.137,13.249,18.913,22.712,1.834,15.172-13.484,16.655S2033.763,890.142,2032.987,880.678Z" transform="translate(-497.943 -754)" fill={fillColor} stroke="#707070" strokeWidth="1.5" />
                    <path id="Path_53" data-name="Path 53" d="M2032.97,873.234c-.489-6.375,5.5-14.3,15.151-15.3s14.833,8.926,15.322,15.3-2.248,10.221-11.9,11.22S2033.459,879.609,2032.97,873.234Z" transform="translate(-492.443 -745.863)" fill="#fff" stroke="#707070" strokeWidth="1.5" />
                </g>
            </svg>

        </div>
    )
}

export default SearchIconLink