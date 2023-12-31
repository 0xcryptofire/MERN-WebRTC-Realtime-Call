import React from 'react'
import styles from './Card.module.css'


const Card = ( { title , icon , children } ) => {       // children - is a special type of prop in react which provide context of the content written within component.
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img style={
          {
            marginRight : '1rem',
          }
        } src={`/images/${icon}.png`} alt={`${icon}`} />

        <h2 style={
          { 
            fontWeight : '700'
          }
        } >{title}</h2>
      </div>
      {children}
    </div>
  )
}

export default Card
