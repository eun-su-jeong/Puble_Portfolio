const TextSlice = ({text, highlihgt = [] }) => {
    return(
        <div className={styles.justifyLine}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className={highlihgt.includes(index)? styles.over : ""}
                >
                    {char}
                </span>
            ))}
        </div>
    )
}

export default TextSlice