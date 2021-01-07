import React from 'react'
import styles from './index.module.css'

const AdminSizesRow = ({ action, sizeName, count, handleDelete, selectForEdit }) => {
    return (
        <div className={styles.container}>
            <div className={action && styles['size-edit']}>
                {sizeName} - {count}
            </div>
            <div>
                <button
                    type='button'
                    onClick={selectForEdit}>
                    Edit
                </button>
                <button
                    type='button'
                    onClick={() => handleDelete(sizeName)}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default AdminSizesRow