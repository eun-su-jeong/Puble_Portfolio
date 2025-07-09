import styles from "./Project.module.scss";
import Modal from "@/components/Modal/Modal.jsx";
import {useState} from "react";
import {projectList} from "@/data/projectList.js";
import ScrollFadeIn from "@/components/common/ScrollFadeIn.jsx";
const ProjectSection = ({...rest}) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = projectList;

    return(
        <section className={styles.projectSection}>
            <div className={`inner ${styles.projectContainer}`}>
                <div className={styles.titleWrap}>
                    <ScrollFadeIn>
                        <h2 className={styles.title}>Projects</h2>
                    </ScrollFadeIn>
                </div>
                <div className={styles.projectList}>
                    {
                        projects.map((project, index) => (
                            <ScrollFadeIn
                                duration={0.3}
                                delay={index * 0.1}
                                y={100}
                                amount={0}
                                {...rest}

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
                            </ScrollFadeIn>
                        ))}
                </div>
            </div>
            {selectedProject && (
                <Modal
                    project={selectedProject}
                    selectedId={selectedProject.id}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    )
}
export default ProjectSection;