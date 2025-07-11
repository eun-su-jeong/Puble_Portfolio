import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer>
            <div className={`inner ${styles.footerContainer}`}>
                <p>&copy; 2025 EUNSUJEONG. All Rights Reserved.</p>
            </div>
        </footer>
)
}
export default Footer