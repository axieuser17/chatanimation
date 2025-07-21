class BookingController {
    constructor() {
        this.bookingSystem = document.getElementById('bookingSystem');
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentStep = 0;
        this.isAnimating = false;
        
        this.bookingFlow = [
            { step: 1, delay: 1000 },
            { step: 'selectDate', delay: 2500, value: '2024-01-17' },
            { step: 2, delay: 1500 },
            { step: 'selectTime', delay: 2000, value: '13:00' },
            { step: 3, delay: 1500 },
            { step: 'fillForm', delay: 2000 },
            { step: 'confirm', delay: 3000 }
        ];
    }
    
    openBookingSystem() {
        window.chatController.fadeOutChat();
        
        setTimeout(() => {
            this.bookingSystem.classList.add('active');
            setTimeout(() => {
                this.startAutomaticBooking();
            }, 800);
        }, 800);
    }
    
    startAutomaticBooking() {
        if (this.currentStep < this.bookingFlow.length) {
            const action = this.bookingFlow[this.currentStep];
            
            setTimeout(() => {
                this.executeBookingAction(action);
            }, action.delay);
        }
    }
    
    executeBookingAction(action) {
        switch (action.step) {
            case 1:
                this.animateBookingStep(1);
                break;
            case 'selectDate':
                this.autoSelectDate(action.value);
                break;
            case 2:
                this.animateBookingStep(2);
                break;
            case 'selectTime':
                this.autoSelectTime(action.value);
                break;
            case 3:
                this.animateBookingStep(3);
                break;
            case 'fillForm':
                this.autoFillForm();
                break;
            case 'confirm':
                this.autoConfirmBooking();
                break;
        }
        
        this.currentStep++;
        this.startAutomaticBooking();
    }
    
    animateBookingStep(stepNumber) {
        const step = document.getElementById(`step${stepNumber}`);
        if (step) {
            step.classList.add('active');
        }
    }
    
    autoSelectDate(date) {
        const dateOptions = document.querySelectorAll('.date-option');
        const targetOption = Array.from(dateOptions).find(option => 
            option.textContent.includes('17 Jan')
        );
        
        if (targetOption) {
            // Add hover effect first
            targetOption.classList.add('hover-effect');
            
            setTimeout(() => {
                targetOption.classList.remove('hover-effect');
                this.selectDate(targetOption, date);
            }, 800);
        }
    }
    
    autoSelectTime(time) {
        const timeOptions = document.querySelectorAll('.time-option');
        const targetOption = Array.from(timeOptions).find(option => 
            option.textContent === time
        );
        
        if (targetOption) {
            targetOption.classList.add('hover-effect');
            
            setTimeout(() => {
                targetOption.classList.remove('hover-effect');
                this.selectTime(targetOption, time);
            }, 800);
        }
    }
    
    autoFillForm() {
        const formData = [
            { id: 'name', value: 'Anna Andersson', delay: 0 },
            { id: 'email', value: 'anna.andersson@email.com', delay: 1200 },
            { id: 'phone', value: '070-123 45 67', delay: 2400 }
        ];
        
        formData.forEach(field => {
            setTimeout(() => {
                this.typeInField(field.id, field.value);
            }, field.delay);
        });
    }
    
    typeInField(fieldId, value) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        field.focus();
        field.classList.add('typing');
        
        let i = 0;
        const typeChar = () => {
            if (i < value.length) {
                field.value += value.charAt(i);
                i++;
                setTimeout(typeChar, 60 + Math.random() * 40);
            } else {
                field.classList.remove('typing');
                field.blur();
            }
        };
        
        setTimeout(typeChar, 200);
    }
    
    autoConfirmBooking() {
        const confirmButton = document.querySelector('.confirm-button');
        if (confirmButton) {
            confirmButton.classList.add('hover-effect');
            
            setTimeout(() => {
                confirmButton.classList.remove('hover-effect');
                confirmButton.classList.add('confirming');
                
                setTimeout(() => {
                    this.completeBooking();
                }, 1000);
            }, 800);
        }
    }
    
    completeBooking() {
        // Add success animation
        this.bookingSystem.classList.add('booking-success');
        
        setTimeout(() => {
            this.bookingSystem.classList.add('fade-out');
            
            setTimeout(() => {
                window.paperPlaneAnimation.startAnimation();
            }, 1000);
        }, 2000);
    }
    
    selectDate(element, date) {
        document.querySelectorAll('.date-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedDate = date;
    }
    
    selectTime(element, time) {
        document.querySelectorAll('.time-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedTime = time;
    }
}