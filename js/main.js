// document.addEventListener('DOMContentLoaded', () => {
//     const readyText  = document.querySelector('.sub-tit');
//     let lastScrollTop = 0;
//     const scrollThreshold = 400;
//
//     window.addEventListener('scroll', () => {
//         let currentScroll = window.scrollY;
//
//         if (currentScroll > scrollThreshold) {
//             readyText.classList.add('active');
//         } else {
//             readyText.classList.remove('active');
//         }
//
//         lastScrollTop = currentScroll;
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const subText = document.querySelector('.sub-tit');
//     const iamText = document.querySelector('.iam');
//     const readyText = document.querySelector('.ready');
//     const scrollStart = 100;
//     const scrollEnd = 600;
//
//     window.addEventListener('scroll', () => {
//         let currentScroll = window.scrollY;
//
//         let progress = Math.min((currentScroll - scrollStart) / (scrollEnd - scrollStart), 1);
//         progress = Math.max(progress, 0);
//
//         let translateX = -20 * progress;
//         let translateY = 50 * progress;
//
//         subText.style.transform = `translate(${translateX}vw, ${translateY}vh)`;
//
//         iamText.style.opacity = 1 - progress;
//
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const subText = document.querySelector('.sub-tit');
    const iamText = document.querySelector('.iam');
    const readyText = document.querySelector('.ready');
    const titleWrap = document.querySelector('.about .title-wrap');
    const body = document.body;
    const header = document.querySelector('header');
    const headerNav = document.querySelectorAll('header > nav > ul > li > a');

    const scrollStart = 100; // 이동 시작
    const scrollMiddle = 400; // 중앙 도착
    const scrollExpand = 700;
    const scrollEnd = 1000; // 텍스트 완전 확대 및 배경 변화 시작
    const releasePoint = 1200; // 화면 고정 해제 시점
    const restorePoint = 2000; // about 지나가고 원래 배경으로 복귀

    let isFixed = false;
    let isTitleFixed = false;

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

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

        // 📌 중앙 도착 후 화면 고정
        if (currentScroll >= scrollMiddle && !isFixed) {
            subText.style.position = "fixed";
            subText.style.top = "0";
            subText.style.left = "0";
            subText.style.width = "100%";
            subText.style.height = "100vh";
            isFixed = true;
        }

        // 📌 스크롤을 올리면 `fixed` 해제 → 원래 자리로 돌아감
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
            iamText.style.opacity = 1; // 📌 다시 원래 상태로 복구

        }

        // "READY" 글자 점점 커짐
        let scaleValue = 1 + scaleProgress * 8; // 기존 20 → 4로 줄임
        readyText.style.transform = `scale(${scaleValue})`;


        // 📌 "READY" 글자 색상 변경 (스크롤 내리면 흰색, 올리면 원래 색상)
        if (currentScroll >= scrollMiddle) {
            readyText.style.color = '#F9F5EF'; // 흰색으로 변경
            body.style.backgroundColor ='#000';
            header.style.backgroundColor ='#000';
            // 모든 네비게이션 링크 색상 변경
            headerNav.forEach(nav => {
                nav.style.color = '#F9F5EF';
            });

        } else {
            readyText.style.color = '#222'; // 📌 원래 색상 복원
            body.style.backgroundColor ='#F9F5EF';
            header.style.backgroundColor ='#F9F5EF';
            headerNav.forEach(nav => {
                nav.style.color = '#222';
            });
        }

        // 📌 `READY`가 완전히 커진 후 서서히 사라짐
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
        //
        // // 📌 스크롤을 올리면 `fixed` 해제 → 원래 자리로 돌아감
        // if (currentScroll > releasePoint) {
        //     // titleWrap.style.position = "relative";
        //     // titleWrap.style.left = 'initial';
        //     // titleWrap.style.top = 'initial';
        //     isTitleFixed = false;
        // }

        // 📌 `about` 섹션이 끝나면 배경과 텍스트 원래대로 복구
        if (currentScroll >= restorePoint) {
            readyText.style.color = '#222';
            body.style.backgroundColor = '#F9F5EF';
            header.style.backgroundColor = '#F9F5EF';
            headerNav.forEach(nav => {
                nav.style.color = '#222';
            });
        }
    });

    /* Intersection Observer */
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, options);

    const elements = document.querySelectorAll('.active-on-visible');
    elements.forEach((element) => observer.observe(element));
});















