import styles from './Header.module.scss';
import Logo from "@/components/Logo/Logo.jsx";
const Header = () => {
    return (
        <header className={styles.header}>
            <h1>
                <a href="./">
                    <Logo/>
                </a>
            </h1>
            <nav>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;