import styles from "./Main.module.scss";
import cursorImg from "@/assets/images/mouse_cursor.png";
import TextSlice from "@/components/Text/TextSlice.jsx";
import {useEffect, useState} from "react";
const MainSection = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 1000);
        return () => clearTimeout(timer);

    }, []);

    return (
        <section className={`${styles.mainSection} ${show ? styles.visible : ""}`}>
            <div className={styles.hero}>
                <h2>
                    <TextSlice text={`Sujeong's`} highlight={["e"]}/>
                    <TextSlice text={`Portfolio`} highlight={["o"]}/>
                    <TextSlice text={`Publisher`} highlight={["l","i"]}/>
                    <TextSlice text={`Front-End`}/>
                </h2>
                <div className={styles.imgWrap}>
                    <img src={cursorImg} alt="마우스커서"/>
                </div>
            </div>
        </section>
    )
}
export default MainSection;