class PaperPlaneAnimation {
    constructor() {
        this.container = null;
        this.plane = null;
        this.trail = [];
        this.isAnimating = false;
    }
    
    createAnimationContainer() {
        this.container = document.createElement('div');
        this.container.className = 'paper-plane-container';
        this.container.innerHTML = `
            <div class="paper-plane">
                <svg viewBox="0 0 24 24" class="plane-icon">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                <div class="plane-trail"></div>
            </div>
            <div class="flight-path"></div>
            <div class="success-message">
                <div class="success-icon">✈️</div>
                <h2>Bokning Skickad!</h2>
                <p>Din förfrågan är på väg...</p>
            </div>
        `;
        
        document.body.appendChild(this.container);
        this.plane = this.container.querySelector('.paper-plane');
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.createAnimationContainer();
        
        // Show container
        setTimeout(() => {
            this.container.classList.add('active');
            this.startFlightAnimation();
        }, 100);
    }
    
    startFlightAnimation() {
        const plane = this.plane;
        const trail = this.container.querySelector('.plane-trail');
        const flightPath = this.container.querySelector('.flight-path');
        const successMessage = this.container.querySelector('.success-message');
        
        // Show flight path
        flightPath.classList.add('visible');
        
        // Start plane animation
        setTimeout(() => {
            plane.classList.add('flying');
            trail.classList.add('active');
            
            // Create particle trail
            this.createParticleTrail();
            
            // Show success message mid-flight
            setTimeout(() => {
                successMessage.classList.add('visible');
            }, 2000);
            
            // Complete animation
            setTimeout(() => {
                this.completeAnimation();
            }, 4000);
            
        }, 500);
    }
    
    createParticleTrail() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'trail-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                this.container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    completeAnimation() {
        this.container.classList.add('complete');
        
        setTimeout(() => {
            this.container.classList.add('fade-out');
            
            setTimeout(() => {
                window.endingAnimation.showEndingMessage();
                this.cleanup();
            }, 1000);
        }, 1500);
    }
    
    cleanup() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        this.isAnimating = false;
    }
}