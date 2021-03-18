import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../contexts/ProductsContext'
import { updateProductSizes } from '../../services/adminProduct'
import AdminSizesRow from '../AdminSizesRow'
import AdminSizesAdd from '../AdminSizesAdd'
import ErrorContext from '../../contexts/ErrorContext'
import ModifyProductSection from '../ModifyProductSection'
import SubmitButton from '../SubmitButton'

import { ReactComponent as PlusSign } from '../../images/plus.svg'

const AdminSizes = ({ sizes, productId }) => {
    const [currentSizes, setCurrentSizes] = useState(sizes)
    const [modifiedSizes, setModifiedSizes] = useState({})
    const [isAdding, setIsAdding] = useState(false)
    const { addMessage } = useContext(ErrorContext)

    const { updateFilters, updateProductsPage } = useContext(ProductsContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const modifiedSizesValues = Object.values(modifiedSizes)
        const updatedSizes = await updateProductSizes(productId, modifiedSizesValues)
        if (updatedSizes.error) {
            addMessage(
                'Product Size Update',
                'An error occurred while trying to update product sizes'
            )

            return
        }

        setModifiedSizes({})
        updateFilters()
        updateProductsPage()
    }

    const handleSizeDelete = (sizeName) => {
        const newCurrentSizes = { ...currentSizes }
        delete newCurrentSizes[sizeName]

        setCurrentSizes(newCurrentSizes)

        // sive was just added and is not saved, so we don't need to add a 'delete' action
        // but to simply remove the 'add' one
        if (modifiedSizes[sizeName] && modifiedSizes[sizeName].action === 'add') {
            const newModifiedSizes = { ...modifiedSizes }
            delete newModifiedSizes[sizeName]

            return setModifiedSizes(newModifiedSizes)
        }

        setModifiedSizes({ 
            ...modifiedSizes, 
            [sizeName]: { 
                value: { sizeName, count: currentSizes[sizeName] }, 
                action: 'delete' 
            } 
        })
    }

    const handleSizeChange = (sizeName, newCount) => {
        setCurrentSizes({ ...currentSizes, [sizeName]: newCount })

        // size was just added and is not saved, so action should stay 'add'
        if (modifiedSizes[sizeName] && modifiedSizes[sizeName].action === 'add') {
            const newSizeModification = { ...modifiedSizes[sizeName] }
            newSizeModification.value.count = newCount

            return setModifiedSizes({ ...modifiedSizes, [sizeName]: newSizeModification })
        }

        setModifiedSizes({ 
            ...modifiedSizes, 
            [sizeName]: { 
                value: { sizeName, count: newCount }, 
                action: 'edit' 
            } 
        })
    }

    const handleSizeAdd = (sizeName) => {
        if (currentSizes[sizeName]) {
            return
        }

        setCurrentSizes({ ...currentSizes, [sizeName]: 1 })

        if (modifiedSizes[sizeName] && modifiedSizes[sizeName].action === 'delete') {
            if (modifiedSizes[sizeName].value.count === 1) {
                // user deleted this sizeName which had a count of 1 and is now trying to add
                // the sizeName again; in this case, we can clear the modifications for this sizeName
                const newModifiedSizes = { ...modifiedSizes }
                delete newModifiedSizes[sizeName]
                return setModifiedSizes(newModifiedSizes)
            }

            // user deleted this sizeName and it had a count !== 1
            // in this case, we change the modification to 'edit' and change the count to 1
            return setModifiedSizes({ 
                ...modifiedSizes, 
                [sizeName]: { 
                    value: { sizeName, count: 1 }, 
                    action: 'edit' 
                } 
            })
        }

        setModifiedSizes({ 
            ...modifiedSizes, 
            [sizeName]: { 
                value: { sizeName, count: 1 }, 
                action: 'add' 
            } 
        })
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <ModifyProductSection title='Available sizes'>
                <div className={styles['btn-add']}>
                    <PlusSign className={styles.plus} onClick={() => setIsAdding(true)} />
                </div>
                <div className={styles.table}>
                    {Object.entries(currentSizes).map(([sizeName, count]) => {
                        return (
                            <AdminSizesRow
                                sizeName={sizeName}
                                count={count}
                                handleDelete={() => handleSizeDelete(sizeName)}
                                handleChange={newCount => handleSizeChange(sizeName, newCount)}
                            />
                        )
                    })
                    }
                    {isAdding && <AdminSizesAdd hideInput={() => setIsAdding(false)} handleAdd={handleSizeAdd} />}
                </div>
            </ModifyProductSection>
            <SubmitButton
                text='SAVE SIZES'
                disabled={Object.keys(modifiedSizes).length === 0 || 
                          Object.keys(currentSizes).length === 0}
                style={{ flexGrow: 2 }}
            />
        </form>
    )
}

export default AdminSizes