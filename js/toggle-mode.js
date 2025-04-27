const toggle_mode = document.getElementById('toggle-mode')

let darkMode = localStorage.getItem('darkMode') === 'true';

function applyDarkMode() {
    toggle_mode.classList.remove('fa-sun');
    toggle_mode.classList.add('fa-moon');

    document.querySelector('.container').classList.add('darkMode');
    document.querySelector('body').classList.add('darkMode');

    document.querySelectorAll('.block__interactive').forEach(element => {
        element.classList.add('darkMode');
    });
}

function removeDarkMode() {
    toggle_mode.classList.add('fa-sun');
    toggle_mode.classList.remove('fa-moon');

    document.querySelector('.container').classList.remove('darkMode');
    document.querySelector('body').classList.remove('darkMode');

    document.querySelectorAll('.block__interactive').forEach(element => {
        element.classList.remove('darkMode');
    });
}

if (darkMode) {
    applyDarkMode();
} else {
    removeDarkMode();
}

toggle_mode.onclick = function() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);

    if (darkMode) {
        applyDarkMode();
    } else {
        removeDarkMode();
    }
}
