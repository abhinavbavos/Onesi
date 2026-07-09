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
        }) ();
    </script >

</body >

</html >
