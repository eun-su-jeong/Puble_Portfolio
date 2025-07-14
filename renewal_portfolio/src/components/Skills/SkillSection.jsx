import styles from './Skills.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fontAwesomeIcons } from "@/constants/icons";
import { techLogos } from "@/constants/techLogos";
import {useState} from "react";
import ScrollFadeIn from "@/components/common/ScrollFadeIn.jsx";
const SkillSection = () => {
    const [filter, setFilter] = useState("all")
    const skillList = [
        {
            id: 1,
            name: "HTML5",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.html} className={styles.icon}/>,
            level: "confident",
            description:[
                "웹 표준과 접근성을 고려한 시맨틱 마크업 작성",
                "레이아웃 구조 설계 및 SEO를 고려한 콘텐츠 구조 구현"
            ]
        },
        {
            id: 2,
            name: "CSS3",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.css} className={styles.icon}/>,
            level: "confident",
            description: [
                "그리드/Flexbox을 활용한 반응형 레이아웃",
                "트랜지션·애니메이션을 이용한 사용자 인터랙션 개선"
            ]

        },
        {
            id: 3,
            name: "SCSS",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.scss} className={styles.icon}/>,
            level: "confident",
            description: [
                "변수, 믹스인, 중첩 등을 활용한 구조적인 스타일 설계",
                "모듈화 및 계층적 네이밍을 통해 유지보수성 향상"
            ]
        },
        {
            id: 4,
            name: "React",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.react} className={styles.icon}/>,
            level: "confident",
            description: [
                "컴포넌트 기반 UI 설계 및 재사용 가능한 구조 구성",
                "Redux·Zustand 상태관리 적용 및 React Router 기반 SPA 구현"
            ]
        },
        {
            id: 5,
            name: "TypeScript",
            icon: <img src={techLogos.typescript} className={styles.typescript} alt="typescript아이콘"/>,
            level: "growing",
            description: [
                "기초 문법 학습 및 간단한 타입 정의를 통한 안정성 확보",
                "React 프로젝트에 점진적으로 적용 중"
            ]
        },
        {
            id: 6,
            name: "Javascript",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.js} className={styles.icon}/>,
            level: "confident",
            description: [
                "이벤트 처리 및 DOM 조작, Axios를 활용한 API 통신",
                "모듈화 및 유틸 함수 관리 경험"
            ]
        },
        {
            id: 7,
            name: "Jquery",
            icon: <img src={techLogos.jquery} className={styles.jquery} alt="jquery아이콘"/>,
            level: "confident",
            description: [
                "슬라이더, 탭, 모달 등 다양한 인터랙션 구현",
                "유지보수 및 AJAX 활용한 데이터 요청 및 처리",
            ]
        },
        {
            id: 8,
            name: "Figma",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.figma} className={styles.icon}/>,
            level: "growing",
            description: [
                "와이어프레임 및 프로토타입 기반 개발 협업 경험",
                "디자인 시안 분석 및 컴포넌트 구조 파악"
            ]
        },
        {
            id: 9,
            name: "GitHub",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.github} className={styles.icon}/>,
            level: "confident",
            description: [
                "Git Flow 전략 기반 브랜치 관리 및 PR 경험",
                "협업을 위한 이슈 관리 및 버전 관리 경험"
            ]
        },
        {
            id: 10,
            name: "JSP",
            icon: <img src={techLogos.jsp} className={styles.jsp} alt="jsp아이콘"/>,
            level: "learning",
            description: [
                "EL, JSTL을 활용한 동적 페이지 구현",
                "기초적인 서버 사이드 렌더링 구조 이해"
            ]
        },
        {
            id: 11,
            name: "Spring Boot",
            icon: <img src={techLogos.springboot} alt="springboot아이콘"/>,
            level: "learning",
            description: [
                "간단한 REST API 구현 및 프론트엔드 연동 실습",
                "Spring MVC 흐름 및 의존성 주입 개념 학습"
            ]
        },
        {
            id: 12,
            name: "MySQL",
            icon: <img src={techLogos.mysql} alt="mysql아이콘"/>,
            level: "learning",
            description: [
                "기본 테이블 설계 및 CRUD 쿼리 작성 경험",
                "프론트와 연동된 데이터베이스 구축 실습"
            ]
        },
        {
            id: 13,
            name: "Java",
            icon: <FontAwesomeIcon icon={fontAwesomeIcons.java} className={styles.icon}/>,
            level: "learning",
            description: [
                "객체지향 프로그래밍 기초 개념 학습",
                "Spring 연계를 위한 기초 문법 실습"
            ]
        },

    ]
    return (
        <section className={styles.skillsSection} id={'skill'}>
            <div className={`inner ${styles.skillsContainer}`}>
                <div className={styles.titleWrap}>
                    <ScrollFadeIn y={30}>
                        <h2 className={styles.title}>Skills</h2>
                    </ScrollFadeIn>
                    <ScrollFadeIn y={30}>
                        <div className={styles.subtext}>
                        <div className={styles.subtext__box} onClick={()=>setFilter("all")}>
                            <span
                                className={styles.colorChip}
                                data-level="all">
                            </span>
                            <span className={styles.colorDesc}>전체</span>
                        </div>
                        <div className={styles.subtext__box} onClick={()=>setFilter("confident")}>
                            <span
                                className={styles.colorChip}
                                data-level="confident">
                            </span>
                            <span className={styles.colorDesc}>자주써요</span>
                        </div>
                        <div className={styles.subtext__box} onClick={()=>setFilter("growing")}>
                            <span
                                className={styles.colorChip}
                                data-level="growing">
                            </span>
                            <span className={styles.colorDesc}>익숙해지는 중이에요</span>
                        </div>
                        <div className={styles.subtext__box} onClick={() => setFilter("learning")}>
                            <span
                                className={styles.colorChip}
                                data-level="learning">
                            </span>
                            <span className={styles.colorDesc}>공부중이에요</span>
                        </div>
                    </div>
                    </ScrollFadeIn>
                </div>
                <ScrollFadeIn className={styles.skillsContainer__list} y={30} amount={0.3}>
                    {
                        skillList
                            .filter(skill => filter === "all" || skill.level === filter)
                            .map(skill => (
                                <div className={styles.skillsCard} key={skill.id}>
                                    <div className={styles.skillsCard__info}>
                                        <span className={styles.number}>
                                            {skill.id < 10 ? `0${skill.id}` : skill.id}
                                        </span>
                                        {skill.icon}
                                        <p className={styles.name}>{skill.name}</p>
                                    </div>
                                    <div className={styles.skillsCard__desc} data-level={skill.level}>
                                        <ul>
                                            {
                                                skill.description.map((desc, index) => (
                                                    <li key={index}>✅ {desc}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                    }
                </ScrollFadeIn>
            </div>
        </section>
)}
export default SkillSection