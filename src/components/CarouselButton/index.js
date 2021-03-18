import React from 'react'
import styles from './index.module.css'

const CarouselButton = ({ changeCarousel, isUp, isFill }) => {
    const fillArrow = isFill ? '#3D5344' : 'none'
    return (
        <>
            { isUp
                ?
                    <div
                        className={styles['btn-carousel']}
                        onClick={() => changeCarousel(1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="66.137" height="18.774" viewBox="0 0 66.137 18.774">
                            <path id="Path_381" data-name="Path 381" d="M20034.689,747.7c67.189-.472,65.182,6.376,63.527,9.328s-10.627,8.266-10.627,8.266-7.084-9.21-4.133-9.919,2.363,2.952,4.133-1.417-44.988.118-45.7-.827S20034.689,747.7,20034.689,747.7Z" transform="translate(-20033.102 -747.18)" fill={fillArrow} stroke="#707070" stroke-width="1"/>
                        </svg>
                    </div>
                :
                    <div
                        className={styles['btn-carousel']}
                        onClick={() => changeCarousel(-1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="66.137" height="18.774" viewBox="0 0 66.137 18.774">
                            <path id="Path_381" data-name="Path 381" d="M20034.689,765.275c67.189.472,65.182-6.376,63.527-9.328s-10.627-8.266-10.627-8.266-7.084,9.21-4.133,9.919,2.363-2.952,4.133,1.417-44.988-.118-45.7.827S20034.689,765.275,20034.689,765.275Z" transform="translate(-20033.102 -747.024)" fill={fillArrow} stroke="#707070" stroke-width="1"/>
                        </svg>
                    </div>
                    
            }
        </>
    )
}

export default CarouselButton