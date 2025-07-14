import styles from "./Intro.module.scss";
import {useEffect, useState} from "react";
const Intro = ({onFinish}) => {
    const [phase, setPhase] = useState("circle");
    const [visibleLetters, setVisibleLetters] = useState("");

    useEffect(() => {
        const timers = [];

        // 원 → 인삿말 → 로고 → 끝 순서로 진행
        timers.push(setTimeout(() => setPhase("greeting"), 2000));
        timers.push(setTimeout(() => setPhase("logo"), 4000));

        // 로고 타이핑 (E → U → N)
        const logo = "EUN";
        logo.split("").forEach((letter, index) => {
            timers.push(setTimeout(() => {
                setVisibleLetters((prev) => prev + letter);
            }, 4200 + index * 400)); // E: 4200ms, U: 4600ms, N: 5000ms
        });

        // 인트로 종료
        timers.push(setTimeout(() => {
            setPhase("done");
        }, 6000));

        timers.push(setTimeout(() => {
            onFinish?.(); // → Intro 컴포넌트 제거
        }, 6800)); // fadeOutUp 끝난 뒤 제거

        return () => timers.forEach(clearTimeout);
    }, [onFinish]);

    return (
                <div
                className={`${styles.introWrapper} ${phase === "done" ? styles.fadeOutUp : ""}`}
                initial={{opacity: 1}}
                >
                {phase === "circle" && (
                    <div className={styles.circles}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                    </div>
                )}

                {phase === "greeting" && (
                    <div className={styles.greeting}>
                        <p><span>HI! I'M EUN SU JEONG👋</span><span>Nice to meet you :)</span></p>
                    </div>
                )}

                {phase === "logo" && (
                    <div className={styles.logo}>
                        {visibleLetters.split("").map((char, index) => (
                            <span key={index}>{char}</span>
                        ))}
                    </div>
                )}
                </div>
    )
}
export default Intro;