window.addEventListener('DOMContentLoaded', () => {
	let params = new URLSearchParams(window.location.search);
	const id = params.get('id');
	if (id) {
		const block = document.getElementById(id);

		if (block) {
			block.click();

			const url = new URL(window.location);
			url.searchParams.delete('id');
			window.history.replaceState({}, document.title, url);
		}
	}
});
