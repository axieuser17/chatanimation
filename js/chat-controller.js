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
        
        // Fast-paced conversation flow
        this.conversation = [
            { type: 'bot', text: 'Hej! Välkommen till Axie Studio! 👋', delay: 800 },
            { type: 'bot', text: 'Jag kan hjälpa dig att boka en tid för konsultation eller demo.', delay: 1200 },
            { type: 'user', text: 'Hej! Jag skulle vilja boka en tid för en demo.', delay: 1500, simulateTyping: true },
            { type: 'bot', text: 'Perfekt! En demo är ett utmärkt sätt att se vad vi kan erbjuda.', delay: 1000 },
            { type: 'bot', text: 'Vilken typ av tjänst är du mest intresserad av?', delay: 1200 },
            { type: 'user', text: 'Jag är intresserad av webbutveckling och design.', delay: 1800, simulateTyping: true },
            { type: 'bot', text: 'Fantastiskt! Vi har stor expertis inom webbutveckling och modern design.', delay: 1000 },
            { type: 'bot', text: 'Låt mig öppna vårt bokningssystem så du kan välja en tid! ✨', delay: 1500 }
        ];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Make input readonly initially
        this.messageInput.setAttribute('readonly', true);
        this.sendButton.style.pointerEvents = 'none';
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
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                this.messageInput.value += text.charAt(i);
                i++;
                // Fast typing speed
                setTimeout(typeChar, 40 + Math.random() * 20);
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
                        callback();
                    }, 200);
                }, 300);
            }
        };
        typeChar();
    }
    
    showBotMessage(text) {
        this.showTypingIndicator();
        
        // Fast bot response time
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(text, true);
            this.currentStep++;
            
            if (this.currentStep === this.conversation.length) {
                setTimeout(() => {
                    window.bookingController.openBookingSystem();
                }, 1500);
            } else {
                this.startConversation();
            }
        }, 800 + Math.random() * 400);
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
        
        // Fast typewriter effect
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textContainer.textContent += text.charAt(i);
                i++;
                // Fast typewriter speed
                setTimeout(typeWriter, isBot ? 15 : 10);
            }
        };
        
        setTimeout(typeWriter, 100);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    fadeOutChat() {
        this.chatContainer.classList.add('fade-out');
    }
}