import { useContext } from 'react';
import styles from './HamburgerButton.module.css'; 
import { MenuContext } from '../../view/navState/NavState'

const HamburgerButton = () => {
    const { isMenuOpen, toggleMenu } = useContext(MenuContext);

    const clickHandler = () => {
        toggleMenu();
    };

    return (
        <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`} // Use CSS module classes
            aria-label="Открыть главное меню"
            onClick={clickHandler}
        >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
        </button>
    );
};

export default HamburgerButton;