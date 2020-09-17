import { FocusTrap } from '@rynpsc/focus-trap';
import defaults from './defaults';

export { domapi } from './dom-api';

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

	const elements = {
		dialog: document.getElementById(dialog),
	};

	if (!elements.dialog) {
		return null;
	}

	// If an instance already exists return it.
	if (instances.hasOwnProperty(dialog)) {
		return instances[dialog];
	}

	const config = Object.assign({}, defaults, options);

	const trap = FocusTrap(elements.dialog);

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

		const role = config.alert ? 'alertdialog' : 'dialog';

		elements.dialog.setAttribute('tabindex', -1);
		elements.dialog.setAttribute('role', role);
		elements.dialog.setAttribute('aria-modal', true);

		if (config.label) {
			const matchesID = document.getElementById(config.label);
			const attribute = matchesID ? 'aria-labelledby' : 'aria-label';

			elements.dialog.setAttribute(attribute, config.label);
		}

		if (config.description && document.getElementById(config.description)) {
			elements.dialog.setAttribute('aria-describedby', config.description);
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
		elements.dialog.classList.add(config.openClass);
		document.addEventListener('keydown', onKeydown, true);

		if (element === undefined) {
			element = elements.dialog.querySelector('[data-dialog-autofocus]');
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
		elements.dialog.classList.remove(config.openClass);
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

		const attributes = [
			'role',
			'tabindex',
			'aria-modal',
			'aria-label',
			'aria-labelledby',
			'aria-describedby',
		];

		close();
		initiated = false;
		attributes.forEach(attr => elements.dialog.removeAttribute(attr));

		dispatchEvent('destroy');
	}

	/**
	 * Wrapper method to add an event listener.
	 *
	 * @param {string} type
	 * @param {function} handler
	 */
	function on(type, handler) {
		elements.dialog.addEventListener(type, handler);
	}

	/**
	 * Wrapper method to remove an event listener.
	 *
	 * @param {string} type
	 * @param {function} handler
	 */
	function off(type, handler) {
		elements.dialog.removeEventListener(type, handler);
	}

	/**
	 * Dispatches a custom event.
	 *
	 * @param {string} name - The event name.
	 * @returns {boolean} False if preventDefault() was called, true otherwise.
	 */
	function dispatchEvent(name) {
		const prefixedName = `dialog:${name}`;

		const event = new CustomEvent(prefixedName, {
			bubbles: true,
			cancelable: true,
		});

		return elements.dialog.dispatchEvent(event);
	}

	const instance = { on, off, open, close, isOpen, initiated, create, toggle, destroy, elements };

	return instances[dialog] = instance;
}
