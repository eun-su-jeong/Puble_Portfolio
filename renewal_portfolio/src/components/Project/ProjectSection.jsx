import styles from "./Project.module.scss";
import imgCu7 from "@/assets/images/mockup_cu7.webp";
import imgSb2 from "@/assets/images/mockup_sb2.webp";
import imgPn5 from "@/assets/images/mockup_pn5.webp";
import imgKb5 from "@/assets/images/mockup_kb5.webp";
import imgCs1 from "@/assets/images/mockup_cs1.webp";
import imgWf1 from "@/assets/images/mockup_wf1.webp";
import imgPf1 from "@/assets/images/react_portfolio.png";
import wip from "@/assets/images/wip.jpg";

import Modal from "@/components/Modal/Modal.jsx";
import {useState} from "react";
const ProjectSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = [
        {
            id: 1,
            title: "쿡쉐어 리뉴얼 프로젝트[진행중]",
            period: "2025.05 ~ 현재",
            image: wip,
            alt: "쿡쉐어 리뉴얼 프로젝트",
            stack: [],
            overlay: {
                content: "Web site"
            }
        },
        {
            id: 2,
            title: "Weekend Farm",
            period: "2024.02 ~ 2024.03 (4주)",
            image: imgWf1,
            alt: "주말농장 예약플랫폼 프로젝트",
            stack: ["JSP", "Spring Boot", "Ajax"],
            overlay: {
                content: "Web site"
            }
        },
        {
            id: 3,
            title: "CookShare",
            period: "2024.03 ~ 2024.05 (6주)",
            image: imgCs1,
            alt: "쿡쉐어 음식공유플랫폼 프로젝트",
            stack: ["React", "Redux", "SCSS"],
            overlay: {
                content: "Mobile Web"
            }
        },
        {
            id: 4,
            title: "React Portfolio Site",
            period: "2023.09 ~ 2023.12 (4개월)",
            image: imgPf1 ,
            alt: "리액트 포트폴리오 학습을 위한 페이지",
            stack: ["React", "Redux", "JavaScript", "SCSS"],
            overlay: {
                content: "Responsive Web"
            }
        },
        {
            id: 5,
            title: "신협리온브랜치",
            period: "2022.11 ~ 2023.07 (8개월)",
            image: imgCu7,
            alt: "신협리온브랜치 프로젝트",
            stack: ["Vue", "Quasar","Javascript"],
            overlay: {
                content: "Mobile Web"
            }
        },
        {
            id: 6,
            title: "저축은행중앙회 50주년 e역사관",
            period: "2022.10 ~ 2022.11 (2개월)",
            image: imgSb2,
            alt: "저축은행중앙회 50주년 e역사관 프로젝트",
            stack: ["HTML", "CSS", "Javascript"],
            overlay: {
                content: "Adaptive Web"
            }
        },
        {
            id: 7,
            title: "피노유엑스디 홈페이지 리뉴얼",
            period: "2022.08 ~ 2022.10 (2개월)",
            image: imgPn5,
            alt: "피노유엑스디 홈페이지 리뉴얼 프로젝트",
            stack: ["HTML", "CSS", "Javascript", "Swiper"],
            overlay: {
                content: "Responsive Web"
            }
        },
        {
            id: 8,
            title: "한국투자저축은행 통합모바일앱/ODS",
            period: "2021.06 ~ 2022.02 (8개월)",
            image: imgKb5,
            alt: "한국투자저축은행 통합모바일앱/ODS",
            stack: ["Websquare", "HTML", "CSS", "Javascript"],
            overlay: {
                content: "Mobile App, ODS"
            }
        },

    ]

    return(
        <section className={styles.projectSection}>
            <div className={`inner ${styles.projectContainer}`}>
                <div className={styles.titleWrap}>
                    <h2 className={styles.title}>Projects</h2>
                </div>
                <div className={styles.projectList}>
                    {
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className={styles.projectItem}
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className={styles.date}>
                                    {project.period}
                                </div>
                                <div className={styles.thumbnail}>
                                    <figure>
                                        <img src={project.image} alt={project.alt}/>
                                    </figure>
                                    <div className={styles.overlay}>
                                        <p className={styles.content}>{project.overlay.content}</p>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <h3 className={styles.title}>{project.title}</h3>
                                    <div className={styles.stack}>
                                        {
                                            project.stack.map((stack, index) => (
                                                <span key={index}>{stack}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {selectedProject && (
                <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    )
}
export default ProjectSection;