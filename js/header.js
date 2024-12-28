function handleResize() {
	if (window.matchMedia('(max-width: 1023px)').matches) {
		if(100 < window.pageYOffset){
			header.style.backgroundColor = '#222222';
		}else{
			header.style.backgroundColor = '';
		};

		window.onscroll = function() {
			if(100 < window.pageYOffset){
				header.style.backgroundColor = '#222222';
			}else{
				header.style.backgroundColor = '';
			};
		};
	} else {
		if(250 < window.pageYOffset){
			header.style.backgroundColor = '#222222';
		}else{
			header.style.backgroundColor = '';
		};

		window.onscroll = function() {
			if(250 < window.pageYOffset){
				header.style.backgroundColor = '#222222';
			}else{
				header.style.backgroundColor = '';
			};
		};
	};
};
handleResize();