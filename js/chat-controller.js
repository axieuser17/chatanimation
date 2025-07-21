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
        
        // Continuous, logical conversation flow
        this.conversation = [
            { type: 'bot', text: 'Hej! Välkommen till Axie Studio! 👋', delay: 1000 },
            { type: 'bot', text: 'Jag kan hjälpa dig att boka en tid för konsultation eller demo.', delay: 1500 },
            { type: 'bot', text: 'Vad kan jag hjälpa dig med idag?', delay: 1200 },
            
            { type: 'user', text: 'Hej! Jag skulle vilja boka en tid för en demo.', delay: 2000, simulateTyping: true },
            
            { type: 'bot', text: 'Perfekt! En demo är ett utmärkt sätt att se vad vi kan erbjuda.', delay: 1000 },
            { type: 'bot', text: 'Vilken typ av tjänst är du mest intresserad av?', delay: 1400 },
            
            { type: 'user', text: 'Jag är intresserad av webbutveckling och design.', delay: 2200, simulateTyping: true },
            
            { type: 'bot', text: 'Fantastiskt! Vi har stor expertis inom webbutveckling och modern design.', delay: 1200 },
            { type: 'bot', text: 'Vi kan hjälpa dig med allt från responsiva webbsidor till e-handelslösningar.', delay: 1600 },
            { type: 'bot', text: 'Hur stort är ditt projekt ungefär?', delay: 1300 },
            
            { type: 'user', text: 'Det är för mitt företag, vi behöver en ny hemsida och webshop.', delay: 2500, simulateTyping: true },
            
            { type: 'bot', text: 'Perfekt! Det låter som ett spännande projekt.', delay: 1100 },
            { type: 'bot', text: 'Vi har hjälpt många företag med liknande lösningar.', delay: 1400 },
            { type: 'bot', text: 'Låt mig öppna vårt bokningssystem så du kan välja en tid för en kostnadsfri konsultation! ✨', delay: 1800 }
        ];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Make input readonly initially
        this.messageInput.setAttribute('readonly', true);
        this.sendButton.style.pointerEvents = 'none';
        this.sendButton.style.opacity = '0.6';
    }
    
    startDemo() {
        this.chatButton.classList.add('active');
        
        setTimeout(() => {
            this.chatContainer.classList.add('active');
            setTimeout(() => {
                this.startConversation();
            }, 800);
        }, 500);
    }
    
    startConversation() {
        if (this.currentStep < this.conversation.length) {
            const message = this.conversation[this.currentStep];
            
            setTimeout(() => {
                if (message.type === 'user') {
                    this.simulateUserInteraction(message.text, message.simulateTyping);
                } else {
                    this.showBotMessage(message.text);
                }
            }, message.delay);
        }
    }
    
    simulateUserInteraction(text, shouldSimulateTyping = false) {
        if (shouldSimulateTyping) {
            this.simulateTyping(text, () => {
                this.addMessage(text, false);
                this.currentStep++;
                this.startConversation();
            });
        } else {
            this.addMessage(text, false);
            this.currentStep++;
            this.startConversation();
        }
    }
    
    simulateTyping(text, callback) {
        // Enable input for typing simulation
        this.messageInput.removeAttribute('readonly');
        this.messageInput.focus();
        this.messageInput.classList.add('user-typing');
        this.sendButton.style.opacity = '1';
        this.sendButton.style.pointerEvents = 'all';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                this.messageInput.value += text.charAt(i);
                i++;
                // Realistic typing speed with variation
                setTimeout(typeChar, 50 + Math.random() * 40);
            } else {
                // Simulate send button click
                setTimeout(() => {
                    this.sendButton.classList.add('sending');
                    this.messageInput.classList.add('sending');
                    
                    setTimeout(() => {
                        this.messageInput.value = '';
                        this.messageInput.setAttribute('readonly', true);
                        this.messageInput.classList.remove('user-typing', 'sending');
                        this.sendButton.classList.remove('sending');
                        this.sendButton.style.opacity = '0.6';
                        this.sendButton.style.pointerEvents = 'none';
                        callback();
                    }, 300);
                }, 500);
            }
        };
        typeChar();
    }
    
    showBotMessage(text) {
        this.showTypingIndicator();
        
        // Realistic bot response time
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(text, true);
            this.currentStep++;
            
            if (this.currentStep === this.conversation.length) {
                setTimeout(() => {
                    window.bookingController.openBookingSystem();
                }, 2000);
            } else {
                this.startConversation();
            }
        }, 1000 + Math.random() * 800);
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
        
        // Smooth scroll to bottom
        this.scrollToBottom();
        
        // Typewriter effect
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textContainer.textContent += text.charAt(i);
                i++;
                // Continuous scroll during typing
                this.scrollToBottom();
                setTimeout(typeWriter, isBot ? 20 : 15);
            }
        };
        
        setTimeout(typeWriter, 200);
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTo({
            top: this.chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    fadeOutChat() {
        this.chatContainer.classList.add('fade-out');
    }
}