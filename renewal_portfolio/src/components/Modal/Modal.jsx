import styles from "./Modal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptopCode, faXmark} from "@fortawesome/free-solid-svg-icons";
import {fontAwesomeIcons} from "@/constants/icons.js";
import wip from "@/assets/images/wip.jpg";
import Accordion from "@/components/Accordian/Accordian.jsx";
const Modal = ({onClose}) => {
    return (
        <section
            className={styles.modal}
            onClick={onClose}
        >
            <div
                className={styles.modal__container}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.top}>
                    <div className={styles.iconWrap}>
                        <FontAwesomeIcon icon={faLaptopCode}/>
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                <div className={styles.infoWrap}>
                    <h2 className={styles.title}>Portfolio</h2>
                    <div className={styles.overview}>
                        <h3 className={styles.overview__title}>
                            <span>프로젝트 설명</span>
                        </h3>
                        <p className={styles.overview__content}>
                            설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다
                        </p>
                    </div>
                    <div className={styles.stack}>
                        <h3 className={styles.stack__title}>
                            <span>사용기술</span>
                        </h3>
                        <ul className={styles.stack__list}>
                            <li className={styles.stack__item}><FontAwesomeIcon icon={fontAwesomeIcons.sass} className={styles.icon}/></li>
                            <li className={styles.stack__item}><FontAwesomeIcon icon={fontAwesomeIcons.react} className={styles.icon}/></li>
                            <li className={styles.stack__item}><FontAwesomeIcon icon={fontAwesomeIcons.js} className={styles.icon}/></li>
                        </ul>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.member}>
                            <h3 className={styles.member__title}>
                                <span>참여인원</span>
                            </h3>
                            <p className={styles.member__content}>1명</p>
                        </div>
                        <div className={styles.date}>
                            <h3 className={styles.date__title}>
                                <span>작업기간</span>
                            </h3>
                            <p className={styles.date__content}>2023.05 ~ 현재</p>
                        </div>
                        <div className={styles.link}>
                            <h3 className={styles.link__title}>
                                <span>관련 링크</span>
                            </h3>
                            <p className={styles.link__content}>github.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.contentWrap}>
                    <div className={styles.contentWrap__image}>
                        <img src={wip} alt="이미지"/>
                    </div>
                    <div className={styles.contentWrap__features}>
                        <h2>📌 주요 기능</h2>
                        <ul>
                            <li>회원가입 스텝별 UI 구현</li>
                            <li>Kakao Map 연동 냉장고 검색</li>
                        </ul>
                    </div>
                    <div className={styles.contentWrap__perfomance}>
                        <h2>✨ 작업 기여도</h2>
                        <Accordion
                            title="UI 구현"
                        >
                            <p>UI 구현</p>
                        </Accordion>
                        <Accordion
                            title="UI 구현"
                        >
                            <p>UI 구현</p>
                        </Accordion>
                    </div>
                    <div className={styles.contentWrap__preveiw}></div>
                </div>
            </div>
        </section>
        )
}
export default Modal