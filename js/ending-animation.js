class EndingAnimation {
    constructor() {
        this.container = null;
        this.isShowing = false;
    }
    
    showEndingMessage() {
        if (this.isShowing) return;
        this.isShowing = true;
        
        this.createEndingContainer();
        
        setTimeout(() => {
            this.container.classList.add('active');
            this.startTextAnimation();
        }, 300);
    }
    
    createEndingContainer() {
        this.container = document.createElement('div');
        this.container.className = 'ending-animation-container';
        this.container.innerHTML = `
            <div class="ending-background">
                <div class="floating-elements">
                    <div class="float-element">💼</div>
                    <div class="float-element">📈</div>
                    <div class="float-element">⭐</div>
                    <div class="float-element">🚀</div>
                    <div class="float-element">💡</div>
                    <div class="float-element">🎯</div>
                </div>
            </div>
            
            <div class="ending-content">
                <div class="main-message">
                    <h1 class="animated-text">
                        <span class="word">Vill</span>
                        <span class="word">Du</span>
                        <span class="word">Också</span>
                        <span class="word">Öka</span>
                        <span class="word">Din</span>
                        <span class="word">Kundservice?</span>
                    </h1>
                    
                    <div class="cta-section">
                        <p class="subtitle">Upptäck hur Axie Studio kan transformera din verksamhet</p>
                        <div class="cta-button-container">
                            <a href="#" class="cta-button">
                                <span class="button-text">Klicka På Länken Nu!</span>
                                <div class="button-glow"></div>
                                <div class="button-particles"></div>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="success-stats">
                    <div class="stat-item">
                        <div class="stat-number" data-target="500">0</div>
                        <div class="stat-label">Nöjda Kunder</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="98">0</div>
                        <div class="stat-label">% Framgång</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="24">0</div>
                        <div class="stat-label">Timmar Support</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.container);
    }
    
    startTextAnimation() {
        const words = this.container.querySelectorAll('.word');
        const stats = this.container.querySelectorAll('.stat-number');
        const ctaButton = this.container.querySelector('.cta-button');
        
        // Fast word animation
        words.forEach((word, index) => {
            setTimeout(() => {
                word.classList.add('visible');
            }, index * 200 + 600);
        });
        
        // Show subtitle and CTA faster
        setTimeout(() => {
            this.container.querySelector('.subtitle').classList.add('visible');
            
            setTimeout(() => {
                this.container.querySelector('.cta-button-container').classList.add('visible');
                this.startButtonAnimation();
            }, 500);
            
        }, words.length * 200 + 1000);
        
        // Animate stats
        setTimeout(() => {
            this.container.querySelector('.success-stats').classList.add('visible');
            this.animateStats();
        }, words.length * 200 + 1500);
        
        // Start floating elements
        this.startFloatingAnimation();
    }
    
    startButtonAnimation() {
        const button = this.container.querySelector('.cta-button');
        const particles = button.querySelector('.button-particles');
        
        // Create button particles
        setInterval(() => {
            if (!this.isShowing) return;
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particles.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }, 150);
        
        // Pulse animation
        setInterval(() => {
            if (!this.isShowing) return;
            button.classList.add('pulse');
            setTimeout(() => button.classList.remove('pulse'), 400);
        }, 2000);
    }
    
    animateStats() {
        const stats = this.container.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let current = 0;
            const increment = target / 30; // Faster counting
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 40);
        });
    }
    
    startFloatingAnimation() {
        const elements = this.container.querySelectorAll('.float-element');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('floating');
            }, index * 100);
        });
    }
    
    hideEndingMessage() {
        if (!this.isShowing) return;
        
        this.container.classList.add('fade-out');
        
        setTimeout(() => {
            if (this.container) {
                this.container.remove();
                this.container = null;
            }
            this.isShowing = false;
        }, 800);
    }
}