import { getInstanceById } from './index';

/**
 * Simple data attribute API for controling a dialog instance.
 */
export function domapi() {
	const openers = Array.from(document.querySelectorAll('[data-open-dialog]'));
	const closers = Array.from(document.querySelectorAll('[data-close-dialog]'));

	openers.forEach(opener => opener.addEventListener('click', () => {
		const instance = getInstanceById(opener.dataset.openDialog);

		if (instance) {
			instance.open(opener);
		}
	}));

	closers.forEach(closer => closer.addEventListener('click', () => {
		const instance = getInstanceById(closer.dataset.closeDialog);

		if (instance) {
			instance.close();
		}
	}));
}
