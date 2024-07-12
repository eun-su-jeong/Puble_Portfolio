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