// /* header scroll */
// let lastScrollY = window.scrollY;
// window.addEventListener('scroll', () => {
//     const header = document.getElementById('header');
//     if (window.scrollY > lastScrollY) {
//         // 스크롤을 내릴 때
//         header.style.top = '-60px';
//         header.style.transform = 'translateY(-60px)';
//     } else {
//         // 스크롤을 올릴 때
//         header.style.top = '0';
//         header.style.transform = 'translateY(0)';
//     }
//     lastScrollY = window.scrollY;
// });
//
// /* mouse effect */
// document.addEventListener('DOMContentLoaded', function () {
//     const cursor = document.createElement('div');
//     cursor.classList.add('cursor');
//     document.body.appendChild(cursor);
//
//     // 마우스 이동 이벤트
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = `${e.pageX}px`; // 마우스 X 좌표로 이동
//         cursor.style.top = `${e.pageY}px`;  // 마우스 Y 좌표로 이동
//     });
//
//     // 이벤트 위임 처리
//     document.body.addEventListener('mouseenter', (event) => {
//         const target = event.target;
//
//         // li
//         if (target.matches('li')) {
//             cursor.style.transform = 'translate(-50%, -50%) scale(3)';
//             cursor.textContent = ''; // 텍스트 제거
//         }
//         // .fill-up
//         else if (target.matches('.fill-up')) {
//             cursor.style.transform = 'translate(-50%, -50%) scale(3)';
//             cursor.textContent = ''; // 텍스트 제거
//         }
//         // .project-link
//         else if (target.matches('.project-link')) {
//             cursor.style.transition = 'transform 0.1s ease'; // 클릭 시 부드러운 전환
//             cursor.style.transform = 'translate(-50%, -50%) scale(5)';
//             cursor.textContent = 'View More';
//             cursor.classList.add('active');
//         }
//     },true);
//
//     document.body.addEventListener('mouseleave', (event) => {
//         const target = event.target;
//
//         if (target.matches('li') || target.matches('.fill-up') || target.matches('.project-link')) {
//             cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//             cursor.textContent = '';
//             cursor.classList.remove('active');
//         }
//     },true);
//
//     // 마우스 클릭 시 커서 효과
//     document.addEventListener('mousedown', () => {
//         cursor.style.transform = 'translate(-50%, -50%) scale(2)';
//     });
//
//     // 마우스 클릭 해제 시 커서 효과 복원
//     document.addEventListener('mouseup', () => {
//         cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//     });
// });
//
// /* noise 효과 */
// document.addEventListener('DOMContentLoaded', function () {
//     function createNoiseEffect(isForHeader = false) {
//         const noiseEffect = document.createElement('div');
//         noiseEffect.classList.add('noise');
//
//         // noise header or body
//         noiseEffect.style.position =isForHeader? 'absolute' : 'fixed';
//         noiseEffect.style.zIndex = isForHeader? '1000' : '-1';
//         return noiseEffect;
//     }
//
//     // body에 noise 효과 추가
//     const bodyNoiseEffect = createNoiseEffect(false);
//     document.body.appendChild(bodyNoiseEffect);
//
//     // header에 noise 효과 추가
//     const header = document.querySelector('header');
//     if (header) {
//         const headerNoiseEffect = createNoiseEffect(true);
//         header.appendChild(headerNoiseEffect);
//     }
// });
//
// /*top 버튼*/
// document.addEventListener('DOMContentLoaded', function () {
//     const topButton = document.createElement('button');
//     topButton.textContent = 'Top';
//     topButton.classList.add('top-button');
//
//     document.body.appendChild(topButton);
//
//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 300) {
//             topButton.style.opacity = '1';
//         } else {
//             topButton.style.opacity = '0';
//         }
//     });
//
//     topButton.addEventListener('click', function () {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
// });
//
// /* scroll animation & lazy loading & IntersectionObserver & skeleton */
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOMContentLoaded 이벤트 발생 (common.js)');
//
//     const isIndexPage = window.location.pathname.includes('index.html');
//
//     // IntersectionObserver 옵션 설정
//     const scrollObserverOptions = { threshold: 0.1 };
//     const lazyObserverOptions = { threshold: 0.01 };
//
//     // IntersectionObserver 생성
//     const scrollObserver = new IntersectionObserver(handleScrollAnimation, scrollObserverOptions);
//     const lazyImageObserver = new IntersectionObserver(handleLazyLoading, lazyObserverOptions);
//
//     // 옵저버 초기화
//     document.querySelectorAll('.contents').forEach(el => scrollObserver.observe(el));
//     document.querySelectorAll("img[data-src]").forEach((img,index) => {
//
//         if(!isIndexPage){
//             const skeleton = document.createElement("div");
//             skeleton.className = "skeleton";
//
//             const uniqueId = `skeleton-${index}`;
//             skeleton.setAttribute('data-skeleton-id', uniqueId);
//             img.setAttribute('data-skeleton-id', uniqueId);
//
//             img.parentNode.insertBefore(skeleton, img);
//         }
//
//         lazyImageObserver.observe(img);
//
//         if(img.complete){
//             hideSkeleton(img);
//         }
//
//     });
//
//     // 스크롤 애니메이션 처리 함수
//     function handleScrollAnimation(entries, observer) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('loaded');
//
//                 if (entry.target.classList.contains('title-name')) {
//                     entry.target.querySelectorAll('span').forEach((span, index) => {
//                         span.style.transitionDelay = `${index * 0.05}s`;
//                         span.classList.add('loaded');
//                     });
//                 }
//
//                 entry.target.querySelectorAll("img[data-src]").forEach(img => {
//                     img.src = img.dataset.src;
//                     lazyImageObserver.unobserve(img);
//                 });
//
//                 entry.target.querySelectorAll("video.cont").forEach(video => {
//                     video.classList.add('page-loaded');
//                 });
//
//                 observer.unobserve(entry.target);
//             }
//         });
//     }
//
//     // Lazy Loading 처리 함수
//     function handleLazyLoading(entries, observer) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const lazyImage = entry.target;
//                 lazyImage.src = lazyImage.dataset.src;
//
//                 // 이미지 로드 후 스켈레톤 숨기기 (딜레이 추가)
//                 lazyImage.onload = () => {
//                     setTimeout(() => hideSkeleton(lazyImage), 100);
//                 };
//
//                 // 이미지가 이미 로드된 경우에도 스켈레톤 숨기기
//                 if (lazyImage.complete) {
//                     setTimeout(() => hideSkeleton(lazyImage), 100);
//                 }
//
//                 observer.unobserve(lazyImage);
//             }
//         });
//     }
//
//     function hideSkeleton(image){
//         image.classList.add("loaded");
//
//         const skeletonId = image.getAttribute('data-skeleton-id');
//         const skeleton = document.querySelector(`.skeleton[data-skeleton-id="${skeletonId}"]`);
//
//         if(skeleton){
//             skeleton.style.display = "none";
//         }else{
//             console.error(`Skeleton element not found for image with id: ${skeletonId}`);
//         }
//     }
// });
//
// /* page transition */
// document.addEventListener('DOMContentLoaded', function () {
//     const main = document.querySelector('main');
//
//     if (!main) {
//         console.error('main 요소를 찾을 수 없습니다.');
//         return;
//     } else {
//         console.log('main 요소 발견:', main);
//     }
//
//     // 초기 url를 변경하지 않고 상태 저장
//     const initialUrl = window.location.href;
//     history.replaceState({page: initialUrl}, '', initialUrl);
//
//     // url을 절대 경로로 변환하는 함수
//     function getAbsoluteUrl(url) {
//         if(url.startsWith('#')){
//             return url;
//         }
//         const link = document.createElement('a');
//         link.href = url;
//         return link.href;
//     }
//     // 페이지 슬라이딩 처리
//     function handlePageTransition(targetUrl) {
//         console.log('슬라이드 아웃 적용 시도');
//         main.classList.add('slide-out');
//
//         setTimeout(() => {
//             const absoluteUrl = getAbsoluteUrl(targetUrl);
//             console.log('페이지 전환 중...', absoluteUrl);
//             history.pushState({page: absoluteUrl}, '', absoluteUrl);// 히스토리 상태 추가
//             window.location.href = absoluteUrl; // 실제 페이지 이동
//         }, 300);
//     }
//
//     // 이벤트 위임을 통해 모든 링크에 대해 이벤트 리스너 추가
//     document.body.addEventListener('click', function (event) {
//         const target = event.target.closest('a');
//
//         if (target) {
//             const targetUrl = target.getAttribute('href');
//
//             if(targetUrl && targetUrl.startsWith('#')){
//                 console.log('내부 섹션으로 이동:', targetUrl);
//                 event.preventDefault();
//
//                 document.querySelector(targetUrl).scrollIntoView({behavior:'smooth'});
//                 return;
//             }
//
//             if(target.classList.contains('project-link')){
//                 event.preventDefault();
//                 console.log('클릭감지 , targetUrl');
//
//                 // 페이지 슬라이딩 처리
//                 handlePageTransition(targetUrl);
//             }
//
//         }
//
//     });
//
//     window.addEventListener('popstate', function (event) {
//         console.log('뒤로 가기 감지됨');
//
//         // popstate 발생 시 slide-out 클래스 제거
//         main.classList.remove('slide-out'); // 메인 화면으로 돌아올 때 슬라이딩 초기화
//
//         // 페이지가 정상적으로 표시되도록 리로드
//         if (event.state && event.state.page) {
//             window.location.href = event.state.page;
//         } else  {
//             window.location.href = initialUrl;
//         }
//     });
//
//     // 페이지 로드 시에도 slide-out 클래스를 제거하여 초기화
//     window.addEventListener('load', function() {
//         main.classList.remove('slide-out');
//     });
// });
//
// /* sub header scroll effect*/
// document.addEventListener('DOMContentLoaded', function () {
//     const bodyNoiseEffect = document.querySelector('.noise');
//     const subHeader = document.querySelector('.project-header');
//     const projectMain = document.querySelector('.project-main');
//     const introSection = document.querySelector('.intro');
//
//     // 초기값 설정 함수
//     function setInitialStyles() {
//         if (introSection) {
//             const introBottom = introSection.getBoundingClientRect().bottom;
//
//             // 페이지 로드 시 .intro 섹션의 위치에 따라 초기 상태 설정
//             if (introBottom <= 0) {
//                 bodyNoiseEffect.style.display = 'block';
//                 subHeader.style.backgroundColor = '#F9F5EF';
//                 projectMain.style.paddingTop = '60px';
//             } else {
//                 bodyNoiseEffect.style.display = 'none';
//                 subHeader.style.backgroundColor = 'transparent';
//                 projectMain.style.paddingTop = '0px';
//             }
//         }
//     }
//
//     // 초기값 설정 실행
//     setInitialStyles();
//
//     // 스크롤 이벤트 추가
//     window.addEventListener('scroll', function () {
//         setInitialStyles(); // 스크롤할 때마다 초기 스타일 업데이트
//     });
// });
//
// /* header dynamic text */
// // document.addEventListener("DOMContentLoaded", function() {
// //     const link = document.getElementById("dynamic-text");
// //
// //     function updateLinkText() {
// //         const width = window.innerWidth;
// //
// //         if (width <= 750) {
// //             link.textContent = "EUN";
// //         } else {
// //             link.textContent = "EUNSUJEONG";
// //         }
// //     }
// //
// //     updateLinkText();
// //
// //     window.addEventListener("resize", updateLinkText);
// // });
//
