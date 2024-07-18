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
    const projectList = document.querySelectorAll('.project-list ul li');
    const selectedProjectContainer = document.getElementById('selected-project');
    const projectLink = document.getElementById('project-link');

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
                const thumbnail = selectedContent.querySelector('.thumbnail img').src;
                const title = selectedContent.querySelector('.desc strong').textContent;
                const description = selectedContent.querySelector('.desc span').textContent;
                const link = selectedContent.querySelector('.project-link').href;

                // #selected-project 영역 업데이트
                selectedProjectContainer.querySelector('.thumbnail img').src = thumbnail;
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

