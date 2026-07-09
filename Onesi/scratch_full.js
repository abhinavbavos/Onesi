(function () {
    // === TYPEWRITER ===
    var typeEl = document.getElementById('typewriter-text');
    if (typeEl) {
        var text = 'MECHANICAL DESIGN & SIMULATION ENGINEER';
        var idx = 0;
        var typeSpeed = 45;
        var startDelay = 600;
        var typeTimer;

        function typeChar() {
            if (idx < text.length) {
                typeEl.textContent += text.charAt(idx);
                idx++;
                typeTimer = setTimeout(typeChar, typeSpeed);
            } else {
                typeEl.classList.remove('typing');
                typeEl.classList.add('done');
            }
        }

        // Clear initial text for typewriter
        typeEl.textContent = '';
        // Show cursor immediately to signal typing is coming
        typeEl.classList.add('typing');
        // Start typing after delay
        setTimeout(typeChar, startDelay);
    }

    // === CAROUSEL ===
    const track = document.querySelector('.projects-track');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let autoTimer;
    const interval = 4000;

    function goTo(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }
    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    function startAuto() {
        if (slides.length <= 1) return;
        stopAuto();
        autoTimer = setInterval(nextSlide, interval);
    }
    function stopAuto() { clearInterval(autoTimer); }

    if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); startAuto(); });
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goTo(parseInt(this.getAttribute('data-index')));
            startAuto();
        });
    });
    var wrapper = document.querySelector('.carousel-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAuto);
        wrapper.addEventListener('mouseleave', startAuto);
    }
    startAuto();

    // === SCROLL REVEAL ===
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }

    // === NAVBAR SCROLL EFFECT & SPY ===
    var header = document.querySelector('header');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('nav a');

    var scrollHandler = function () {
        var scrollY = window.pageYOffset;
        header.classList.toggle('scrolled', scrollY > 60);

        sections.forEach(function (current) {
            var sectionHeight = current.offsetHeight;
            var sectionTop = current.offsetTop - 150;
            var sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function (a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + sectionId) {
                        a.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();

    // === EXPERIENCE TABS LOGIC (Scroll Spy & Smooth Scroll) ===
    var expTabs = document.querySelectorAll('.exp-tab');
    var roleDetails = document.querySelectorAll('.role-details');

    // Scroll spy
    window.addEventListener('scroll', function () {
        var current = '';
        roleDetails.forEach(function (role) {
            var roleTop = role.offsetTop;
            if (pageYOffset >= (roleTop - 200)) {
                current = role.getAttribute('id');
            }
        });

        if (current) {
            expTabs.forEach(function (tab) {
                tab.classList.remove('active');
                if (tab.getAttribute('data-target') === current) {
                    tab.classList.add('active');
                }
            });
        }
    });

    // Smooth scroll on click
    expTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var targetId = this.getAttribute('data-target');
            var targetRole = document.getElementById(targetId);
            if (targetRole) {
                var y = targetRole.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // === AUTO SCROLL SNAPSHOTS WITH ARROWS ===
    var snapshotRows = document.querySelectorAll('.snapshots-row');
    snapshotRows.forEach(function (row) {
        // Create a wrapper for arrows
        var wrapper = document.createElement('div');
        wrapper.className = 'snapshots-wrapper';
        row.parentNode.insertBefore(wrapper, row);
        wrapper.appendChild(row);

        // Create Left Arrow
        var leftBtn = document.createElement('button');
        leftBtn.className = 'snapshot-nav-btn prev';
        leftBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';

        // Create Right Arrow
        var rightBtn = document.createElement('button');
        rightBtn.className = 'snapshot-nav-btn next';
        rightBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

        wrapper.insertBefore(leftBtn, row);
        wrapper.appendChild(rightBtn);

        leftBtn.addEventListener('click', function () {
            row.scrollBy({ left: -320, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', function () {
            row.scrollBy({ left: 320, behavior: 'smooth' });
        });

        // Auto Scroll Logic
        let scrollAmount = 0.5; // speed
        let isHovered = false;
        let direction = 1;

        wrapper.addEventListener('mouseenter', function () { isHovered = true; });
        wrapper.addEventListener('mouseleave', function () { isHovered = false; });
        wrapper.addEventListener('touchstart', function () { isHovered = true; }, { passive: true });
        wrapper.addEventListener('touchend', function () { isHovered = false; });

        function step() {
            if (!isHovered && row.scrollWidth > row.clientWidth) {
                row.scrollLeft += scrollAmount * direction;

                if (direction === 1 && Math.ceil(row.scrollLeft) >= (row.scrollWidth - row.clientWidth)) {
                    direction = -1;
                } else if (direction === -1 && row.scrollLeft <= 0) {
                    direction = 1;
                }
            }
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });

    // === FORCE VIDEO AUTOPLAY ===
    document.querySelectorAll('video').forEach(function (vid) {
        vid.muted = true;
        vid.defaultMuted = true;
        vid.play().catch(function (e) { console.log("Video autoplay blocked", e); });

        vid.addEventListener('pause', function () {
            // If it gets paused automatically, force it to play again
            if (!vid.ended) {
                vid.play().catch(function (e) { });
            }
        });
    });
})();
    </script >

</body >

</html >
