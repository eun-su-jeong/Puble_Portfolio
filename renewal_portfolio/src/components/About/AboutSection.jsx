import styles from './About.module.scss';
import profile from '../../assets/images/profile.webp';
import star from '../../assets/images/ico_star.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faGraduationCap, faLaptopCode} from "@fortawesome/free-solid-svg-icons";
import ScrollFadeIn from "@/components/common/ScrollFadeIn.jsx";
const AboutSection = () => {
    const keywords = [
        "세심한 UI설계", "소통의 다리", "사용자경험중심"
    ];

    const experienceList = [
        {
            icon: faLaptopCode,
            term: "2025.03 ~ 현재",
            title: "(주)넥스트미션",
            description: "웹에이전시[프리랜서 퍼블리셔]",
            details: [
                "PHP 솔루션 기반의 반응형 웹 페이지 퍼블리싱 담당",
                "교육 강의 사이트, 컴퓨터 판매몰, 셀러 중개 플랫폼 등 다양한 웹 프로젝트 참여"
            ]
        },
        {
            icon: faGraduationCap,
            term: "2023.10 ~ 2024.05",
            title: "ELK 빅데이터 분석 및 시각화 개발자 양성과정 수료",
            details: [
                "Java, Spring Boot 기반 백엔드 개발과 React를 활용한 SPA 프론트엔드 구현",
                "주말 농장, 쿡 쉐어 등 실무 프로젝트를 통해 전체 개발 프로세스 경험"
            ]
        },
        {
            icon: faGraduationCap,
            term: "2023.09 ~ 2023.12",
            title: "리액트 프론트엔드 개발 실무과정 수료",
            details: [
                "React와 Redux를 활용한 SPA 구조의 프론트엔드 개발과 상태 관리",
                "Sass, Router, 애니메이션등을 적용해 UI/UX 구현 및 프로젝트 완성"
            ]
        },
        {
            icon: faGraduationCap,
            term: "2023.09 ~ 2023.12",
            title: "자바스크립트 객체지향(ES6)과정 수료",
            details: [
                "Javascript의 문법 기초와 이벤트 처리 적용",
                "UI요소를 모듈화하여 컴포넌트 설계"
            ]
        },
        {
            icon: faBuilding,
            term: "2021.06 ~ 2023.07",
            title: "(주)피노유엑스디",
            description: "웹에이전시[UI개발사업부/UI개발팀/퍼블리셔 2년]",
            details: [
                "금융권 UI 개발 프로젝트 다수 참여, 웹 접근성과 반응형 마크업 경험 보유",
                "Vue3·WebSquare5 기반 퍼블리싱 및 QA 대응을 통해 실무 완성도 강화"
            ]
        },
        {
            icon: faGraduationCap,
            term: "2020.04 ~ 2020.09",
            title: "멀티미디어앱&웹콘텐츠제작과정 수료",
            details: [
                "HTML5, CSS3, JavaScript, jQuery 기반 반응형 처리 및 크로스 브라우징",
                "Photoshop, Illustrator 기반 와이어프레임 프로토타입 제작"
            ]
        }
    ];

    return(
        <section className={styles.aboutSection} id={'about'}>
            <div className={`inner ${styles.aboutContainer}`}>
                <div className={styles.introduceWrap}>
                    <ScrollFadeIn y={-30} className={styles.imageWrap}>
                        <div className={styles.imageWrap__group}>
                            <div className={styles.imageBox}>
                                <img src={profile} alt="프로필 이미지"/>
                            </div>
                            <div className={styles.contactInfo}>
                                <ul>
                                    <li>
                                        <a href="https://mail.naver.com/write/popup?srvid=note&to=dmswid0@naver.com"
                                           target="_blank">
                                            <span>Email</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/eun-su-jeong" target="_blank">
                                            <span>Github</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={"#contact"}>
                                            <span>Contact</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.icon}>
                            <img src={star} alt="star"/>
                        </div>
                    </ScrollFadeIn>
                    <div className={styles.textWrap}>
                        <ScrollFadeIn y={-30}>
                            <h2>About Me</h2>
                        </ScrollFadeIn>
                        <ScrollFadeIn y={-30}>
                            <div className={styles.introduce}>
                                <h2>"쓰임이 좋은 UI를 고민하는 웹 개발자 은수정 입니다"</h2>

                                <p>퍼블리셔로 커리어를 시작해 실무에서 웹 표준과 접근성을 지키며 마크업 작업을 담당해 왔습니다.<br/>
                                    무엇보다 <strong>사용자에게 닿는 화면</strong>에 대해 고민해 왔고 지금도 그 기준으로 작업하고 있어요.</p>

                                <p>더 나은 사용자의 경험을 만들고 싶어 React를 공부하기 시작했고
                                    상태 관리, 성능 최적화까지 하나씩 익히며 프론트엔드 개발자로 영역을 넓혀가고 있습니다.</p>

                                <p>요즘은 기획부터 UI 흐름 설계, 마크업, 컴포넌트 구조화까지 직접 참여하면서<br/>
                                    <strong>보기 좋은 화면과 쓰기 편한 경험</strong>, 두 가지 모두를 놓치지 않고 구현하기 위해 노력하고 있습니다.</p>

                                <p>사람들과 어울려 일하는 걸 좋아하고 함께 일할 때 편하고 믿을 수 있는 동료가 되고 싶습니다.<br/>
                                    좋은 결과물은 <strong>좋은 협업</strong>에서 나온다고 믿기 때문에,
                                    사용자뿐 아니라 팀원 모두가 만족할 수 있는 결과를 함께 만들어가는 것을 중요하게 생각합니다.</p>

                                {/*<p>퍼블리셔로 커리어로 실무에서 웹 표준과 접근성을 준수한 마크업을 담당하며 <br/>*/}
                                {/*    사용자에게 닿는 화면을 고민해 왔습니다.</p>*/}

                                {/*<p>사용자의 경험을 높이기 위해 React, 상태관리, 성능 최적화에 대한 학습을 시작했고<br/>*/}
                                {/*    현재는 기획부터 UI 흐름 설계, 마크업, 컴포넌트 구조화까지 직접 다뤄보며</p>*/}

                                {/*<p><strong>‘보기 좋은 화면’</strong>과 <strong>‘쓰임이 좋은 UI’</strong>를 만드는 것을 목표로 하고 있습니다.</p>*/}
                            </div>
                            <ul className={styles.keywords}>
                            {keywords.map((word, i) => (
                                <li key={i} className={styles.keyword}>#{word}</li>
                            ))}
                            </ul>
                        </ScrollFadeIn>
                    </div>
                </div>
                <div className={styles.experienceWrap}>
                    <ScrollFadeIn y={30}>
                        <h2>experience</h2>
                    </ScrollFadeIn>
                    <div className={styles.experienceWrap__list}>
                        <ul>
                            {experienceList.map((item, index) => (
                                <ScrollFadeIn key={index} delay={index * 0.2} y={30}>
                                    <li>
                                        <div className={styles.dateWrap}>
                                            <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                                            <span className={styles.term}>{item.term}</span>
                                        </div>
                                        <div className={styles.info}>
                                            <p className={styles.content}>
                                               <span>{item.content}</span>
                                                {item.description && (
                                                    <span className={styles.description}>{item.description}</span>
                                                )}
                                            </p>
                                            <ul className={styles.detailList}>
                                                {item.details.map((detail, i) => (
                                                    <li key={i} className={styles.detailItem}>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ScrollFadeIn>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AboutSection;