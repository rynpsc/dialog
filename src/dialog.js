import defaults from './defaults';
import * as Utils from './utils';

function Dialog(modal, main, options) {
	const mainElement = document.getElementById(main);
	const modalElement = document.getElementById(modal);
	const config = Object.assign({}, defaults, options);

	let isOpen = false;
	let initialFocusedElement = null;

	if (!mainElement) {
		throw new Error(`No element with the id "${main}"`);
	}

	if (!modalElement) {
		throw new Error(`No element with the id "${modal}"`);
	}

	function create() {
		const role = config.alert ? 'alertdialog' : 'dialog';

		modalElement.setAttribute('role', role);
		modalElement.setAttribute('tabindex', -1);
		modalElement.setAttribute('aria-modal', true);

		toggleAriaHidden(isOpen);

		let matchesID = document.getElementById(config.label);
		let attr = matchesID ? 'labeledby' : 'label';
		modalElement.setAttribute(`aria-${attr}`, config.label);

		if (document.getElementById(config.description)) {
			modalElement.setAttribute('aria-describedby', config.description);
		}

		if (mainElement.contains(modalElement)) {
			document.body.appendChild(modalElement);
		}

		if (typeof config.onCreate === 'function') {
			config.onCreate(modalElement, mainElement);
		}
	}

	function onKeydown(event) {
		if (event.key === 'Escape' && isOpen) {
			close();
		}

		if (event.key === 'Tab' && isOpen) {
			Utils.trapTabKey(modalElement, event);
		}
	}

	function trapFocus(event) {
		if (!modalElement.contains(document.activeElement)) {
			event.preventDefault();
			Utils.focusFirstElement(modalElement);
		}
	}

	function toggleAriaHidden(toggle) {
		mainElement.setAttribute('aria-hidden', toggle);
		modalElement.setAttribute('aria-hidden', !toggle);
	}

	function setModalFocus() {
		if (config.focus instanceof HTMLElement && modalElement.contains(config.focus)) {
			config.focus.focus();
		} else {
			Utils.focusFirstElement(modalElement);
		}
	}

	function open() {
		if (isOpen) return;

		isOpen = true;
		toggleAriaHidden(isOpen);

		initialFocusedElement = document.activeElement;

		setModalFocus();

		if (!modalElement.contains(document.activeElement)) {
			modalElement.addEventListener('transitionend', onTransitionEnd);
		}

		document.addEventListener('keydown', onKeydown);
		document.addEventListener('focus', trapFocus, true);

		if (typeof config.onOpen === 'function') {
			config.onOpen(modalElement, mainElement);
		}
	}

	function close() {
		if (!isOpen) return;

		isOpen = false;
		toggleAriaHidden(isOpen);

		document.removeEventListener('keydown', onKeydown);
		document.removeEventListener('focus', trapFocus, true);

		initialFocusedElement.focus();
		initialFocusedElement = null;

		if (typeof config.onClose === 'function') {
			config.onClose(modalElement, mainElement);
		}
	}

	function toggle(toggle = !isOpen) {
		toggle ? open() : close();
	}

	function onTransitionEnd(event) {
		if (event.propertyName === 'visibility') {
			setModalFocus();
			modalElement.removeEventListener('transitionend', onTransitionEnd);
		}
	}

	function destroy() {
		let modalAttrs = [ 'aria-describedby', 'aria-hidden', 'aria-label', 'aria-labeledby', 'aria-modal', 'role', 'tabindex' ];

		modalAttrs.forEach(attr => modalElement.removeAttribute(attr));

		mainElement.removeAttribute('aria-hidden');
		document.removeEventListener('keydown', onKeydown);
		document.removeEventListener('focus', trapFocus, true);

		if (typeof config.onDestroy === 'function') {
			config.onDestroy(modalElement, mainElement);
		}
	}

	create();

	return { create, open, close, toggle, isOpen, destroy }

};

export default Dialog;
