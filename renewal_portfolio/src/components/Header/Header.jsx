import styles from './Header.module.scss';
import Logo from "@/components/Logo/Logo.jsx";
import {useEffect, useState} from "react";
const Header = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 1000);
        return () => clearTimeout(timer);

    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <h1>
                    <a href="./">
                        <Logo/>
                    </a>
                </h1>
                <nav>
                    <ul className={`${show ? styles.visible : ""}`}>
                        <li><a href="#about">About</a></li>
                        <li><a href="#skill">Skill</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;