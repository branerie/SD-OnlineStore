import React from 'react'
import styles from './index.module.css'

const AdminSizes = (props) => {


    const Field = ({label, name, value, onChange}) => {
        return (
            <div >
                <label ></label>
            </div>
        )
    }



    return (
        
            <form className={styles.container} onSubmit={handleSumnit}>


                
                <button type='submit'>SAVE</button>
            </form>

    )
}

export default AdminSizes