import styles from './About.module.scss';
import profile from '../../assets/images/profile.webp';
const AboutSection = () => {
    const keywords = [
        "세심한 UI설계", "소통의 다리", "사용자경험중심"
    ];

    const experiences = [
        "퍼블리셔 2년 / 금융권 프로젝트 4건 참여",
        "웹 접근성 마크 획득 / 자사 홈페이지 리뉴얼 기획 및 마크업",
        "React 기반 사이드 프로젝트 UI 설계 및 구현"
    ];
    return(
        <section className={styles.aboutSection}>
            <div className={`inner ${styles.aboutContainer}`}>
                <div className={styles.profileWrap}>
                    <div className={styles.imageWrap}>
                        <h2>About Me</h2>
                        <img src={profile} alt="프로필 이미지"/>
                    </div>
                    <div className={styles.textWrap}>
                        <div className={styles.introduce}>
                            <h2>쓰임이 좋은 UI를 고민하는 웹 개발자</h2>
                            <p>퍼블리셔를 커리어로 실무에서 웹 표준과 접근성을 준수한 마크업을 담당하며 <br/>
                                사용자에게 닿는 화면을 고민해 왔습니다.</p>

                            <p>사용자의 경험을 높이기 위해 React, 상태관리, 성능 최적화에 대한 학습을 시작했고<br/>
                                현재는 기획부터 UI 흐름 설계, 마크업, 컴포넌트 구조화까지 직접 다뤄보며</p>

                            <p>‘잘 보이는 화면’보다 ‘쓰임이 좋은 UI’를 만드는 것을 목표로 하고 있습니다.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.profile}>
                    {/*<h2>Profile</h2>*/}
                    <ul className="profile-list">
                        <li><span className="tit">Name</span><span>은수정</span></li>
                        <li><span className="tit">Phone</span><span>010-6765-7015</span></li>
                        <li><span className="tit">Email</span><span>dmswid0@naver.com</span></li>
                        <li><span className="tit">Github</span><span>github.com/eun-su-jeong</span></li>
                    </ul>
                </div>
                {/* 키워드 배지 */}
                <ul className={styles.keywords}>
                    {keywords.map((word, i) => (
                        <li key={i} className={styles.keyword}>#{word}</li>
                    ))}
                </ul>

                {/* 경력 요약 리스트 */}
                <ul className={styles.experienceList}>
                    {experiences.map((exp, i) => (
                        <li key={i} className={styles.experienceItem}>📍 {exp}</li>
                    ))}
                </ul>
                <div className="profile-info">
                    <h4>Career</h4>
                    <ul className="Career-list">
                        <li><span className="tit">21.06 ~ 23.07</span><span>(주)피노유엑스디 (UI개발사업부/UI개발팀)</span></li>
                    </ul>
                </div>
                <div className="profile-info">
                    <h4>Education</h4>
                    <ul className="education-list">
                        <li><span className="tit">23.10 ~ 24.05</span><span>ELK 빅데이터 분석 및 시각화 개발자 양성과정 수료</span></li>
                        <li><span className="tit">23.09 ~ 23.12</span><span>리액트 프론트엔드 개발 실무과정 수료</span></li>
                        <li><span className="tit">23.09 ~ 23.12</span><span>프론트엔드 개발을 위한 자바스크립트 객체지향(ES6)과정 수료</span>
                        </li>
                        <li><span className="tit">21.06 ~ 23.07</span><span>멀티미디어앱&웹콘텐츠제작과정 수료</span></li>
                    </ul>
                </div>

            </div>

        </section>
    )
}
export default AboutSection;