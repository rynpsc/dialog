import { getInstanceById } from './index';

/**
 * Simple data attribute API for controling a dialog instance.
 */
export function domapi() {
	const openers = Array.from(document.querySelectorAll('[data-dialog-open]'));
	const closers = Array.from(document.querySelectorAll('[data-dialog-close]'));

	openers.forEach(opener => opener.addEventListener('click', () => {
		const instance = getInstanceById(opener.dataset.dialogOpen);

		if (instance) {
			instance.open(opener);
			event.preventDefault();
		}
	}));

	closers.forEach(closer => closer.addEventListener('click', () => {
		const instance = getInstanceById(closer.dataset.dialogClose);

		if (instance) {
			instance.close();
			event.preventDefault();
		}
	}));
}
