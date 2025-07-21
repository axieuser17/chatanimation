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
        
        this.conversation = [
            { type: 'bot', text: 'Hej! Välkommen till Axie Studio! 👋', delay: 1500 },
            { type: 'bot', text: 'Jag kan hjälpa dig att boka en tid för konsultation eller demo.', delay: 2500 },
            { type: 'user', text: 'Hej! Jag skulle vilja boka en tid för en demo.', delay: 3000, simulateTyping: true },
            { type: 'bot', text: 'Perfekt! En demo är ett utmärkt sätt att se vad vi kan erbjuda.', delay: 2000 },
            { type: 'bot', text: 'Vilken typ av tjänst är du mest intresserad av?', delay: 2500 },
            { type: 'user', text: 'Jag är intresserad av webbutveckling och design.', delay: 3500, simulateTyping: true },
            { type: 'bot', text: 'Fantastiskt! Vi har stor expertis inom webbutveckling och modern design.', delay: 2000 },
            { type: 'bot', text: 'Låt mig öppna vårt bokningssystem så du kan välja en tid som passar dig! ✨', delay: 3000 }
        ];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Remove manual interaction - everything is automatic
        this.messageInput.setAttribute('readonly', true);
        this.sendButton.style.pointerEvents = 'none';
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
        this.messageInput.removeAttribute('readonly');
        this.messageInput.focus();
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                this.messageInput.value += text.charAt(i);
                i++;
                setTimeout(typeChar, 80 + Math.random() * 40); // Realistic typing speed
            } else {
                setTimeout(() => {
                    // Simulate send button click
                    this.sendButton.classList.add('sending');
                    setTimeout(() => {
                        this.messageInput.value = '';
                        this.messageInput.setAttribute('readonly', true);
                        this.sendButton.classList.remove('sending');
                        callback();
                    }, 300);
                }, 500);
            }
        };
        typeChar();
    }
    
    showBotMessage(text) {
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(text, true);
            this.currentStep++;
            
            if (this.currentStep === this.conversation.length) {
                setTimeout(() => {
                    window.bookingController.openBookingSystem();
                }, 2500);
            } else {
                this.startConversation();
            }
        }, 1500 + Math.random() * 1000); // Realistic bot response time
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
        
        // Typewriter effect
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textContainer.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, isBot ? 25 : 15);
            }
        };
        
        setTimeout(typeWriter, 200);
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