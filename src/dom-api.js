import { getInstanceById } from './index';

/**
 * Simple data attribute API for controling a dialog instance.
 */
export function domapi() {
	const openers = Array.from(document.querySelectorAll('[data-dialog-open]'));
	const closers = Array.from(document.querySelectorAll('[data-dialog-close]'));

	openers.forEach(element => element.addEventListener('click', event => {
		const instance = getInstanceById(element.dataset.dialogOpen);

		if (instance) {
			instance.open();
			event.preventDefault();
		}
	}));

	closers.forEach(element => element.addEventListener('click', event => {
		const instance = getInstanceById(element.dataset.dialogClose);

		if (instance) {
			instance.close();
			event.preventDefault();
		}
	}));
}
