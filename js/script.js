document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Tutup menu saat klik di luar
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', function() {
        if (html.getAttribute('data-theme') === 'light') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Product Slider
    const sliderTrack = document.querySelector('.slider-track');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Product data
    const products = [
        {
            id: 1,
            name: 'Daging Sapi Premium',
            description: 'Daging sapi berkualitas tinggi dari sapi ternak pilihan dengan pemeliharaan terbaik.',
            price: 'Rp 120.000/kg',
            image: 'images/dagingsapi.jpg'
        },
        {
            id: 2,
            name: 'Susu Murni Segar',
            description: 'Susu murni langsung dari peternakan kami tanpa bahan pengawet atau tambahan.',
            price: 'Rp 25.000/liter',
            image: 'images/susumurni.jpg'
        },
        {
            id: 3,
            name: 'Telur Organik',
            description: 'Telur ayam kampung organik dengan kandungan gizi tinggi dan rasa yang lezat.',
            price: 'Rp 35.000/kg',
            image: 'images/telurayam.jpg'
        },
        {
            id: 4,
            name: 'Bibit Domba Unggul',
            description: 'Bibit domba unggul dengan pertumbuhan cepat dan ketahanan penyakit yang baik.',
            price: 'Rp 15.000.000/ekor',
            image: 'images/bibitdomba.jpg'
        },
        {
            id: 5,
            name: 'Daging Kambing',
            description: 'Daging kambing segar dengan tekstur lembut dan rasa khas yang nikmat.',
            price: 'Rp 150.000/kg',
            image: 'images/dagingkambing.jpg'
        }
    ];
    
    // Create product cards
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">${product.price}</span>
            </div>
        `;
        sliderTrack.appendChild(productCard);
        
        // Create dots
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        sliderDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    const productCards = document.querySelectorAll('.product-card');
    const cardWidth = productCards[0].offsetWidth;
    const gap = 30; // Gap between cards
    let currentIndex = 0;
    
    // Update slider position
    function updateSlider() {
        const offset = -(currentIndex * (cardWidth + gap));
        sliderTrack.style.transform = `translateX(${offset}px)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex < products.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = products.length - 1;
        }
        updateSlider();
    });
    
    // Auto slide
    let slideInterval = setInterval(() => {
        if (currentIndex < products.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            if (currentIndex < products.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.stats, .achievement-card, .product-card, .info-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
        this.reset();
    });
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih telah berlangganan newsletter kami!');
        this.reset();
    });
    
    // Responsive adjustments
    function handleResize() {
        const cardWidth = productCards[0].offsetWidth;
        updateSlider();
    }
    
    window.addEventListener('resize', handleResize);
});