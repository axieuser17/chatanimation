class ChatController {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.chatButton = document.getElementById('chatButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.currentStep = 0;
        this.isAnimating = false;
        
        // Fast, continuous conversation flow - NO USER TYPING
        this.conversation = [
            { type: 'bot', text: 'Hej! Välkommen till Axie Studio! 👋', delay: 800 },
            { type: 'bot', text: 'Jag kan hjälpa dig att boka en tid för konsultation eller demo.', delay: 1000 },
            { type: 'bot', text: 'Vad kan jag hjälpa dig med idag?', delay: 900 },
            
            { type: 'user', text: 'Hej! Jag skulle vilja boka en tid för en demo.', delay: 1200 },
            
            { type: 'bot', text: 'Perfekt! En demo är ett utmärkt sätt att se vad vi kan erbjuda.', delay: 800 },
            { type: 'bot', text: 'Vilken typ av tjänst är du mest intresserad av?', delay: 1000 },
            
            { type: 'user', text: 'Jag är intresserad av webbutveckling och design.', delay: 1400 },
            
            { type: 'bot', text: 'Fantastiskt! Vi har stor expertis inom webbutveckling och modern design.', delay: 900 },
            { type: 'bot', text: 'Vi kan hjälpa dig med allt från responsiva webbsidor till e-handelslösningar.', delay: 1100 },
            { type: 'bot', text: 'Hur stort är ditt projekt ungefär?', delay: 800 },
            
            { type: 'user', text: 'Det är för mitt företag, vi behöver en ny hemsida och webshop.', delay: 1500 },
            
            { type: 'bot', text: 'Perfekt! Det låter som ett spännande projekt.', delay: 800 },
            { type: 'bot', text: 'Vi har hjälpt många företag med liknande lösningar.', delay: 900 },
            { type: 'bot', text: 'Låt mig öppna vårt bokningssystem så du kan välja en tid för en kostnadsfri konsultation! ✨', delay: 1200 }
        ];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Keep input readonly - no user interaction
        this.messageInput.setAttribute('readonly', true);
        this.messageInput.placeholder = 'Automatisk demo pågår...';
        this.sendButton.style.pointerEvents = 'none';
        this.sendButton.style.opacity = '0.6';
    }
    
    startDemo() {
        this.chatButton.classList.add('active');
        
        setTimeout(() => {
            this.chatContainer.classList.add('active');
            setTimeout(() => {
                this.startConversation();
            }, 600);
        }, 400);
    }
    
    startConversation() {
        if (this.currentStep < this.conversation.length) {
            const message = this.conversation[this.currentStep];
            
            setTimeout(() => {
                if (message.type === 'user') {
                    // NO TYPING SIMULATION - just add user message directly
                    this.addMessage(message.text, false);
                } else {
                    this.showBotMessage(message.text);
                }
                
                this.currentStep++;
                this.startConversation();
            }, message.delay);
        } else {
            // Open booking system after conversation ends
            setTimeout(() => {
                window.bookingController.openBookingSystem();
            }, 1500);
        }
    }
    
    showBotMessage(text) {
        this.showTypingIndicator();
        
        // Fast bot response time
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(text, true);
        }, 600 + Math.random() * 400);
    }
    
    addMessage(text, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        
        if (isBot) {
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = '🤖';
            messageDiv.appendChild(avatar);
        }
        
        const textContainer = document.createElement('div');
        textContainer.className = 'message-text';
        messageDiv.appendChild(textContainer);
        
        this.chatMessages.appendChild(messageDiv);
        
        // Immediate scroll to bottom
        this.scrollToBottom();
        
        // Fast typewriter effect
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textContainer.textContent += text.charAt(i);
                i++;
                // Continuous smooth scroll during typing
                this.scrollToBottom();
                setTimeout(typeWriter, isBot ? 15 : 12); // Fast typing
            }
        };
        
        setTimeout(typeWriter, 100);
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTo({
            top: this.chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        setTimeout(() => this.scrollToBottom(), 50);
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    fadeOutChat() {
        this.chatContainer.classList.add('fade-out');
    }
}