import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const NavbarImageLink = ({ name, path, imageName }) => {
    const [isShowing, setIsShowing] = useState(false)
    const ref = useRef(null)

    const handleMouseEnter = () => {
        ref.current.style.position = 'absolute'
        ref.current.style.top = 0
        ref.current.style.left = '50%'
        ref.current.style.transform = 'translate(-50%)'

        setIsShowing(!isShowing)
    }

    const handleMouseLeave = () => {
        ref.current.style.position = 'static'
        ref.current.style.top = ''
        ref.current.style.left = ''
        ref.current.style.transform = ''
        setIsShowing(!isShowing)
    }
    
    return (
        <div className={styles.container}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            { isShowing && <img src={`/images/${imageName}`} className={styles.image} />}
            <Link to={path} className={styles.link} ref={ref}>
                <span>{name}</span>
            </Link>
        </div>
    )
}

export default NavbarImageLink