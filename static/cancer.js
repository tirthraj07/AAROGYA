document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".page");
    const container = document.querySelector(".container");

    let scrollPos = 0;
    let ticking = false;

    function parallaxScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(section, index) {
            const sectionOffset = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionOffset && scrollY < sectionOffset + sectionHeight) {
                const scrollDistance = scrollY - sectionOffset;
                section.style.backgroundPositionY = -scrollDistance * 0.5 + "px";
            }
        });

        ticking = false;
    }

    function onScroll() {
        scrollPos = window.pageYOffset;

        if (!ticking) {
            window.requestAnimationFrame(parallaxScroll);
            ticking = true;
        }
    }

    container.addEventListener("scroll", onScroll);
});