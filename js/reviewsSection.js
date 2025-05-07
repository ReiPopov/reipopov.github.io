let slider = document.querySelector('.review_1');
let section__4 = document.querySelector('.section__4');
let currentPage = 0;
const maxPages = 9;

// // Запуск автослайда
// let autoSlide = setInterval(reviewsToRight, 3000);

// // Наведение мышки — пауза
// section__4.addEventListener('mouseover', () => {
// 	clearInterval(autoSlide);
// });

// // Уход мышки — продолжение
// section__4.addEventListener('mouseleave', () => {
// 	autoSlide = setInterval(reviewsToRight, 3000);
// });

function reviewsToLeft() {
	if (currentPage > 0) {
		currentPage--;
		updateSlider();
	}
}

function reviewsToRight() {
	if (currentPage < maxPages) {
		currentPage++;
	} else {
		currentPage = 0;
	}
	updateSlider();
}

function updateSlider() {
	if (currentPage === 0) {
		slider.style.marginLeft = `0%`;
		checkRevLab()
	}else{
		if (window.matchMedia('(max-width: 1023px)').matches) {
			slider.style.marginLeft = `calc(-${currentPage * 350}px - ${currentPage * 20}px)`;
		}else{
			slider.style.marginLeft = `calc(-${currentPage * 100}% - ${currentPage * 20}px)`;
		}
		checkRevLab()
	}
}



for (let i = 0; i <= 9; i++) {
	document.querySelector(`.revLab${i}`).addEventListener('click', function(){
		checkRevLab()
		currentPage = i;
		updateSlider();
	})
}

function checkRevLab() {
	for (let i = currentPage; i <= currentPage; i++) {
		for(let j = 0; j <= 9; j++) {
			document.querySelector(`.revLab${j}`).style.backgroundColor = '#bdbdbd'
		}

		document.querySelector(`.revLab${i}`).style.backgroundColor = '#ffbe41'
	}
}