import React, { useMemo } from 'react'
import styles from './index.module.css'
import SizeButton from '../SizeButton'

const ProductSizes = ({ sizes, selectedSize, setSelectedSize }) => {
    const isOutOfStock = useMemo(() => sizes.every(s => s.count === 0), [sizes])

    return (
        <>
        { isOutOfStock && <h4 className={styles['stock-empty']}>Out Of Stock</h4> }
        { sizes.filter(s => s.count > 0).map(s => {
                return (
                    <SizeButton
                        sizeName={s.sizeName}
                        handleSelect={setSelectedSize}
                        isSelected={s.sizeName === selectedSize}
                    />
                )
            })
        }
        </>
    )
}

export default ProductSizes