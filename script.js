document.addEventListener("DOMContentLoaded", () => {
    
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;

    // ==========================================
    // 1. НАВІГАЦІЯ ПРИ КЛІКУ В МЕНЮ
    // ==========================================
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                if (header) {
                    header.style.transform = 'translateY(0)';
                }
            }
        });
    });

    // ==========================================
    // 2. ХОВАННЯ ТА ПОКАЗ ШАПКИ ПРИ СКРОЛІ
    // ==========================================
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!header) return;

        if (currentScroll > lastScrollTop && currentScroll > 60) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        if (currentScroll <= 10) {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // ==========================================
    // 3. ПЛАВНА ПОЯВА БЛОКІВ ПРИ СКРОЛІ (Reveal)
    // ==========================================
    const revealBlocks = document.querySelectorAll('.reason-row, h1');
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4.5;
        
        revealBlocks.forEach(block => {
            const blockTop = block.getBoundingClientRect().top;
            
            if (blockTop < triggerBottom) {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
                block.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // ==========================================
    // 4. ПОВЕРНЕННЯ 3D-ЕФЕКТУ (Tilt Эффект для медиа)
    // ==========================================
    const tiltElements = document.querySelectorAll('.media-container, .mopsik, .video-container');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // координата X всередині елемента
            const y = e.clientY - rect.top;  // координата Y всередині елемента
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Розраховуємо кут нахилу (макс 15 градусів)
            const rotateX = ((centerY - y) / centerY) * 15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            element.style.transition = 'transform 0.1s ease';
        });

        // Коли мишка йде з елемента — повертаємо все у дефолт
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            element.style.transition = 'transform 0.5s ease';
        });
    });

    // ==========================================
    // 5. ЛАПКИ ПРИ КЛІКУ
    // ==========================================
    window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('nav-btn')) {
            const particle = document.createElement('div');
            particle.classList.add('paw-particle');
            particle.innerHTML = '🐾';
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            document.body.appendChild(particle);
            
            setTimeout(() => { particle.remove(); }, 800);
        }
    });

});
