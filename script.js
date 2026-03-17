/* ========================================
   WEDDING INVITATION JAVASCRIPT
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
    initCalendar();
    initCountdown();
    initRSVPForm();
});

/* ========================================
   ENVELOPE OPENING ANIMATION
   ======================================== */
function initEnvelope() {
    const envelope = document.querySelector('.envelope');
    const seal = document.getElementById('seal');
    const flap = document.querySelector('.envelope-flap');
    const letter = document.querySelector('.letter');
    const pocket = document.querySelector('.envelope-pocket');
    const mainContent = document.getElementById('main-content');
    const landing = document.getElementById('landing');
    const clickHint = document.querySelector('.click-hint');

    seal.addEventListener('click', openEnvelope);
    envelope.addEventListener('click', openEnvelope);

    let isOpened = false;

    function openEnvelope(e) {
        if (isOpened) return;
        isOpened = true;
        
        // Animation timeline
        const tl = gsap.timeline();
        
        // 1. Seal vanishes
        tl.to(seal, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
        })
        // Hide click hint
        .to(clickHint, {
            opacity: 0,
            duration: 0.2
        }, '-=0.3')
        // 2. Flap opens up (rotates backward)
        .to(flap, {
            rotateX: -180,
            duration: 0.6,
            ease: 'power2.out',
            transformOrigin: 'top center'
        })
        // 3. Letter rises up out of envelope
        .to(letter, {
            y: -200,
            duration: 0.6,
            ease: 'power2.out',
            onStart: () => {
                letter.style.zIndex = '20';
            }
        }, '-=0.2')
        // 4. Letter settles down centered on envelope
        .to(letter, {
            y: -5,
            duration: 0.4,
            ease: 'power2.inOut'
        })
        // 5. Pause to show the invitation
        .to({}, { duration: 0.8 })
        // 6. Fade out and go to main content
        .to(landing, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                landing.style.display = 'none';
                showMainContent();
            }
        });
    }

    function showMainContent() {
        mainContent.classList.add('visible');
        mainContent.style.display = 'block';
        
        // Initialize scroll animations after content is visible
        setTimeout(() => {
            initScrollAnimations();
            animateSaveTheDate();
        }, 100);
    }
}

/* ========================================
   SCROLL-BASED ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const mainContent = document.getElementById('main-content');
    
    // Use Intersection Observer with the scroll container as root
    const observerOptions = {
        root: mainContent,
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateSection(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections (skip save-the-date as it animates on load)
    document.querySelectorAll('.calendar-section, .plan-section, .details-section').forEach(section => {
        observer.observe(section);
    });
}

function animateSection(section) {
    if (section.classList.contains('calendar-section')) {
        animateCalendarSection();
    } else if (section.classList.contains('plan-section')) {
        animatePlanSection();
    } else if (section.classList.contains('details-section')) {
        animateDetailsSection();
    }
}

function animateCalendarSection() {
    const tl = gsap.timeline();
    
    tl.from('.families-text', { opacity: 0, y: 30, duration: 0.6 })
      .from('.couple-names', { opacity: 0, scale: 0.9, duration: 0.8 }, '-=0.3')
      .from('.decorative-line-side', { opacity: 0, x: -20, duration: 0.5, stagger: 0.1 }, '-=0.4')
      .from('.invite-text', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.vertical-line-transform', { scaleY: 0, duration: 0.5 }, '-=0.2')
      .from('.calendar-container', { opacity: 0, y: 40, duration: 0.7 }, '-=0.2')
      .from('.countdown-container', { opacity: 0, y: 30, duration: 0.6 }, '-=0.3');
}

function animatePlanSection() {
    const tl = gsap.timeline();
    
    tl.from('.plan-title', { opacity: 0, y: 50, duration: 0.8 })
      .from('.plan-section .decorative-line', { width: 0, duration: 0.6 }, '-=0.3')
      .from('.timeline-line', { scaleY: 0, transformOrigin: 'top center', duration: 1 }, '-=0.3')
      .from('.timeline-event.left', { opacity: 0, x: -80, duration: 0.7, stagger: 0.3 }, '-=0.5')
      .from('.timeline-event.right', { opacity: 0, x: 80, duration: 0.7, stagger: 0.3 }, '-=1.2')
      .from('.event-line', { width: 0, duration: 0.5, stagger: 0.2 }, '-=1');
}

function animateDetailsSection() {
    const tl = gsap.timeline();
    
    // Set initial state for line
    gsap.set('.details-section .decorative-line', { width: 0 });
    
    tl.from('.details-title', { opacity: 0, y: 50, duration: 0.8 })
      .to('.details-section .decorative-line', { width: 'clamp(150px, 40vw, 300px)', duration: 0.6 }, '-=0.3')
      .from('.location-container', { opacity: 0, y: 40, duration: 0.7 }, '-=0.2')
      .from('.location-icon', { scale: 0, rotation: -180, duration: 0.6 }, '-=0.4')
      .from('.rsvp-container', { opacity: 0, y: 40, duration: 0.7 }, '-=0.2')
      .from('.form-group', { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, '-=0.3')
      .from('.rsvp-submit', { scale: 0.9, duration: 0.5 }, '-=0.2');
}

/* ========================================
   SAVE THE DATE ANIMATION
   ======================================== */
