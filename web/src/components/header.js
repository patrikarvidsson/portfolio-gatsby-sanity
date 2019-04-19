import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'

import logo from '../images/logo.black.svg'
import webring from '../images/icon.webring.svg'

import styles from './header.module.css'

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <h1 className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </h1>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to='/about/'>About</Link>
          </li>
          <li>
            <Link to='/portfolio/'>Portfolio</Link>
          </li>
          <li>
            <Link to='/blog/'>Blog</Link>
          </li>
          <li>
            <Link to='/contact/'>Contact</Link>
          </li>
          <li>
            <a href="https://webring.xxiivv.com/">
              <img src={webring} alt="Webring" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Header
