import React from 'react'
import {Link} from 'react-router-dom'
import styles from "./Navigation.module.css";


const Navigation = () => {

    // Inline CSS
    const brandStyle = {
        color:'#fff',
        textDecoration :'none',
        display : 'flex',
        alignItems : 'center',
        fontSize : '1.375rem'
    }

    const logoText = {
        marginLeft : '.75rem',
        fontWeight : '700'
    }

    const logoImgStyle = {
        width : '2rem',
    }

  return (
    <nav className={`${styles.navbar} container`}>
        <Link style={brandStyle} to='/'>
            <img style={logoImgStyle} src='/images/Emoji.png' alt="logo" />
            <span style={logoText}>ChatHouse</span>
        </Link>
    </nav>
  )
}

export default Navigation
