import React, { useCallback, useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'
import { updateProductSizes } from '../../services/adminProduct'
import AdminSizesRow from '../adminSizesRow'
import AdminSizesEdit from '../adminSizesEdit'
import ErrorContext from '../../ErrorContext'

const AdminSizes = ({ sizes, productId }) => {
    const [currentProductSizes, setCurrentProductSizes] = useState(sizes)
    const [modifiedSizes, setModifiedSizes] = useState([])
    const [editedSizeName, setEditedSizeName] = useState('')
    const { addMessage } = useContext(ErrorContext)

    const { updateFilters, updateProductsPage } = useContext(ProductsContext)

    const handleDelete = useCallback((sizeName) => {
        const sizeToDelete = currentProductSizes.find(ps => ps.sizeName === sizeName)

        const newModifiedSizes = [...modifiedSizes]
        const oldModificationIndex = newModifiedSizes.findIndex(ms => 
                                                        ms.value.sizeName === sizeName)

        const newModification = { value: sizeToDelete, action: 'delete' }
        if (oldModificationIndex >= 0) {
            newModifiedSizes[oldModificationIndex] = newModification
        } else {
            newModifiedSizes.push(newModification)
        }

        setModifiedSizes(newModifiedSizes)
        setCurrentProductSizes(currentProductSizes.filter(ps => ps.sizeName !== sizeName))
    }, [setModifiedSizes, currentProductSizes])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const updatedSizes = await updateProductSizes(productId, modifiedSizes)
        if (updatedSizes.error) {
            addMessage(
                'Product Size Update', 
                'An error occurred while trying to update product sizes'
            )

            return
        }

        setModifiedSizes([])
        updateFilters()
        updateProductsPage()
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.title}>
                    <span className={styles.h3}>Available sizes</span>
                </div>
                <div className={styles.table}>
                    {
                        currentProductSizes.map(productSize => {
                            return (
                                <AdminSizesRow
                                    action={productSize.action}
                                    sizeName={productSize.sizeName}
                                    count={productSize.count}
                                    handleDelete={handleDelete}
                                    selectForEdit={() => setEditedSizeName(productSize.sizeName)}
                                />
                            )
                        })                        
                    }
                </div>
                <button type='submit'>SAVE</button>
            </form>
            <AdminSizesEdit
                productSizes={currentProductSizes}
                setProductSizes={setCurrentProductSizes}
                modifiedSizes={modifiedSizes}
                setModifiedSizes={setModifiedSizes}
                editedSizeName={editedSizeName}
            />
        </div>
    )
}

export default AdminSizes