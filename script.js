function parallax() {
    var scrolled = window.pageYOffset;
    var parallax = document.querySelector('.parallex');
    var speed = 0.5;
    if (parallax) {
        parallax.style.backgroundPositionY = (scrolled * speed) + 'px';
    }
}

window.addEventListener('scroll', parallax);

document.querySelector('.scroll-down a').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#next-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

const gallery = document.querySelector('.gallery');
if (gallery) {
    let clone = gallery.innerHTML;

    function resetAnimation() {
        gallery.style.animation = 'none';
        gallery.innerHTML = clone; // Reset innerHTML to original
        void gallery.offsetWidth; // Trigger reflow
        gallery.style.animation = 'slide 10s infinite linear';
    }

    gallery.addEventListener('animationiteration', resetAnimation);
}

document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter span');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const speed = 200;
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;

    function showNextQuote() {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }

    quotes[currentQuote].classList.add('active');
    setInterval(showNextQuote, 5000);
});
