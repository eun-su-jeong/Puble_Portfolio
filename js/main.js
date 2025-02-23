document.addEventListener('DOMContentLoaded', () => {
    introPageLoad();
    noiseEffect();
    headerEffect();

    mouseEffect();
    topButton();
    projectAnimation();
    pageTransition();
    // backgroundScroll();
    skillSwiper();
    setTimeout(() => {
        scrollEffect();
    }, 100);
});

/* intro page load & hero page load*/
const introPageLoad = () => {
    const introSplash = document.getElementById('introSplash');
    const heroImage = document.querySelector('video.cont');
    const mainTitle = document.querySelector('.tit.cont');
    const subTitle = document.querySelector('.sub-tit.cont');

    introSplash.classList.add('show');

    setTimeout(() => {
        introSplash.classList.remove('show');
        introSplash.classList.add('hide');

        // 인트로가 사라진 후 hero page load 스크립트 실행
        setTimeout(() => {
            loadHeroPage();
        }, 500);
    }, 3000);

    // Hero 페이지 로드 함수
    const loadHeroPage = () => {
        setTimeout(() => {
            heroImage.classList.add('page-loaded');
        }, 500);

        setTimeout(() => {
            mainTitle.classList.add('page-loaded');
        }, 1000);

        setTimeout(() => {
            subTitle.classList.add('page-loaded');
        }, 1500);
    }
}

/* noise 효과 */
const noiseEffect = () => {
    function createNoiseEffect(isForHeader = false) {
        const noiseEffect = document.createElement('div');
        noiseEffect.classList.add('noise');

        // noise header or body
        noiseEffect.style.position =isForHeader? 'absolute' : 'fixed';
        noiseEffect.style.zIndex = isForHeader? '1000' : '-1';
        return noiseEffect;
    }

    // body에 noise 효과 추가
    const bodyNoiseEffect = createNoiseEffect(false);
    document.body.appendChild(bodyNoiseEffect);

    // header에 noise 효과 추가
    const header = document.querySelector('header');
    if (header) {
        const headerNoiseEffect = createNoiseEffect(true);
        header.appendChild(headerNoiseEffect);
    }

}

