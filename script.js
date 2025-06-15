// Smooth scrolling for navigation links with easing
console.log('Script loaded. Attaching event listeners to nav links...');
document.querySelectorAll('nav a').forEach(anchor => {
    console.log('Found nav link:', anchor.getAttribute('href'));
    anchor.addEventListener('click', function(e) {
        console.log('Nav link clicked:', this.getAttribute('href'));
        e.preventDefault();
        const targetId = this.getAttribute('href');
        let section = document.querySelector(targetId);

        // Check if featured-details is visible and if the clicked link is for featured-project
        if (targetId === '#featured-project') {
            const featuredDetailsSection = document.getElementById('featured-details');
            if (featuredDetailsSection && featuredDetailsSection.style.display === 'block') {
                section = featuredDetailsSection;
            }
        }

        console.log('Target ID:', targetId, 'Section found:', !!section);
        
        if (section) {
            const headerOffset = 0; // Temporarily set to 0 for debugging
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active state immediately
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close hamburger menu if open (for mobile navigation)
            const hamburger = document.querySelector('.hamburger-menu');
            const navLinksContainer = document.querySelector('.nav-links-container');
            if (hamburger && navLinksContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// Enhanced scroll handling with improved section detection
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const nav = document.querySelector('nav');
    const hero = document.querySelector('.hero');

    let scrollTimeout;
    let isScrolling = false;

    // Function to update active navigation link based on scroll position
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        let currentActive = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Use a threshold to activate section earlier or later
            const offset = window.innerHeight * 0.3; // Activate when 30% of section is in view

            if (window.scrollY >= sectionTop - offset && window.scrollY < sectionTop + sectionHeight - offset) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            let targetId = currentActive;

            // Special handling for featured-details to link it to featured-project in nav
            if (currentActive === 'featured-details') {
                targetId = 'featured-project';
            }

            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    }

    function handleScrollEvent() {
        if (!isScrolling) {
            isScrolling = true;
        }

        // Handle navigation background
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Parallax effect for hero section
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }

        // Clear the timeout if it exists
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Set a new timeout
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            updateActiveSection();
        }, 100);
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollEvent();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check for active section on load
    updateActiveSection();
}

// Enhanced scroll animation with intersection observer
function handleScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.skill-category, .project-card, .blog-card, .bio, .interests, .interests li, .skill-tag, .tool-item, .featured-project-content > *, section h2');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { 
        threshold: [0.1, 0.5],
        rootMargin: '-50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Enhanced dark mode toggle with animation and system preference
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle Dark Mode';
    document.body.appendChild(darkModeToggle);

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                      (localStorage.getItem('darkMode') === null && prefersDark.matches);

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    // Listen for system preference changes
    prefersDark.addListener((e) => {
        if (localStorage.getItem('darkMode') === null) {
            document.body.classList.toggle('dark-mode', e.matches);
            darkModeToggle.innerHTML = e.matches ? '☀️' : '🌙';
        }
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Animate the toggle button
        darkModeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1) rotate(360deg)';
            darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
        }, 200);
    });
}

// Enhanced typing animation with cursor effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(type, speed);
        } else {
            cursor.remove();
        }
    }
    
    type();
}

// Add hover effects to skill items with 3D effect
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px) scale(1.05)';
            item.style.color = 'var(--secondary-color)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.color = '';
        });
    });
}

// Enhanced profile image parallax with smooth movement
function initProfileParallax() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        let timeout;
        window.addEventListener('mousemove', (e) => {
            if (timeout) {
                window.cancelAnimationFrame(timeout);
            }
            
            timeout = window.requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 20;
                const yPos = (clientY / window.innerHeight - 0.5) * 20;
                
                profileImage.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${xPos * 0.1}deg)`;
            });
        });
    }
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Function for the Featured Project 'View Project' button
function handleFeaturedViewProject() {
    const btn = document.getElementById('featured-view-btn');
    const featuredSection = document.querySelector('.featured-project-section');
    const detailsSection = document.getElementById('featured-details');
    const backBtn = document.getElementById('back-to-featured');
    
    if (btn && featuredSection && detailsSection) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            featuredSection.style.display = 'none';
            detailsSection.style.display = 'block';
            // Scroll to the top of the details section
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    if (backBtn && featuredSection && detailsSection) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            detailsSection.style.display = 'none';
            featuredSection.style.display = 'flex'; // Revert to flex for the entire section
        });
    }
}

// Initialize Projects Carousel
function initProjectsCarousel() {
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.querySelector('section#projects .prev-btn');
    const nextBtn = document.querySelector('section#projects .next-btn');

    if (projectsGrid && prevBtn && nextBtn) {
        // Calculate the scroll amount dynamically based on card width and gap
        const firstCard = projectsGrid.querySelector('.project-card');
        const computedStyle = getComputedStyle(projectsGrid);
        const gap = parseFloat(computedStyle.gap); // Get the gap value

        let scrollAmount = 0;
        if (firstCard) {
            scrollAmount = firstCard.offsetWidth + gap;
        }

        prevBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Function to check and update button visibility
        const checkCarouselButtons = () => {
            // Add a small tolerance for floating point inaccuracies
            const tolerance = 1; 

            // Hide prev button if at the start
            if (projectsGrid.scrollLeft <= tolerance) {
                prevBtn.style.opacity = '0';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }

            // Hide next button if at the end
            if (projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth - tolerance) {
                nextBtn.style.opacity = '0';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        };

        // Initial check
        checkCarouselButtons();

        // Check on scroll
        projectsGrid.addEventListener('scroll', checkCarouselButtons);
    }
}

// Initialize all functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    handleScrollAnimation();
    initDarkMode();
    // typeWriter(document.querySelector('.hero-text .tagline'), "Information Technology Student"); // Uncomment if using typing effect
    initSkillHoverEffects();
    initProfileParallax();
    initScrollProgress();
    handleFeaturedViewProject();
    initProjectsCarousel();
    initHamburgerMenu(); // New function call
});

// Hamburger Menu functionality
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links-container');
    // const navLinks = document.querySelectorAll('.nav-links-container ul li a'); // No longer needed here

    hamburger.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior if any
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        // Toggle body scroll lock to prevent scrolling when menu is open
        document.body.classList.toggle('no-scroll', navLinksContainer.classList.contains('active'));
    });

    // Removed the navLinks.forEach listener as it's now handled by the smooth scrolling function
    // navLinks.forEach(link => {
    //     link.addEventListener('click', () => {
    //         hamburger.classList.remove('active');
    //         navLinksContainer.classList.remove('active');
    //         document.body.classList.remove('no-scroll');
    //     });
    // });
}

// Add enhanced hover effects to social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) rotate(360deg)';
        link.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
        link.style.boxShadow = '';
    });
}); 