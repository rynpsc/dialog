import { FocusTrap } from '@rynpsc/focus-trap';
import defaults from './defaults';

export * as domapi from './dom-api';

export const instances = {};

/**
 * Get the dialog instance with the corresponding ID.
 *
 * @param {string} id ID of dialog element.
 * @returns {Object|null}
 */
export function getInstanceById(id) {
	if (id === undefined) {
		return null;
	}

	if (!instances.hasOwnProperty(id)) {
		return null;
	}

	return instances[id];
}

/**
 * @constructor
 * @param {string} dialog - ID of the HTMLElement.
 * @param {Object} options - Options object.
 * @returns {Object|null}
 */
export function dialog(dialog, options) {
	let isOpen = false;
	let initiated = false;

	let dialogElement = document.getElementById(dialog);

	if (!dialogElement) {
		return null;
	}

	// If an instance already exists return it.
	if (instances.hasOwnProperty(dialog)) {
		return instances[dialog];
	}

	const config = Object.assign({}, defaults, options);

	const trap = FocusTrap(dialogElement);

	/**
	 * @param {KeyboardEvent} event
	 */
	function onKeydown(event) {
		if (event.key === 'Escape') close();
	}

	function create() {
		if (initiated) {
			return false;
		}

		let role = config.alert ? 'alertdialog' : 'dialog';

		dialogElement.setAttribute('tabindex', -1);
		dialogElement.setAttribute('role', role);
		dialogElement.setAttribute('aria-modal', true);

		if (config.label) {
			let matchesID = document.getElementById(config.label);
			let attribute = matchesID ? 'aria-labelledby' : 'aria-label';

			dialogElement.setAttribute(attribute, config.label);
		}

		if (config.description && document.getElementById(config.description)) {
			dialogElement.setAttribute('aria-describedby', config.description);
		}

		initiated = true;

		dispatchEvent('create');
	}

	/**
	 * @param {HTMLElement} element - Element to set focus to.
	 */
	function open(element) {
		if (isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('open')) {
			return;
		}

		isOpen = true;
		dialogElement.classList.add(config.openClass);
		document.addEventListener('keydown', onKeydown, true);

		if (element === undefined) {
			element = dialogElement.querySelector('[data-dialog-autofocus]');
		}

		trap.activate(element);
	}

	/**
	 * @param {HTMLElement} element - Element to set focus to.
	 */
	function close(element) {
		if (!isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('close')) {
			return;
		}

		trap.deactivate(element);

		isOpen = false;
		document.removeEventListener('keydown', onKeydown, true);
		dialogElement.classList.remove(config.openClass);
	}

	/**
	 * Toggle Dialog display.
	 *
	 * @param {boolean} toggle - If true call `open()`, if false call `close()`.
	 */
	function toggle(toggle = !isOpen) {
		toggle ? open() : close();
	}

	function destroy() {
		if (!initiated) {
			return false;
		}

		let attributes = [
			'role',
			'tabindex',
			'aria-modal',
			'aria-label',
			'aria-labelledby',
			'aria-describedby',
		];

		close();
		initiated = false;
		attributes.forEach(attr => dialogElement.removeAttribute(attr));

		dispatchEvent('destroy');
	}

	/**
	 * Wrapper method to add an event listener.
	 *
	 * @param {string} type
	 * @param {function} handler
	 */
	function on(type, handler) {
		dialogElement.addEventListener(type, handler);
	}

	/**
	 * Wrapper method to remove an event listener.
	 *
	 * @param {string} type
	 * @param {function} handler
	 */
	function off(type, handler) {
		dialogElement.removeEventListener(type, handler);
	}

	/**
	 * Dispatches a custom event.
	 *
	 * @param {string} name - The event name.
	 * @returns {boolean} False if preventDefault() was called, true otherwise.
	 */
	function dispatchEvent(name) {
		let prefixedName = `dialog:${name}`;

		let event = new CustomEvent(prefixedName, {
			bubbles: true,
			cancelable: true,
		});

		return dialogElement.dispatchEvent(event);
	}

	const instance = {
		on,
		off,
		open,
		close,
		isOpen,
		initiated,
		create,
		toggle,
		destroy,
		element: dialogElement,
	};

	return instances[dialog] = instance;
}
