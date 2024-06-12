function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');

    const hamburger = document.querySelector('.hamburger');
    if (navLinks.classList.contains('show')) {
        hamburger.innerHTML = '&times;'; 
    } else {
        hamburger.innerHTML = '&#9776;';
    }
}


// From Start
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let isValid = true;

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const company = document.getElementById('company');
    const country = document.getElementById('country');

    resetValidation();

    if (!firstName.value.trim()) {
        showError(firstName, '<p>This field can’t be empty.</p><p>Please fill it in.</p>');
        isValid = false;
    }
    if (!lastName.value.trim()) {
        showError(lastName, '<p>This field can’t be empty.</p><p>Please fill it in.</p>');
        isValid = false;
    }
    if (!email.value.trim() || !validateEmail(email.value.trim())) {
        showError(email, '<p>This field can’t be empty.</p><p>Please fill it in.</p>');
        isValid = false;
    }
    if (!company.value.trim()) {
        showError(company, '<p>This field can’t be empty.</p><p>Please fill it in.</p>');
        isValid = false;
    }
    if (!country.value) {
        showError(country, '<p>This field can’t be empty.</p><p>Please fill it in.</p>');
        isValid = false;
    }

    if (isValid) {
        window.location.href = './pages/thanks.html';
    }
}

function resetValidation() {
    const containers = document.querySelectorAll('.input-container');
    containers.forEach(container => {
        container.classList.remove('error');
        const tooltip = container.querySelector('.error-tooltip');
        tooltip.textContent = '';
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });
}

function showError(inputElement, message) {
    const container = inputElement.closest('.input-container');
    const tooltip = container.querySelector('.error-tooltip');
    tooltip.innerHTML = message;
    container.classList.add('error');
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const inputs = document.querySelectorAll('.input-field');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        const container = input.closest('.input-container');
        container.classList.remove('error');
        const tooltip = container.querySelector('.error-tooltip');
        tooltip.textContent = '';
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });
});
// From end

// Testimonail Start
let currentSlideIndex = 0;
let isTransitioning = false;
const transitionDuration = 500;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    currentSlideIndex = (index + totalSlides) % totalSlides;

    const carouselInner = document.querySelector('.carousel-inner');
    const offset = -currentSlideIndex * 100;
    carouselInner.style.transition = 'transform 0.5s ease-in-out';
    carouselInner.style.transform = `translateX(${offset}%)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
    });
}

function moveSlide(direction) {
    if (isTransitioning) return;

    isTransitioning = true;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    let newSlideIndex = currentSlideIndex + direction;

    showSlide(newSlideIndex);

    setTimeout(() => {
        if (newSlideIndex >= totalSlides) {
            newSlideIndex = 0;
            jumpToSlide(newSlideIndex);
        } else if (newSlideIndex < 0) {
            newSlideIndex = totalSlides - 1;
            jumpToSlide(newSlideIndex);
        }
        isTransitioning = false;
    }, transitionDuration);
}

function jumpToSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const offset = -index * 100;
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = `translateX(${offset}%)`;
    setTimeout(() => {
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
}

function setCurrentSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;
    showSlide(index);
    setTimeout(() => {
        isTransitioning = false;
    }, transitionDuration);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlideIndex);
});

// Testimonail End

// Video Popup section Start
document.addEventListener('DOMContentLoaded', (event) => {
    // const videoActive = document.querySelector('.video_active');
    const videoPassive = document.querySelector('.video_passive');
    const videoPopup = document.getElementById('video_popup');
    const popupVideo = document.getElementById('popup_video');
    const closeButton = document.querySelector('.close_button');

    // videoActive.addEventListener('click', () => {
    //     videoPopup.style.display = 'block';
    //     popupVideo.play();
    // });

    videoPassive.addEventListener('click', () => {
        videoPopup.style.display = 'block';
        popupVideo.play();
    });

    closeButton.addEventListener('click', () => {
        videoPopup.style.display = 'none';
        popupVideo.pause();
        popupVideo.currentTime = 0;
    });

    window.addEventListener('click', (event) => {
        if (event.target === videoPopup) {
            videoPopup.style.display = 'none';
            popupVideo.pause();
            popupVideo.currentTime = 0;
        }
    });
});

// Video Popup section End