/* header scroll */
const headerEffect = () => {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > lastScrollY) {
            header.style.top = '-60px';
            header.style.transform = 'translateY(-60px)';
        } else {
            header.style.top = '0';
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

/* scrollEffect */
const scrollEffect = () => {
    // title
    const subText = document.querySelector('.sub-tit');
    const iamText = document.querySelector('.iam');
    const readyText = document.querySelector('.ready');

    // about
    const titleWrap = document.querySelector('.about .title-wrap');
    const titleName = document.querySelector('.about .title-wrap .title-name');
    const aboutText = document.querySelectorAll('.profile-text p');
    const profileImg = document.querySelector('.profile-img');
    const profileInfo = document.querySelector('.profile-info-wrap');

    // background & color
    const body = document.body;
    const header = document.querySelector('header');
    const headerNav = document.querySelectorAll('header > nav > ul > li > a');
    const skillSection = document.querySelector('.skills');
    const projects = document.querySelector('.projects');
    const projectAllSection = document.querySelector('.projectAll');
    const projectSection = document.querySelector('.project');
    const contactSection = document.querySelector('.contact');

    // project
    const projectTitle = document.querySelector('.projects-title');

    // scroll location
    const scrollStart = window.innerHeight * 0.1;
    const scrollMiddle = window.innerHeight * 0.4;
    const scrollExpand = window.innerHeight * 0.7;
    const scrollEnd = window.innerHeight;
    const releasePoint = window.innerHeight * 1.2;
    const restorePoint = window.innerHeight * 2;

    // boolean
    let isFixed = false;
    let isTitleFixed = false;
    let isSkillVisible = false;
    let isProjectVisible = false;
    let isProjectAllVisible = false;

    // `Intersection Observer`로 Skill 섹션 감지
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.target === skillSection){
                    isSkillVisible = entry.isIntersecting;
                }else if(entry.target === projectSection){
                    isProjectVisible = entry.isIntersecting;
                }else if(entry.target === projectAllSection){
                    isProjectAllVisible = entry.isIntersecting;
                }
            });

            if(isProjectVisible){
                body.style.backgroundColor = "#fff";
                header.style.backgroundColor = "#fff";
            }else if (isSkillVisible) {
                body.style.backgroundColor = "#F6E8CA";
                header.style.backgroundColor = "#F6E8CA";

            }else {
                body.style.backgroundColor = "#F9F5EF";
                header.style.backgroundColor = "#F9F5EF";
            }
        },
        { threshold: 0.5 }
    );

    if (skillSection) observer.observe(skillSection);
    if (projectSection) observer.observe(projectSection);
    if (projectAllSection) observer.observe(projectAllSection);

    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectTitle.classList.add('active');
                projectTitle.style.position = "fixed";
                projectTitle.style.top = "20vh";
                projectTitle.style.left = "50%";
                projectTitle.style.transform = "translateX(-50%)";
                projectTitle.style.width = "100%";
                projectTitle.style.height = "auto";
                projectTitle.style.opacity = "1";

                document.querySelectorAll('.projects-title p').forEach(p => {
                    p.classList.add('active');
                    p.style.transition = 'transform 0.3s ease-out, opacity 0.8s ease-out ,color 1s 1s ease-out';
                });
            }else {
                projectTitle.classList.remove('active');
                document.querySelectorAll('.projects-title p').forEach(p => {
                    p.classList.remove('active');
                    p.style.transition = 'transform 0.3s ease-out, opacity 0.8s ease-out';
                });
            }
        });
    }, { threshold: 0.05 , rootMargin: "-5% 0px -5% 0px"});

    let lastScrollY = window.scrollY; // 🔥 이전 스크롤 위치 저장

    const projectEndObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            let currentScrollY = window.scrollY;

            if (entry.isIntersecting) {
                projectTitle.style.opacity = "0";
                projectTitle.style.pointerEvents = "none";

            } else {
                projectTitle.style.opacity = "1";
                projectTitle.style.pointerEvents = "auto";
            }
        });
    }, { threshold: 0.1 });

    window.addEventListener("scroll", () => {
        let currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            console.log("🔝 스크롤이 맨 위에 도달 → 색상 `#222`로 변경");
            projectTitle.style.transition = "color 0.8s ease-in-out";
            projectTitle.style.color = "#222";
        }

        lastScrollY = currentScrollY;
    });

    if (projects) projectsObserver.observe(projects);
    if (contactSection) projectEndObserver.observe(contactSection);


    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        if (isProjectAllVisible || isProjectVisible) {
            body.style.backgroundColor = "#fff";
            header.style.backgroundColor = "#fff";
            console.log("🔥 프로젝트 섹션 → 빨간색 유지됨!");
            return;
        }

        if (isSkillVisible) {
            body.style.backgroundColor = "#F6E8CA";
            header.style.backgroundColor = "#F6E8CA";
            return;
        }

        body.style.backgroundColor = "#F9F5EF";
        header.style.backgroundColor = "#F9F5EF";

        let moveProgress = Math.min((currentScroll - scrollStart) / (scrollMiddle - scrollStart), 1);
        moveProgress = Math.max(moveProgress, 0);

        let fadeProgress = Math.min((currentScroll - scrollMiddle) / (scrollEnd - scrollMiddle), 1);
        fadeProgress = Math.max(fadeProgress, 0);

        let scaleProgress = Math.min((currentScroll - scrollExpand) / (scrollEnd - scrollExpand), 1);
        scaleProgress = Math.max(scaleProgress, 0);

        let disappearProgress = Math.min((currentScroll - scrollEnd) / (releasePoint - scrollEnd), 1);
        disappearProgress = Math.max(disappearProgress, 0);

        // 중앙으로 이동하는 애니메이션
        let translateX = -35 * moveProgress;
        let translateY = 30 * moveProgress;
        subText.style.transform = `translate(${translateX}vw, ${translateY}vh)`;

        // 중앙 도착 후 화면 고정
        if (currentScroll >= scrollMiddle && !isFixed) {
            subText.style.position = "fixed";
            subText.style.top = "0";
            subText.style.left = "0";
            subText.style.width = "100%";
            subText.style.height = "100vh";
            isFixed = true;
        }

        // 스크롤을 올리면 `fixed` 해제 → 원래 자리로 돌아감
        if (currentScroll < scrollMiddle && isFixed) {
            subText.style.position = "relative";
            subText.style.top = "initial";
            subText.style.left = "initial";
            isFixed = false;
        }

        // "I AM"은 중앙 도착 후 서서히 사라짐
        if (currentScroll >= scrollMiddle) {
            iamText.style.opacity = 1 - fadeProgress;

        } else {
            iamText.style.opacity = 1;

        }

        // "READY" 글자 점점 커짐
        let scaleValue = 1 + scaleProgress * 8;
        readyText.style.transform = `scale(${scaleValue})`;


        // "READY" 글자, body색상 변경
        if (!isSkillVisible) {

            if (currentScroll >= scrollMiddle) {
                readyText.style.color = '#F9F5EF';
                body.style.backgroundColor ='#000';
                header.style.backgroundColor ='#000';
                // 모든 네비게이션 링크 색상 변경
                headerNav.forEach(nav => {
                    nav.style.color = '#F9F5EF';
                });
                aboutText.forEach(text =>{
                    text.style.color = '#fff';
                });
                profileInfo.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                titleName.style.color = '#fff';

            } else {
                readyText.style.color = '#222';
                body.style.backgroundColor ='#F9F5EF';
                header.style.backgroundColor ='#F9F5EF';
                headerNav.forEach(nav => {
                    nav.style.color = '#222';
                });
                titleName.style.color = '#222';
            }
        }

        // `READY`가 완전히 커진 후 서서히 사라짐
        if (currentScroll >= scrollEnd) {
            readyText.style.opacity = 1 - disappearProgress;
            titleWrap.style.position = "fixed";
            titleWrap.classList.add('active');
            isTitleFixed = true;

        } else {
            readyText.style.opacity = 1;
            titleWrap.classList.remove('active');
            isTitleFixed = false;

        }

        if(iamText.style.opacity == "0" && readyText.style.opacity == "0"){
            subText.style.display = 'none';
        }else{
            subText.style.display = 'block';
        }

        // profile-img
        let profileImgRect = profileImg.getBoundingClientRect();

        // profile-img가 title-wrap과 닿으면 fixed 해제
        let titleWrapRect = titleWrap.getBoundingClientRect();
        if (profileImgRect.top <= titleWrapRect.bottom) {
            titleWrap.style.position = "relative";
            titleWrap.style.left = "33vw";
            isTitleFixed = false;
        }else {
            titleWrap.style.left = "35vw";
        }


        // `about` 섹션이 끝나면 원래대로 복구
        if (currentScroll >= restorePoint && !isSkillVisible) {
            readyText.style.color = '#222';
            body.style.backgroundColor = '#F9F5EF';
            header.style.backgroundColor = '#F9F5EF';
            headerNav.forEach(nav => {
                nav.style.color = '#222';
            });
            aboutText.forEach(text => {
                text.style.color = '#222';
            });
            profileInfo.style.borderColor = 'rgba(34, 34, 34, 0.5)';
        }
    });
}

