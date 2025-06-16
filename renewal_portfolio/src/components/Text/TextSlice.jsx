import styles from "./TextSlice.module.scss";
const TextSlice = ({text, highlight = [] }) => {
    return(
        <div className={styles.justifyLine}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className={highlight.includes(char)? styles.over : ""}
                >
                    {char}
                </span>
            ))}
        </div>
    )
}

export default TextSlice