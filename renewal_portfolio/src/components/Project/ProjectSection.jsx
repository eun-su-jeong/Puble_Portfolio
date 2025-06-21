import styles from "./Project.module.scss";
import imgCu7 from "@/assets/images/mockup_cu7.webp";
import imgSb2 from "@/assets/images/mockup_sb2.webp";
import imgPn5 from "@/assets/images/mockup_pn5.webp";
import imgKb5 from "@/assets/images/mockup_kb5.webp";
import imgCs1 from "@/assets/images/mockup_cs1.webp";
import imgWf1 from "@/assets/images/mockup_wf1.webp";
const ProjectSection = () => {
    const projects = [
        {
            id: 1,
            title: "신협리온브랜치",
            period: "( 22.11 ~ 23.07 )",
            image: imgCu7,
            alt: "신협리온브랜치 프로젝트",
            stack: ["Vue", "Quasar","Javascript"],
            overlay: {
                content: "Mobile Web"
            }
        },
        {
            id: 2,
            title: "저축은행중앙회 50주년 e역사관",
            period: "( 22.10 ~ 22.11 )",
            image: imgSb2,
            alt: "저축은행중앙회 50주년 e역사관 프로젝트",
            stack: ["HTML", "CSS", "Javascript"],
            overlay: {
                content: "Adaptive Web"
            }
        },
        {
            id: 3,
            title: "피노유엑스디 홈페이지 리뉴얼",
            period: "( 22.08 ~ 22.10 )",
            image: imgPn5,
            alt: "피노유엑스디 홈페이지 리뉴얼 프로젝트",
            stack: ["HTML", "CSS", "Javascript", "Swiper"],
            overlay: {
                content: "Responsive Web"
            }
        },
        {
            id: 4,
            title: "한국투자저축은행 통합모바일앱/ODS",
            period: "( 21.06 ~ 22.02 )",
            image: imgKb5,
            alt: "한국투자저축은행 통합모바일앱/ODS",
            stack: ["Websquare", "HTML", "CSS", "Javascript"],
            overlay: {
                content: "Mobile App, ODS"
            }
        },
        {
            id: 5,
            title: "CookShare",
            period: "( 24.04 ~ 24.05 )",
            image: imgCs1,
            alt: "쿡쉐어 음식공유플랫폼 프로젝트",
            stack: ["React", "Redux", "SCSS"],
            overlay: {
                content: "Mobile Web"
            }
        },
        {
            id: 6,
            title: "Weekend Farm",
            period: "( 24.02 ~ 24.03 )",
            image: imgWf1,
            alt: "주말농장 예약플랫폼 프로젝트",
            stack: ["JSP", "Spring Boot", "Ajax"],
            overlay: {
                content: "Web site"
            }
        }
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
                            <div key={project.id} className={styles.projectItem}>
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
        </section>
    )
}
export default ProjectSection;