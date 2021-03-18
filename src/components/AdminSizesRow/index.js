import React from 'react'
import QuantityInput from '../InputFields/QuantityInput'
import SubmitButton from '../SubmitButton'
import styles from './index.module.css'

const AdminSizesRow = ({ sizeName, count, handleDelete, handleChange }) => {
    return (
        <div className={styles.container}>
            <div className={styles['inner-container']}>
                {sizeName}
                <QuantityInput value={count} setNewValue={handleChange} min={0} />
            </div>
            <SubmitButton 
                type='button'
                text='Remove' 
                onClick={handleDelete} 
                style={{ maxWidth: '8rem' }} 
                btnType='delete' 
            />
        </div>
    )
}

export default AdminSizesRow