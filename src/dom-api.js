import { getInstanceById } from './index';

export let openers;
export let closers;

export function mount() {
	openers = Array.from(document.querySelectorAll('[data-dialog-open]'));
	closers = Array.from(document.querySelectorAll('[data-dialog-close]'));

	openers.forEach(element => element.addEventListener('click', open));
	closers.forEach(element => element.addEventListener('click', close));
};

export function unmount() {
	openers = [];
	closers = [];

	openers.forEach(element => element.removeEventListener('click', open));
	closers.forEach(element => element.removeEventListener('click', close));
}

function open(event) {
	let instance = getInstanceById(event.currentTarget.dataset.dialogOpen);

	if (instance) {
		instance.open();
		event.preventDefault();
	}
}

function close(event) {
	let instance = getInstanceById(event.currentTarget.dataset.dialogClose);

	if (instance) {
		instance.close();
		event.preventDefault();
	}
}