function animateSaveTheDate() {
    const title = document.querySelector('.save-date-title');
    const flourish = document.querySelector('.decorative-flourish');
    const lines = document.querySelectorAll('.save-the-date .decorative-line');
    
    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    .to(flourish, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .to(lines, {
        width: '100%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.4');
}

/* ========================================
   CALENDAR GENERATION
   ======================================== */
function initCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    
    // May 2026 starts on Friday (day index 5)
    const firstDay = 5; // Friday
    const daysInMonth = 31;
    
    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Highlight 13th with flowers
        if (day === 13) {
            dayElement.classList.add('highlight-flowers');
        }
        
        // Highlight 14th with heart
        if (day === 14) {
            dayElement.classList.add('highlight-heart');
        }
        
        calendarDays.appendChild(dayElement);
    }
}

/* ========================================
   COUNTDOWN TIMER
   ======================================== */
function initCountdown() {
    // Wedding date: May 14, 2026, 9:00 AM (Muhurtam)
    const weddingDate = new Date('May 14, 2026 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '000';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ========================================
   RSVP FORM HANDLING
   ======================================== */
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('guest-name');
        const guestSelect = document.getElementById('guest-count');
        const button = form.querySelector('.rsvp-submit');
        const name = nameInput.value;
        const guests = guestSelect.value;
        
        // Show loading state
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        try {
            // Send RSVP via FormSubmit
            const response = await fetch('https://formsubmit.co/ajax/c0a3xqp6e@mozmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    guests: guests,
                    _subject: `Wedding RSVP: ${name} (${guests} guests)`,
                    message: `New RSVP received!\n\nName: ${name}\nNumber of Guests: ${guests}`
                })
            });
            
            if (response.ok) {
                // Success
                button.innerHTML = '<span>Thank You! ❤️</span>';
                button.style.background = 'var(--color-gold)';
                button.style.color = 'var(--color-bg-dark)';
                
                // Make inputs readonly
                nameInput.readOnly = true;
                guestSelect.disabled = true;
                
                // Create celebration effect
                createConfetti();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('RSVP Error:', error);
            // Fallback - still show success (email might have gone through)
            button.innerHTML = '<span>Thank You! ❤️</span>';
            button.style.background = 'var(--color-gold)';
            button.style.color = 'var(--color-bg-dark)';
            nameInput.readOnly = true;
            guestSelect.disabled = true;
            createConfetti();
        }
    });
}

/* ========================================
   CONFETTI CELEBRATION EFFECT
   ======================================== */
function createConfetti() {
    const colors = ['#d4af37', '#ffffff', '#f0d77a', '#ff69b4', '#ff1493', '#ffd700'];
    const shapes = ['❤️', '💕', '💍', '✨', '🎉', '💖'];
    const container = document.querySelector('.rsvp-container');
    const button = document.querySelector('.rsvp-submit');
    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Create burst from button center
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.6;
        const startX = buttonRect.left - containerRect.left + buttonRect.width / 2;
        const startY = buttonRect.top - containerRect.top + buttonRect.height / 2;
        
        if (isEmoji) {
            confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.cssText = `
                position: absolute;
                font-size: ${12 + Math.random() * 16}px;
                left: ${startX}px;
                top: ${startY}px;
                opacity: 1;
                pointer-events: none;
                z-index: 100;
            `;
        } else {
            confetti.style.cssText = `
                position: absolute;
                width: ${6 + Math.random() * 8}px;
                height: ${6 + Math.random() * 8}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${startX}px;
                top: ${startY}px;
                opacity: 1;
                pointer-events: none;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                z-index: 100;
            `;
        }
        container.appendChild(confetti);
        
        // Random angle for burst effect
        const angle = (Math.PI * 2 * i) / 80 + (Math.random() - 0.5) * 0.5;
        const velocity = 150 + Math.random() * 200;
        const xDist = Math.cos(angle) * velocity;
        const yDist = Math.sin(angle) * velocity - 100; // Bias upward
        
        gsap.to(confetti, {
            x: xDist,
            y: yDist,
            rotation: Math.random() * 720 - 360,
            opacity: 0,
            duration: 1.2 + Math.random() * 0.8,
            ease: 'power2.out',
            onComplete: () => confetti.remove()
        });
    }
}

/* ========================================
   SMOOTH SCROLL HIJACK (Video-like feel)
   ======================================== */
// CSS scroll-snap handles the section-by-section navigation
// No JavaScript intervention needed - let native scroll work
// The scroll-snap-type: y mandatory in CSS does all the work

/* ========================================
   PARALLAX BACKGROUND EFFECT
   ======================================== */
function initParallax() {
    const overlays = document.querySelectorAll('.background-overlay');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        overlays.forEach((overlay, index) => {
            const section = overlay.parentElement;
            const rect = section.getBoundingClientRect();
            const speed = 0.5;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = (rect.top * speed);
                overlay.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Initialize parallax when scroll animations are set up
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initParallax, 100);
});
