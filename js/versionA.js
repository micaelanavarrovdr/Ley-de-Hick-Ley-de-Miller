let currentStep = 1;

function updateProgressBar() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');

        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

function showStep(step) {
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
    updateProgressBar();
}

function nextStep() {
    if (currentStep < 3) {
        showStep(currentStep + 1);
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function continueShopping() {
    window.location.href = 'index.html';
}


function clearErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
}

function validateShippingForm() {
    clearErrors();
    let isValid = true;

    const fullName = document.getElementById('fullName').value.trim();
    const address = document.getElementById('address').value.trim();
    const number = document.getElementById('number').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!fullName) {
        document.getElementById('fullNameError').textContent = 'El nombre es requerido';
        isValid = false;
    }

    if (!address) {
        document.getElementById('addressError').textContent = 'La dirección es requerida';
        isValid = false;
    }

    if (!number) {
        document.getElementById('numberError').textContent = 'El número es requerido';
        isValid = false;
    }

    if (!postalCode) {
        document.getElementById('postalCodeError').textContent = 'El código postal es requerido';
        isValid = false;
    }

    if (!phone) {
        document.getElementById('phoneError').textContent = 'El teléfono es requerido';
        isValid = false;
    }

    return isValid;
}

function validateAndNext() {
    if (validateShippingForm()) {
        nextStep();
    }
}

// Formateo y detección de tarjeta
function formatCardNumber(value) {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
}

function detectCardType(number) {
    const cleanNumber = number.replace(/\s/g, '');

    if (/^4/.test(cleanNumber)) {
        return 'visa';
    } else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
        return 'mastercard';
    }
    return '';
}

function formatExpiry(value) {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 2) {
        return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
    }
    return cleanValue;
}

// Event listeners para formateo
document.getElementById('cardNumber').addEventListener('input', function (e) {
    const formatted = formatCardNumber(e.target.value);
    e.target.value = formatted;

    const cardType = detectCardType(formatted);
    const cardIcon = document.getElementById('cardIcon');
    cardIcon.className = 'card-icon ' + cardType;
});

document.getElementById('expiry').addEventListener('input', function (e) {
    e.target.value = formatExpiry(e.target.value);
});

document.getElementById('cvc').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

document.getElementById('dni').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

function validatePaymentForm() {
    clearErrors();
    let isValid = true;

    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardHolder = document.getElementById('cardHolder').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvc = document.getElementById('cvc').value.trim();

    if (!cardNumber || cardNumber.length < 13) {
        document.getElementById('cardNumberError').textContent = 'Número de tarjeta inválido';
        isValid = false;
    }

    if (!cardHolder) {
        document.getElementById('cardHolderError').textContent = 'El titular es requerido';
        isValid = false;
    }

    if (!dni || dni.length < 7) {
        document.getElementById('dniError').textContent = 'DNI inválido';
        isValid = false;
    }

    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
        document.getElementById('expiryError').textContent = 'Fecha de vencimiento inválida';
        isValid = false;
    }

    if (!cvc || cvc.length < 3) {
        document.getElementById('cvcError').textContent = 'CVC inválido';
        isValid = false;
    }

    return isValid;
}

function processPayment() {
    if (validatePaymentForm()) {
        // Simular procesamiento de pago
        const btn = event.target;
        btn.textContent = 'Procesando...';
        btn.disabled = true;

        setTimeout(() => {
            alert('¡Pago procesado exitosamente! Gracias por tu compra.');
            btn.textContent = 'Pagar $89.400,00';
            btn.disabled = false;
        }, 2000);
    }
}

// Inicializar
updateProgressBar();
