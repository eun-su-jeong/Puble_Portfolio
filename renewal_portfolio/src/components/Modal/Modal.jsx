import styles from "./Modal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptopCode, faLink, faVideo, faXmark} from "@fortawesome/free-solid-svg-icons";
import {fontAwesomeIcons} from "@/constants/icons.js";
import {techLogos} from "@/constants/techLogos.js";
import Accordion from "@/components/Accordian/Accordian.jsx";
import {projectDetails} from "@/data/projectDetails.js";
import {useEffect, useState} from "react";
import {faFigma, faGithub} from "@fortawesome/free-brands-svg-icons";
const Modal = ({onClose, selectedId}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const data = projectDetails[selectedId];

    if (!data) return null;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

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
                    <h2 className={styles.title}>{data.title}</h2>
                    <div className={styles.overview}>
                        <h3 className={styles.overview__title}>
                            <span>프로젝트 설명</span>
                        </h3>
                        <p className={styles.overview__content}>
                            {data.description}
                        </p>
                    </div>
                    <div className={styles.stack}>
                        <h3 className={styles.stack__title}>
                            <span>사용기술</span>
                        </h3>
                        <ul className={styles.stack__list}>
                            {data.stack.map((tech, i) => (
                                <li key={i} className={styles.stack__item}>
                                    {fontAwesomeIcons[tech] ? (
                                        <FontAwesomeIcon
                                            icon={fontAwesomeIcons[tech]}
                                            className={styles.icon}
                                        />
                                    ) : techLogos[tech] ? (
                                        <img
                                            src={techLogos[tech]}
                                            alt={tech}
                                            className={styles.icon}
                                        />
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.member}>
                            <h3 className={styles.member__title}>
                                <span>참여인원</span>
                            </h3>
                            <p className={styles.member__content}>{data.member}</p>
                        </div>
                        <div className={styles.date}>
                            <h3 className={styles.date__title}>
                                <span>작업기간</span>
                            </h3>
                            <p className={styles.date__content}>{data.period}</p>
                        </div>
                        <div className={styles.link}>
                            {data.link.length > 0 && (
                                <>
                                    <h3 className={styles.link__title}>
                                        <span>관련 링크</span>
                                    </h3>
                                    <div className={styles.link__contentWrap}>
                                        {data.link?.map((url, index) => {
                                            let icon;
                                            if (url.includes("github.com")) {
                                                icon = faGithub;
                                            } else if (url.includes("figma.com")) {
                                                icon = faFigma;
                                            } else if (url.includes("youtube.com")) {
                                                icon = faVideo;
                                            } else {
                                                icon = faLink;
                                            }

                                            return (
                                                <a
                                                    key={index}
                                                    href={url}
                                                    className={styles.link__content}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`관련 링크 ${index + 1}`}
                                                >
                                                    <FontAwesomeIcon className={styles.icon} icon={icon}/>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.contentWrap}>
                    <div className={styles.contentWrap__image}>
                        <img src={data.keyImage} alt={data.alt}/>
                    </div>
                    {data.features?.length > 0 && (
                        <div className={styles.contentWrap__features}>
                            <h2>📌 주요 기능</h2>
                            <ul>
                                {data.features.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className={styles.contentWrap__perfomance}>
                        <h2>
                            ✨ 작업 기여도
                            <span
                                className={styles.percent}
                            >
                                {data.percent}
                            </span>
                        </h2>
                        {data.contributions.map((item, i) => (
                            <Accordion
                                key={i}
                                title={item.title}
                            >
                                {Array.isArray(item.content) ? (
                                    item.content.map((desc, idx) => <p key={idx}>{desc}</p>)
                                ) : (
                                    <p>{item.content}</p>
                                )}
                            </Accordion>
                        ))}
                    </div>
                    <div className={styles.contentWrap__preveiw}>
                        <h2>💻 작업 화면</h2>
                        <div className={styles.thumbnailWrap}>
                            {data.previews?.map((preview, index) =>(
                                <div
                                    key={index}
                                    className={styles.item}
                                    onClick={() =>
                                        setPreviewImage({
                                            src: preview.image,
                                            caption: preview.caption,
                                        })
                                    }
                                >
                                    <img
                                        src={preview.image}
                                        alt={preview.caption}
                                        className={styles.thumbnail}
                                    />
                                    <p className={styles.caption}>{preview.caption}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {previewImage && (
                <div className={styles.imageModal} onClick={() => setPreviewImage(null)}>
                    <div className={styles.imageModal__inner} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.previewImageWrap}>
                            <img src={previewImage.src} alt="확대 이미지" />
                        </div>
                        <p>{previewImage.caption}</p>
                        <button onClick={() => setPreviewImage(null)}>닫기</button>
                    </div>
                </div>
            )}
        </section>
    )
}
export default Modal