// Initialize Three.js scenes and animations
class PortfolioAnimations {
    constructor() {
        this.scenes = {};
        this.renderers = {};
        this.animations = {};
        this.init();
    }

    init() {
        this.initHeroScene();
        this.initAboutScene();
        this.initProjectScenes();
        this.initScrollAnimations();
        this.initNavigation();
        this.initContactForm();
        this.initMobileMenu();
    }

    // Hero Section 3D Animation
    initHeroScene() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true 
        });
        
        renderer.setSize(400, 400);
        renderer.setClearColor(0x000000, 0);

        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100),
            new THREE.OctahedronGeometry(0.5)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x667eea, 
                wireframe: true,
                transparent: true,
                opacity: 0.8
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x764ba2, 
                wireframe: true,
                transparent: true,
                opacity: 0.8
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xf093fb, 
                wireframe: true,
                transparent: true,
                opacity: 0.8
            })
        ];

        const meshes = [];
        for (let i = 0; i < 8; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 * (index + 1);
                mesh.rotation.y += 0.01 * (index + 1);
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            
            renderer.render(scene, camera);
        };

        animate();
        
        this.scenes.hero = { scene, camera, renderer, meshes };
    }

    // About Section 3D Animation
    initAboutScene() {
        const canvas = document.getElementById('about-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true 
        });
        
        renderer.setSize(400, 400);
        renderer.setClearColor(0x000000, 0);

        // Create DNA-like double helix
        const points1 = [];
        const points2 = [];
        const radius = 2;
        const height = 4;
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 4;
            const y = (i / segments - 0.5) * height;
            
            points1.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                y,
                Math.sin(angle) * radius
            ));
            
            points2.push(new THREE.Vector3(
                Math.cos(angle + Math.PI) * radius,
                y,
                Math.sin(angle + Math.PI) * radius
            ));
        }

        const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
        const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
        
        const material1 = new THREE.LineBasicMaterial({ 
            color: 0x667eea,
            transparent: true,
            opacity: 0.8
        });
        const material2 = new THREE.LineBasicMaterial({ 
            color: 0x764ba2,
            transparent: true,
            opacity: 0.8
        });

        const line1 = new THREE.Line(geometry1, material1);
        const line2 = new THREE.Line(geometry2, material2);
        
        scene.add(line1);
        scene.add(line2);

        camera.position.z = 8;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            line1.rotation.y += 0.01;
            line2.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        };

        animate();
        
        this.scenes.about = { scene, camera, renderer, lines: [line1, line2] };
    }

    // Project Section Animations
    initProjectScenes() {
        for (let i = 1; i <= 4; i++) {
            this.initProjectScene(i);
        }
    }

    initProjectScene(projectNum) {
        const canvas = document.getElementById(`project-${projectNum}-canvas`);
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true 
        });
        
        renderer.setSize(300, 200);
        renderer.setClearColor(0x000000, 0);

        let meshes = [];
        let particles = [];

        // Different animations for each project
        switch(projectNum) {
            case 1: // 3D Gallery
                this.createGalleryScene(scene, meshes);
                break;
            case 2: // Particle System
                this.createParticleScene(scene, particles);
                break;
            case 3: // Data Visualization
                this.createDataVizScene(scene, meshes);
                break;
            case 4: // Shader Playground
                this.createShaderScene(scene, meshes);
                break;
        }

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 * (index + 1);
                mesh.rotation.y += 0.01 * (index + 1);
            });
            
            particles.forEach(particle => {
                particle.position.y += particle.velocity.y;
                particle.velocity.y -= 0.01; // gravity
                
                if (particle.position.y < -2) {
                    particle.position.y = 2;
                    particle.velocity.y = 0;
                }
            });
            
            renderer.render(scene, camera);
        };

        animate();
        
        this.scenes[`project${projectNum}`] = { 
            scene, 
            camera, 
            renderer, 
            meshes, 
            particles 
        };
    }

    createGalleryScene(scene, meshes) {
        // Create floating frames
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x667eea,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
    }

    createParticleScene(scene, particles) {
        // Create particle system
        for (let i = 0; i < 50; i++) {
            const geometry = new THREE.SphereGeometry(0.05, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0xf093fb,
                transparent: true,
                opacity: 0.8
            });
            const particle = new THREE.Mesh(geometry, material);
            
            particle.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            
            particle.velocity = {
                y: Math.random() * 0.02 - 0.01
            };
            
            scene.add(particle);
            particles.push(particle);
        }
    }

    createDataVizScene(scene, meshes) {
        // Create bar chart
        for (let i = 0; i < 5; i++) {
            const height = Math.random() * 2 + 0.5;
            const geometry = new THREE.BoxGeometry(0.3, height, 0.3);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color().setHSL(i / 5, 0.8, 0.6),
                transparent: true,
                opacity: 0.8
            });
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (i - 2) * 0.8,
                height / 2,
                0
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
    }

    createShaderScene(scene, meshes) {
        // Create geometric patterns
        for (let i = 0; i < 8; i++) {
            const geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x764ba2,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
    }

    // Scroll Animations with GSAP
    initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        gsap.from('.hero-text', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.hero-visual', {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        // About section animations
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.about-visual', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        // Stats animation
        gsap.from('.stat', {
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Project cards animation
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Skills animation
        gsap.from('.skill-item', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            x: -30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Contact section animation
        gsap.from('.contact-item', {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 30,
            opacity: 0,
            ease: 'power3.out'
        });
    }

    // Navigation functionality
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Contact form functionality
    initContactForm() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Mobile menu functionality
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    
    // Add some interactive effects
    addInteractiveEffects();
});

// Additional interactive effects
function addInteractiveEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Mouse move effect for hero canvas
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        heroCanvas.addEventListener('mousemove', (e) => {
            const rect = heroCanvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            heroCanvas.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(y - 0.5) * 10}deg)`;
        });
        
        heroCanvas.addEventListener('mouseleave', () => {
            heroCanvas.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Resize Three.js renderers
    Object.values(window.portfolioAnimations?.scenes || {}).forEach(sceneData => {
        if (sceneData.renderer && sceneData.camera) {
            const canvas = sceneData.renderer.domElement;
            const rect = canvas.getBoundingClientRect();
            
            sceneData.camera.aspect = rect.width / rect.height;
            sceneData.camera.updateProjectionMatrix();
            sceneData.renderer.setSize(rect.width, rect.height);
        }
    });
}, 250));

// Performance optimization
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);
