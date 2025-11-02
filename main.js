document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm();
        });
    }

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            clearErrors();
        });
    }

    setupVideoControls();
});

function validateForm() {
    clearErrors();
    
    let isValid = true;
    
    const nev = document.getElementById('nev');
    const email = document.getElementById('email');
    const telefon = document.getElementById('telefon');
    const allatNeve = document.getElementById('allat-neve');
    const uzenet = document.getElementById('uzenet');
    const datum = document.getElementById('datum');
    const idopontTipus = document.querySelector('input[name="idopont-tipus"]:checked');
    
    if (!nev || nev.value.trim() === '') {
        showError('nev-error', 'A név mező kitöltése kötelező!');
        if (nev) {
            nev.classList.add('error');
        }
        isValid = false;
    } else {
        if (nev.value.length < 2) {
            showError('nev-error', 'A névnek legalább 2 karakternek kell lennie!');
            nev.classList.add('error');
            isValid = false;
        }
    }
    
    if (!email || email.value.trim() === '') {
        showError('email-error', 'Az email cím kitöltése kötelező!');
        if (email) {
            email.classList.add('error');
        }
        isValid = false;
    } else if (email && !isValidEmail(email.value)) {
        showError('email-error', 'Érvénytelen email cím formátum!');
        email.classList.add('error');
        isValid = false;
    }
    
    if (telefon && telefon.value.trim() !== '') {
        if (!isValidPhone(telefon.value)) {
            showError('telefon-error', 'Érvénytelen telefonszám formátum!');
            telefon.classList.add('error');
            isValid = false;
        }
    }
    
    if (!allatNeve || allatNeve.value.trim() === '') {
        showError('allat-neve-error', 'Az állat nevének megadása kötelező!');
        if (allatNeve) {
            allatNeve.classList.add('error');
        }
        isValid = false;
    }
    
    if (!uzenet || uzenet.value.trim() === '') {
        showError('uzenet-error', 'Az üzenet mező kitöltése kötelező!');
        if (uzenet) {
            uzenet.classList.add('error');
        }
        isValid = false;
    } else if (uzenet && uzenet.value.trim().length < 10) {
        showError('uzenet-error', 'Az üzenetnek legalább 10 karakternek kell lennie!');
        uzenet.classList.add('error');
        isValid = false;
    }
    
    if (!datum || datum.value === '') {
        showError('datum-error', 'A dátum kiválasztása kötelező!');
        if (datum) {
            datum.classList.add('error');
        }
        isValid = false;
    } else if (datum && datum.value !== '') {
        const selectedDate = new Date(datum.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('datum-error', 'A dátum nem lehet a múltban!');
            datum.classList.add('error');
            isValid = false;
        }
    }
    
    if (!idopontTipus) {
        showError('idopont-tipus-error', 'Kérjük válassz időpont típust!');
        isValid = false;
    }
    
    if (isValid) {
        alert('Az időpontfoglalás sikeresen elküldve!');
        document.getElementById('appointment-form').reset();
        clearErrors();
    }
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(function(field) {
        field.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

function setupVideoControls() {
    const video = document.getElementById('rendelo-video');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const volUpBtn = document.getElementById('vol-up');
    const volDownBtn = document.getElementById('vol-down');
    
    if (!video) return;
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (video) {
                video.play();
            }
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            if (video) {
                video.pause();
            }
        });
    }
    
    if (volUpBtn) {
        volUpBtn.addEventListener('click', function() {
            if (video && video.volume < 1) {
                video.volume = Math.min(1, video.volume + 0.1);
            }
        });
    }
    
    if (volDownBtn) {
        volDownBtn.addEventListener('click', function() {
            if (video && video.volume > 0) {
                video.volume = Math.max(0, video.volume - 0.1);
            }
        });
    }
}

const nevInput = document.getElementById('nev');
if (nevInput) {
    nevInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.remove('error');
            document.getElementById('nev-error').textContent = '';
        }
    });
}

const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '' && isValidEmail(this.value)) {
            this.classList.remove('error');
            document.getElementById('email-error').textContent = '';
        }
    });
}

const uzenetInput = document.getElementById('uzenet');
if (uzenetInput) {
    uzenetInput.addEventListener('input', function() {
        if (this.value.trim() !== '' && this.value.trim().length >= 10) {
            this.classList.remove('error');
            document.getElementById('uzenet-error').textContent = '';
        }
    });
}

const datumInput = document.getElementById('datum');
if (datumInput) {
    datumInput.addEventListener('change', function() {
        if (this.value !== '') {
            this.classList.remove('error');
            document.getElementById('datum-error').textContent = '';
        }
    });
}



const existingP = document.querySelector('p');
if (existingP) {
    existingP.style.color = '#4caf50';
}