/* swiper */
const skillSwiper = () =>{
    new Swiper('.swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: false,
        freeMode: true,
        mousewheel: {
            enabled: true,
            sensitivity: 1,
            releaseOnEdges: true
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        }
    });
}

/* mouse effect */
const mouseEffect = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // 마우스 이동 이벤트
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`; // 마우스 X 좌표로 이동
        cursor.style.top = `${e.pageY}px`;  // 마우스 Y 좌표로 이동
    });

    // 이벤트 위임 처리
    document.body.addEventListener('mouseenter', (event) => {
        const target = event.target;

        // li
        if (target.matches('li')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(3)';
            cursor.textContent = ''; // 텍스트 제거
        }
        // .fill-up
        else if (target.matches('.fill-up')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(3)';
            cursor.textContent = ''; // 텍스트 제거
        }
        // .project-link
        else if (target.matches('.project-link')) {
            cursor.style.transition = 'transform 0.1s ease'; // 클릭 시 부드러운 전환
            cursor.style.transform = 'translate(-50%, -50%) scale(5)';
            cursor.textContent = 'View More';
            cursor.classList.add('active');
        }
    },true);

    document.body.addEventListener('mouseleave', (event) => {
        const target = event.target;

        if (target.matches('li') || target.matches('.fill-up') || target.matches('.project-link')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.textContent = '';
            cursor.classList.remove('active');
        }
    },true);

    // 마우스 클릭 시 커서 효과
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    });

    // 마우스 클릭 해제 시 커서 효과 복원
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/*top 버튼*/
const topButton = () => {
    const topButton = document.createElement('button');
    topButton.textContent = 'Top';
    topButton.classList.add('top-button');

    document.body.appendChild(topButton);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            topButton.style.opacity = '1';
        } else {
            topButton.style.opacity = '0';
        }
    });

    topButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* scroll animation & lazy loading & IntersectionObserver selected project */
const projectAnimation = () => {
    const projectListContainer = document.querySelector('.project-list');
    const selectedProjectContainer = document.getElementById('selected-project');
    const projectLink = document.getElementById('project-link');
    const viewFigure = selectedProjectContainer.querySelector('.thumbnail .view');
    const descTitle = selectedProjectContainer.querySelector('.desc strong');
    const descText = selectedProjectContainer.querySelector('.desc span');
    const titleNameElements = document.querySelectorAll('.title-name');

    // IntersectionObserver 옵션 설정
    const scrollObserverOptions = { threshold: 0.1 };
    const lazyObserverOptions = { threshold: 0.01 };

    // IntersectionObserver 생성
    const scrollObserver = new IntersectionObserver(handleScrollAnimation, scrollObserverOptions);
    const lazyImageObserver = new IntersectionObserver(handleLazyLoading, lazyObserverOptions);

    // JSON 데이터 비동기로 로드
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            if (!projectListContainer) {
                console.error('프로젝트 리스트 컨테이너를 찾을 수 없습니다.');
                return;
            }

            // 프로젝트 항목 생성 및 삽입
            data.forEach(project => {
                const technologies = project.overlay.stack.split(','); // 쉼표(,)를 기준으로 기술을 나눔

                // 각 기술을 뱃지로 감싸는 HTML 생성
                const techBadges = technologies.map(tech => `<span class="tech-badge">${tech.trim()}</span>`).join('');

                const projectHTML = `
        <div class="project-item contents" data-project="${project.id}">
            <a href="${project.link}" class="project-link">
                <div class="thumbnail">
                    <figure>
                        <img data-src="${project.image}" alt="${project.alt}">
                    </figure>
                    <div class="hover-info">
                        <p>${project.overlay.content}</p>
                        <div class="tech-stack">${techBadges}</div>
                    </div>
                </div>
                <div class="desc">
                    <strong>${project.title}</strong>
                    <span>${project.period}</span>
                </div>
            </a>
        </div>
    `;
                projectListContainer.insertAdjacentHTML('beforeend', projectHTML);
            });

            // 프로젝트 리스트 초기화 및 이벤트 설정
            initializeProjectList();
        })
        .catch(error => console.error('JSON 데이터를 불러오는 중 오류 발생:', error));

    // 프로젝트 리스트 초기화 및 이벤트 등록 함수
    function initializeProjectList() {
        const projectList = document.querySelectorAll('.proj-list ul li');

        // 첫 번째 프로젝트로 초기값 설정
        if (projectList.length > 0) {
            projectList[0].classList.add('active');
            loadProjectContent(projectList[0]);
        }

        // 프로젝트 리스트 클릭 이벤트 설정
        projectList.forEach(item => {
            item.addEventListener('click', () => {
                projectList.forEach(item => item.classList.remove('active'));
                item.classList.add('active');
                loadProjectContent(item); // 클릭한 항목의 콘텐츠 로드
            });
        });

        // 옵저버 초기화
        document.querySelectorAll('.contents').forEach(el => scrollObserver.observe(el));
        document.querySelectorAll("img[data-src]").forEach(img => lazyImageObserver.observe(img));
        titleNameElements.forEach(title => {
            splitText(title, 0.05, 'span');
            scrollObserver.observe(title);
        });
    }

    // 선택한 프로젝트의 콘텐츠를 로드하는 함수
    function loadProjectContent(selectedItem) {
        const projectId = selectedItem.getAttribute('data-project');
        const selectedContent = document.querySelector(`.project-item[data-project="${projectId}"]`);

        if (selectedContent) {
            const img = selectedContent.querySelector('.thumbnail img');
            const video = selectedContent.querySelector('.thumbnail video');
            const title = selectedContent.querySelector('.desc strong').textContent;
            const description = selectedContent.querySelector('.desc span').textContent;
            const link = selectedContent.querySelector('.project-link').href;

            viewFigure.style.opacity = '0';

            setTimeout(() => {
                viewFigure.innerHTML = ''; // 기존 콘텐츠 삭제
                if (video) viewFigure.appendChild(video.cloneNode(true));
                else if (img) viewFigure.appendChild(img.cloneNode(true));

                descTitle.textContent = title;
                descText.textContent = description;
                projectLink.href = link;

                setTimeout(() => {
                    viewFigure.style.opacity = '1';
                }, 50);
            }, 300);
        } else {
            console.error(`프로젝트 ID ${projectId}에 대한 콘텐츠를 찾을 수 없습니다.`);
        }
    }

    // 스크롤 애니메이션 처리 함수
    function handleScrollAnimation(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');

                if (entry.target.classList.contains('title-name')) {
                    entry.target.querySelectorAll('span').forEach((span, index) => {
                        span.style.transitionDelay = `${index * 0.05}s`;
                        span.classList.add('loaded');
                    });
                }

                entry.target.querySelectorAll("img[data-src]").forEach(img => {
                    img.src = img.dataset.src;
                    lazyImageObserver.unobserve(img);
                });

                entry.target.querySelectorAll("video.cont").forEach(video => {
                    video.classList.add('page-loaded');
                });

                observer.unobserve(entry.target);
            }
        });
    }

    // Lazy Loading 처리 함수
    function handleLazyLoading(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.add("loaded");
                observer.unobserve(lazyImage);
            }
        });
    }

    // 텍스트를 분할하여 애니메이션을 적용하는 함수
    function splitText(element, interval, tagName = 'span') {
        const text = element.textContent;
        element.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement(tagName);
            span.textContent = char;
            span.style.transitionDelay = `${index * interval}s`;
            element.appendChild(span);
        });
    }
}

/* page transition */
const pageTransition = () => {
    const main = document.querySelector('main');

    if (!main) {
        console.error('main 요소를 찾을 수 없습니다.');
        return;
    } else {
        console.log('main 요소 발견:', main);
    }

    // 초기 url를 변경하지 않고 상태 저장
    const initialUrl = window.location.href;
    history.replaceState({page: initialUrl}, '', initialUrl);

    // url을 절대 경로로 변환하는 함수
    function getAbsoluteUrl(url) {
        if(url.startsWith('#')){
            return url;
        }
        const link = document.createElement('a');
        link.href = url;
        return link.href;
    }
    // 페이지 슬라이딩 처리
    function handlePageTransition(targetUrl) {
        console.log('슬라이드 아웃 적용 시도');
        main.classList.add('slide-out');

        setTimeout(() => {
            const absoluteUrl = getAbsoluteUrl(targetUrl);
            console.log('페이지 전환 중...', absoluteUrl);
            history.pushState({page: absoluteUrl}, '', absoluteUrl);// 히스토리 상태 추가
            window.location.href = absoluteUrl; // 실제 페이지 이동
        }, 300);
    }

    // 이벤트 위임을 통해 모든 링크에 대해 이벤트 리스너 추가
    document.body.addEventListener('click', function (event) {
        const target = event.target.closest('a');

        if (target) {
            const targetUrl = target.getAttribute('href');

            if(targetUrl && targetUrl.startsWith('#')){
                console.log('내부 섹션으로 이동:', targetUrl);
                event.preventDefault();

                document.querySelector(targetUrl).scrollIntoView({behavior:'smooth'});
                return;
            }

            if(target.classList.contains('project-link')){
                event.preventDefault();
                console.log('클릭감지 , targetUrl');

                // 페이지 슬라이딩 처리
                handlePageTransition(targetUrl);
            }

        }

    });

    window.addEventListener('popstate', function (event) {
        console.log('뒤로 가기 감지됨');

        // popstate 발생 시 slide-out 클래스 제거
        main.classList.remove('slide-out'); // 메인 화면으로 돌아올 때 슬라이딩 초기화

        // 페이지가 정상적으로 표시되도록 리로드
        if (event.state && event.state.page) {
            window.location.href = event.state.page;
        } else  {
            window.location.href = initialUrl;
        }
    });

    // 페이지 로드 시에도 slide-out 클래스를 제거하여 초기화
    window.addEventListener('load', function() {
        main.classList.remove('slide-out');
    });
}

/* background scroll parallax 2 */
// const backgroundScroll = () => {
//     const parallaxSection = document.querySelector('main');
//     const parallaxText = document.createElement('div');
//     parallaxText.classList.add('parallax-text');
//     parallaxText.textContent = "project";
//
//     parallaxSection.appendChild(parallaxText);
//
//     parallaxText.style.opacity = '0';
//     parallaxText.style.transition = 'transform 2s ease-out, opacity 0.5s ease-out';
//
//     const projectSection = document.querySelector('.project');
//     const parallaxSpeed = 0.7;
//     let isScrolling; // 스크롤 상태 확인용 변수
//
//     window.addEventListener('scroll', () => {
//         clearTimeout(isScrolling); // 이전 타임아웃 지우기
//
//         const scrollPosition = window.scrollY; // 현재 스크롤 위치
//         const projectRect = projectSection.getBoundingClientRect();
//
//         // .project 섹션이 화면에 나타날 때 텍스트를 보이도록 설정
//         const projectEnterVisible = projectRect.top < window.innerHeight && projectRect.bottom > 0;
//
//         parallaxText.style.opacity = projectEnterVisible ? '1' : '0';
//
//         const offset = scrollPosition * parallaxSpeed; // 스크롤에 따른 offset 계산
//         parallaxText.style.transform = `translate(-50%, calc(0% + ${offset}px))`;
//
//         // 스크롤이 멈춘 후에 추가적인 이동 효과를 적용하기 위해 setTimeout 사용
//         isScrolling = setTimeout(() => {
//             parallaxText.style.transform = `translate(-50%, calc(-50% + ${(scrollPosition + 50) * parallaxSpeed}px))`;
//         }, 100);
//     });
//
// }



























/* scroll animation & lazy loading & IntersectionObserver & skeleton */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 이벤트 발생 (common.js)');

    const isIndexPage = window.location.pathname.includes('index.html');

    // IntersectionObserver 옵션 설정
    const scrollObserverOptions = { threshold: 0.1 };
    const lazyObserverOptions = { threshold: 0.01 };

    // IntersectionObserver 생성
    const scrollObserver = new IntersectionObserver(handleScrollAnimation, scrollObserverOptions);
    const lazyImageObserver = new IntersectionObserver(handleLazyLoading, lazyObserverOptions);

    // 옵저버 초기화
    document.querySelectorAll('.contents').forEach(el => scrollObserver.observe(el));
    document.querySelectorAll("img[data-src]").forEach((img,index) => {

        if(!isIndexPage){
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton";

            const uniqueId = `skeleton-${index}`;
            skeleton.setAttribute('data-skeleton-id', uniqueId);
            img.setAttribute('data-skeleton-id', uniqueId);

            img.parentNode.insertBefore(skeleton, img);
        }

        lazyImageObserver.observe(img);

        if(img.complete){
            hideSkeleton(img);
        }

    });

    // 스크롤 애니메이션 처리 함수
    function handleScrollAnimation(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');

                if (entry.target.classList.contains('title-name')) {
                    entry.target.querySelectorAll('span').forEach((span, index) => {
                        span.style.transitionDelay = `${index * 0.05}s`;
                        span.classList.add('loaded');
                    });
                }

                entry.target.querySelectorAll("img[data-src]").forEach(img => {
                    img.src = img.dataset.src;
                    lazyImageObserver.unobserve(img);
                });

                entry.target.querySelectorAll("video.cont").forEach(video => {
                    video.classList.add('page-loaded');
                });

                observer.unobserve(entry.target);
            }
        });
    }



    // Lazy Loading 처리 함수
    function handleLazyLoading(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;

                // 이미지 로드 후 스켈레톤 숨기기 (딜레이 추가)
                lazyImage.onload = () => {
                    setTimeout(() => hideSkeleton(lazyImage), 100);
                };

                // 이미지가 이미 로드된 경우에도 스켈레톤 숨기기
                if (lazyImage.complete) {
                    setTimeout(() => hideSkeleton(lazyImage), 100);
                }

                observer.unobserve(lazyImage);
            }
        });
    }

    function hideSkeleton(image){
        image.classList.add("loaded");

        const skeletonId = image.getAttribute('data-skeleton-id');
        const skeleton = document.querySelector(`.skeleton[data-skeleton-id="${skeletonId}"]`);

        if(skeleton){
            skeleton.style.display = "none";
        }else{
            console.error(`Skeleton element not found for image with id: ${skeletonId}`);
        }
    }
});




/* sub header scroll effect*/
document.addEventListener('DOMContentLoaded', function () {
    const bodyNoiseEffect = document.querySelector('.noise');
    const subHeader = document.querySelector('.project-header');
    const projectMain = document.querySelector('.project-main');
    const introSection = document.querySelector('.intro');

    // 초기값 설정 함수
    function setInitialStyles() {
        if (introSection) {
            const introBottom = introSection.getBoundingClientRect().bottom;

            // 페이지 로드 시 .intro 섹션의 위치에 따라 초기 상태 설정
            if (introBottom <= 0) {
                bodyNoiseEffect.style.display = 'block';
                subHeader.style.backgroundColor = '#F9F5EF';
                projectMain.style.paddingTop = '60px';
            } else {
                bodyNoiseEffect.style.display = 'none';
                subHeader.style.backgroundColor = 'transparent';
                projectMain.style.paddingTop = '0px';
            }
        }
    }

    // 초기값 설정 실행
    setInitialStyles();

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', function () {
        setInitialStyles(); // 스크롤할 때마다 초기 스타일 업데이트
    });
});

