
(() => {
    // Bật chế độ JavaScript để sử dụng Scroll Reveal
    document.documentElement.classList.add("js");

    // =====================================
    // MOBILE MENU
    // =====================================

    const menuButton = document.querySelector(".menu-toggle");

    const closeMenu = () => {
        document.body.classList.remove("nav-open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.setAttribute("aria-label", "Mở menu");
    };

    menuButton?.addEventListener("click", () => {
        const open = !document.body.classList.contains("nav-open");

        document.body.classList.toggle("nav-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute(
            "aria-label",
            open ? "Đóng menu" : "Mở menu"
        );
    });

    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            closeMenu();
        }
    });


    // =====================================
    // ELARION - SCROLL REVEAL
    // =====================================

    const revealSelector = [
        ".reveal",
        ".tribe-card",
        ".team-card",
        ".mechanic-grid article",
        ".box-item",
        ".tease-copy",
        ".story-heading",
        ".story-copy"
    ].join(", ");

    window.ELARION_initReveal = function (root = document) {

        const targets = root.querySelectorAll(revealSelector);

        // Kiểm tra chế độ giảm chuyển động
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Trình duyệt không hỗ trợ hoặc người dùng tắt animation
        if (!("IntersectionObserver" in window) || reduceMotion) {
            targets.forEach(element => {
                element.classList.add("reveal", "is-visible");
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");

                        // Chỉ chạy hiệu ứng một lần
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -20px 0px"
            }
        );

        targets.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    };

    // Khởi chạy Scroll Reveal
    window.ELARION_initReveal();

})();
