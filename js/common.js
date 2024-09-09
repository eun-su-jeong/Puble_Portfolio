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

/* page transition */
document.addEventListener('DOMContentLoaded', function () {
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

    function getAbsoluteUrl(url) {
        const link = document.createElement('a');
        link.href = url;
        return link.href;
    }
    // 페이지 슬라이딩 처리
    function handlePageTransition(targetUrl) {
        console.log('슬라이드 아웃 적용 시도');
        main.classList.add('slide-out');

        // 페이지 이동 전 스크롤을 맨 위로 설정
        window.scrollTo(0, 0);

        setTimeout(() => {
            const absoluteUrl = getAbsoluteUrl(targetUrl);
            console.log('페이지 전환 중...');
            history.pushState('', '', absoluteUrl);// 히스토리 상태 추가
            window.location.href = absoluteUrl; // 실제 페이지 이동
        }, 300);
    }

    // 이벤트 위임을 통해 모든 링크에 대해 이벤트 리스너 추가
    document.body.addEventListener('click', function (event) {
        const target = event.target.closest('.project-link'); // 클릭된 요소가 .project-link인지 확인
        if (target) {
            event.preventDefault();
            const targetUrl = target.getAttribute('href');
            console.log('클릭 감지:', targetUrl);

            // 페이지 슬라이딩 처리
            handlePageTransition(targetUrl);
        }
    });

    window.addEventListener('popstate', function (event) {
        console.log('뒤로 가기 감지됨');

        // popstate 발생 시 slide-out 클래스 제거
        main.classList.remove('slide-out'); // 메인 화면으로 돌아올 때 슬라이딩 초기화

        // 페이지가 정상적으로 표시되도록 리로드
        if (event.state && event.state.page) {
            window.location.href = event.state.page;
        } else {
            window.location.href = initialUrl;
        }

        window.scrollTo(0,0);
    });
    // 페이지 로드 시에도 slide-out 클래스를 제거하여 초기화
    window.addEventListener('load', function() {
        main.classList.remove('slide-out');
    });
});






















