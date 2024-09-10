/* intro page load & hero page load*/
document.addEventListener('DOMContentLoaded', function () {
    const introSplash = document.getElementById('introSplash');
    const heroImage = document.querySelector('img.cont');
    const mainTitle = document.querySelector('.tit.cont');
    const subTitle = document.querySelector('.sub-tit.cont');

    // 인트로 화면 보이기
    introSplash.classList.add('show');

    // 3초 후에 인트로 화면을 위로 슬라이드하며 숨기기
    setTimeout(() => {
        introSplash.classList.remove('show');
        introSplash.classList.add('hide'); // 위로 슬라이드하며 숨기기

        // 인트로가 사라진 후 hero page load 스크립트 실행
        setTimeout(() => {
            loadHeroPage(); // Hero 페이지 로드 함수 호출
        }, 500); // 인트로 숨기기 애니메이션이 끝난 후 실행
    }, 3000); // 3초 동안 인트로 화면 표시

    // Hero 페이지 로드 함수
    function loadHeroPage() {
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

/* background scroll parallax 1 */
/*document.addEventListener('DOMContentLoaded', () => {
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
        parallaxText.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    });
});*/

/* background scroll parallax 2 */
document.addEventListener('DOMContentLoaded', () => {
    const parallaxSection = document.querySelector('main');
    const parallaxText = document.createElement('div');
    parallaxText.classList.add('parallax-text');
    parallaxText.textContent = "project";

    parallaxSection.appendChild(parallaxText);

    // 초기 스타일 설정
    parallaxText.style.opacity = '0';
    parallaxText.style.transition = 'transform 2s ease-out, opacity 0.5s ease-out';

    const projectSection = document.querySelector('.project');
    const parallaxSpeed = 0.7; // 패럴랙스 속도
    let isScrolling; // 스크롤 상태 확인용 변수

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling); // 이전 타임아웃 지우기

        const scrollPosition = window.scrollY; // 현재 스크롤 위치
        const projectRect = projectSection.getBoundingClientRect();

        // .project 섹션이 화면에 나타날 때 텍스트를 보이도록 설정
        const projectEnterVisible = projectRect.top < window.innerHeight && projectRect.bottom > 0;

        parallaxText.style.opacity = projectEnterVisible ? '1' : '0'; // 조건에 따라 투명도 설정

        const offset = scrollPosition * parallaxSpeed; // 스크롤에 따른 offset 계산
        parallaxText.style.transform = `translate(-50%, calc(0% + ${offset}px))`;

        // 스크롤이 멈춘 후에 추가적인 이동 효과를 적용하기 위해 setTimeout 사용
        isScrolling = setTimeout(() => {
            // 스크롤 멈춘 후 0.5초 동안 텍스트가 부드럽게 이동
            parallaxText.style.transform = `translate(-50%, calc(-50% + ${(scrollPosition + 50) * parallaxSpeed}px))`;
        }, 100);
    });
});

















































































