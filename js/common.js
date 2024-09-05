/* header scroll */
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > lastScrollY) {
        // 스크롤을 내릴 때
        header.style.top = '-60px';
        header.style.transform = 'translateY(-60px)';
    } else {
        // 스크롤을 올릴 때
        header.style.top = '0';
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

/* hero page load */
document.addEventListener("DOMContentLoaded", function() {
   const heroImage = document.querySelector('img.cont');
   const mainTitle = document.querySelector('.tit.cont');
   const subTitle = document.querySelector('.sub-tit.cont');

    setTimeout(() => {
        heroImage.classList.add('page-loaded');
    }, 500);

    setTimeout(() => {
        mainTitle.classList.add('page-loaded');
    }, 1000);

    setTimeout(() => {
        subTitle.classList.add('page-loaded');
    }, 1500);
});

/* hero fade out */
document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.querySelector('.hero');
    const windowHeight = window.innerHeight;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        let opacity = 1 - (scrollPosition / (windowHeight * 0.8));
        if (opacity < 0) opacity = 0;

        heroSection.style.opacity = opacity;
    });
});

/* mouse effect */
document.addEventListener('DOMContentLoaded', function () {
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
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.textContent = ''; // 텍스트 제거
        }
        // .fill-up
        else if (target.matches('.fill-up')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
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
});

/* noise 효과 */
document.addEventListener('DOMContentLoaded', function () {
    function createNoiseEffect(isForHeader = false) {
        const noiseEffect = document.createElement('div');
        noiseEffect.classList.add('noise');

        // noise header or body
        noiseEffect.style.position =isForHeader? 'absolute' : 'fixed';;
        noiseEffect.style.zIndex = isForHeader? '1000' : '-1';
        return noiseEffect;
    }

    // body에 noise 효과 추가
    const bodyNoiseEffect = createNoiseEffect(false); // 기본값이 false, body용 noise 효과 생성
    document.body.appendChild(bodyNoiseEffect);

    // header에 noise 효과 추가
    const header = document.querySelector('header');
    if (header) {
        const headerNoiseEffect = createNoiseEffect(true); // header용 noise 효과 생성
        header.appendChild(headerNoiseEffect); // header 내부에 noise 효과 추가
    }
});

/*top 버튼*/
document.addEventListener('DOMContentLoaded', function () {
    // Top 버튼 생성
    const topButton = document.createElement('button');
    topButton.textContent = 'Top'; // 버튼 텍스트
    topButton.classList.add('top-button');

    // 버튼을 body에 추가
    document.body.appendChild(topButton);

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // 스크롤이 300px 이상일 때 버튼 표시
            topButton.style.opacity = '1';
        } else {
            topButton.style.opacity = '0';
        }
    });

    // 버튼 클릭 시 페이지 상단으로 부드럽게 이동
    topButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

/* scroll animation & lazy loading & IntersectionObserver selected project */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 이벤트 발생');

    // 요소 초기화
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
                const projectHTML = `
                    <div class="project-item contents" data-project="${project.id}">
                        <a href="${project.link}" class="project-link">
                            <div class="thumbnail">
                                <figure>
                                    <img data-src="${project.image}" alt="${project.alt}">
                                </figure>
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
            loadProjectContent(projectList[0]); // 첫 번째 항목의 콘텐츠 로드
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
});

/* scroll animation & lazy loading & IntersectionObserver */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 이벤트 발생 (common.js)');

    // IntersectionObserver 옵션 설정
    const scrollObserverOptions = { threshold: 0.1 };
    const lazyObserverOptions = { threshold: 0.01 };

    // IntersectionObserver 생성
    const scrollObserver = new IntersectionObserver(handleScrollAnimation, scrollObserverOptions);
    const lazyImageObserver = new IntersectionObserver(handleLazyLoading, lazyObserverOptions);

    // 옵저버 초기화
    document.querySelectorAll('.contents').forEach(el => scrollObserver.observe(el));
    document.querySelectorAll("img[data-src]").forEach(img => lazyImageObserver.observe(img));

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
});

/*background color change*/
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', () => {
        let isInProjectSection = false;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (inView && (section.classList.contains('projectAll') || section.classList.contains('project'))) {
                isInProjectSection = true;
            }
        });

        if (isInProjectSection) {
            document.body.style.backgroundColor = '#fff';
            header.style.backgroundColor = '#fff';
        } else {
            document.body.style.backgroundColor = '';
            header.style.backgroundColor = '';
        }
    });
});

/* background scroll parallax */
document.addEventListener('DOMContentLoaded', () => {
    const parallaxSection = document.querySelector('main'); // 'main' 요소 선택
    const parallaxText = document.createElement('div');
    parallaxText.classList.add('parallax-text');
    parallaxText.textContent = "project";

    parallaxSection.appendChild(parallaxText);

    // 초기 스타일 설정
    parallaxText.style.opacity = '0';
    parallaxText.style.transition = 'opacity 0.5s ease-out';

    const projectSection = document.querySelector('.project');

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY; // 현재 스크롤 위치
        const parallaxSpeed = 0.7; // 패럴랙스 속도
        const projectRect = projectSection.getBoundingClientRect();

        // .project가 화면에서 벗어나지 않을 때까지 텍스트를 보이도록 설정
        const projectStillVisible = projectRect.bottom > window.innerHeight * 0.1;

        parallaxText.style.opacity = projectStillVisible ? '1' : '0'; // 조건에 따라 투명도 설정

        const offset = scrollPosition * parallaxSpeed; // 스크롤에 따른 offset 계산
        parallaxText.style.transform = `translate(-50%, calc(0% + ${offset}px))`;
    });
});























