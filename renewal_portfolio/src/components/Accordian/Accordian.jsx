import styles from "./Accordian.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";

const Accordion = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    return (
        <div className={styles.accordion}>
            <button
                className={styles.accordion__toggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className={`${styles.icon} ${isOpen ? styles.active : ""}`}
                />
            </button>
                <div
                    ref={contentRef}
                    className={`${styles.accordion__content} ${isOpen ? styles.active : ""}`}
                    style={{
                        maxHeight: isOpen
                            ? `${contentRef.current?.scrollHeight}px`
                            : "0px",
                    }}
                >
                    <div className={styles.accordionInner}>
                        {children}
                    </div>
                </div>
        </div>
    );
};

export default Accordion;