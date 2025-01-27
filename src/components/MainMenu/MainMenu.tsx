import React, { useRef, useContext } from 'react'
import styles from './MainMenu.module.css'
import useOnClickOutside from '../../hooks/onClickOutside'
import { MenuContext } from '../../view/navState/NavState'
import HamburgerButton from '../HamburgerButton/HamburgerButton'
import  SideMenu  from '../SideMenu/SideMenu'

const MainMenu: React.FC = () => {
    const node = useRef<HTMLDivElement>(null)
    const { isMenuOpen, toggleMenu } = useContext(MenuContext)

    useOnClickOutside(node, () => {
        if (isMenuOpen) {
            toggleMenu()
        }
    })

    return (
        <header ref={node}>
            <div className={styles.navbar}>
                <HamburgerButton />
            </div>
            <SideMenu />
        </header>
    )
}

export default MainMenu