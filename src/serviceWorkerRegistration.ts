export function register() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register(`${process.env.REACT_APP_APP_URL}/service-worker.js`);
		});
	}
}