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

/* project list select */
document.addEventListener('DOMContentLoaded', () => {
   const projectList = document.querySelectorAll('.project-list ul li');

    if (projectList.length > 0) {
        projectList[0].classList.add('active');
    }

   projectList.forEach(item => {
       item.addEventListener('click', () => {
           projectList.forEach(item => {
               item.classList.remove('active');
           });
           item.classList.add('active');
       })
   });
});

/* filtering */
document.addEventListener('DOMContentLoaded', function () {
    const projectList = document.querySelectorAll('.project-view ul li');
    const selectedProjectContainer = document.getElementById('selected-project');
    const projectLink = document.getElementById('project-link');
    const viewFigure = selectedProjectContainer.querySelector('.thumbnail .view');

    projectList.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            // 선택된 프로젝트 ID 가져오기
            const projectId = this.getAttribute('data-project');
            console.log(projectId);

            // 해당 프로젝트 콘텐츠 찾기
            const selectedContent = document.querySelector(`.project-content[data-project="${projectId}"]`);

            if (selectedContent) {
                // 선택된 콘텐츠의 내용 복사
                const img = selectedContent.querySelector('.thumbnail img');
                const video = selectedContent.querySelector('.thumbnail video');
                const title = selectedContent.querySelector('.desc strong').textContent;
                const description = selectedContent.querySelector('.desc span').textContent;
                const link = selectedContent.querySelector('.project-link').href;

                // #selected-project 영역 업데이트
                viewFigure.innerHTML = ''; // 기존 콘텐츠 삭제

                if (video) {
                    const videoClone = video.cloneNode(true);
                    viewFigure.appendChild(videoClone);
                } else if (img) {
                    const imgClone = img.cloneNode(true);
                    viewFigure.appendChild(imgClone);
                }

                // #selected-project 영역 업데이트
                selectedProjectContainer.querySelector('.desc strong').textContent = title;
                selectedProjectContainer.querySelector('.desc span').textContent = description;
                projectLink.href = link;
            }
        });
    });
    // 첫 번째 프로젝트로 초기값 설정
    if (projectList.length > 0) {
        projectList[0].click();
    }
});

/* lazy load */
document.addEventListener("DOMContentLoaded", function() {
   let lazyImgs = document.querySelectorAll("img");

   if("intersectionObserver" in window) {
       let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
           entries.forEach(function(entry) {
               if(entry.isIntersecting) {
                   let lazyImage = entry.target;
                   lazyImage.src = lazyImage.dataset.src;
                   lazyImage.classList.add("loaded");
                   observer.unobserve(lazyImage);
               }
           });
       });

       lazyImgs.forEach(function(lazyImage) {
           observer.observe(lazyImage);
       });
   }else{
       lazyImgs.forEach(function(lazyImage) {
           lazyImage.src = lazyImage.dataset.src;
           lazyImage.classList.add("loaded");
       });
   }
});

/* scroll animation */
document.addEventListener("DOMContentLoaded", function() {
    const titleName = document.querySelectorAll('.title-name');
    const contents = document.querySelectorAll('.contents');

    const options = {
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if(entry.target.classList.contains('title-name')){
                    entry.target.classList.add('loaded');
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach((span, index) => {
                        span.style.transitionDelay = `${index * 0.05}s`;
                        span.classList.add('loaded');
                    });
                }else{
                    entry.target.classList.add('loaded');
                }
                observer.unobserve(entry.target);
               }
            });
    }, options);

    contents.forEach((content) => {
        observer.observe(content);
    });

    titleName.forEach((title) => {
           observer.observe(title);
           splitText(title, 0.05, 'span');
    });
    /* text split */
    function splitText(el, interval, tagName = 'span') {
        let text = el.innerText;
        el.innerHTML = '';
        let tags = '';
        let count = 0;

        for (let letter of text) {
            tags += `<${tagName}>${letter}</${tagName}>`;
            count++;
        }
        el.innerHTML = tags;
    }

});

/* page load */
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















