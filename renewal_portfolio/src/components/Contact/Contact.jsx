import styles from "./Contact.module.scss";
import ScrollFadeIn from "@/components/common/ScrollFadeIn.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLink, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
    return(
        <section className={styles.contact} id={"contact"}>
            <div className={`inner ${styles.contactContainer}`}>
                <ScrollFadeIn className={styles.titleWrap}>
                    <h2 className={styles.title}>Contact Me</h2>
                    <p className={styles.subTitle}>
                        끝까지 봐주셔서 감사합니다.<br/> 언제든 편하게 연락 주세요.</p>
                </ScrollFadeIn>
                <ScrollFadeIn className={styles.contactInfo}>
                    <div className={styles.contactInfo__list}>
                        <a href="tel:01067657015" target="_blank">
                            <div className={styles.infoTitle}>
                                <FontAwesomeIcon className={styles.icon} icon={faPhone}/>
                                <span>전화번호</span>
                            </div>
                            <p className={styles.infoContent}>010.6765.7015</p>
                        </a>
                    </div>
                    <div className={styles.contactInfo__list}>
                        <a href="https://mail.naver.com/write/popup?srvid=note&amp;to=dmswid0@naver.com"
                           target="_blank">
                            <div className={styles.infoTitle}>
                                <FontAwesomeIcon className={styles.icon} icon={faEnvelope}/>
                                <span>이메일</span>
                            </div>
                            <p className={styles.infoContent}>dmswid0@naver.com</p>
                        </a>
                    </div>
                    <div className={styles.contactInfo__list}>
                        <a href="https://github.com/eun-su-jeong"
                           target="_blank">
                            <div className={styles.infoTitle}>
                                <FontAwesomeIcon className={styles.icon} icon={faGithub}/>
                                <span>Github</span>
                            </div>
                            <p className={styles.infoContent}>eun-su-jeong</p>
                        </a>
                    </div>
                    <div className={styles.contactInfo__list}>
                        <a href="/data/은수정_포트폴리오.pdf"
                           target="_blank">
                            <div className={styles.infoTitle}>
                                <FontAwesomeIcon className={styles.icon} icon={faLink}/>
                                <span>Portfolio</span>
                            </div>
                            <p className={styles.infoContent}>포트폴리오.pdf</p>
                        </a>
                    </div>
                </ScrollFadeIn>
            </div>
        </section>
    )

}
export default Contact;