export function register() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register(`http://localhost:8092/service-worker.js`);
		});
	}
}