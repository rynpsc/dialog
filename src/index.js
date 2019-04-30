import defaults from './defaults';
import focusTrap from './focus-trap';

/**
 * @param {string} dialog - ID of the HTMLElement.
 * @param {string} main - ID of the HTMLElement.
 * @param {Object} options - Options object.
 */
export function dialog(dialog, main, options) {
	const elements = {
		main: document.getElementById(main),
		dialog: document.getElementById(dialog),
	};

	if (!elements.dialog) {
		throw new Error(`No element with the id "${dialog}"`);
	}

	if (!elements.main) {
		throw new Error(`No element with the id "${main}"`);
	}

	const config = Object.assign({}, defaults, options);
	const trap = focusTrap(elements.dialog, config.focus);

	let isOpen = false;
	let initiated = false;

	function onKeydown(event) {
		if (event.key === 'Escape') close();
	}

	/**
	 * Create
	 */
	function create() {
		const role = config.alert ? 'alertdialog' : 'dialog';
		const labeledby = document.getElementById(config.label);
		const attr = labeledby ? 'labeledby' : 'label';

		elements.main.setAttribute('aria-hidden', false);

		elements.dialog.setAttribute('role', role);
		elements.dialog.setAttribute('aria-modal', true);
		elements.dialog.setAttribute(`aria-${attr}`, config.label);
		elements.dialog.setAttribute('aria-hidden', true);

		if (document.getElementById(config.description)) {
			elements.dialog.setAttribute('aria-describedby', config.description);
		} else if (config.description) {
			throw new Error(`Invalid element: No element with the id "${config.description}"`);
		}

		if (elements.main.contains(elements.dialog)) {
			document.body.appendChild(elements.dialog);
		}

		initiated = true;

		dispatchEvent('create');
	}

	/**
	 * Open
	 */
	function open() {
		if (isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('open')) {
			return;
		}

		isOpen = true;

		elements.main.setAttribute('aria-hidden', true);
		elements.dialog.setAttribute('aria-hidden', false);

		elements.dialog.classList.add(config.openClass);

		document.addEventListener('keydown', onKeydown, true);

		trap.activate();
	}

	/**
	 * Close
	 */
	function close() {
		if (!isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('close')) {
			return;
		}

		trap.deactivate();

		isOpen = false;

		elements.main.setAttribute('aria-hidden', false);
		elements.dialog.setAttribute('aria-hidden', true);

		document.removeEventListener('keydown', onKeydown, true);

		elements.dialog.classList.remove(config.openClass);
	}

	/**
	 * Toggle Dialog display.
	 * @param {boolean} toggle - If true open, if false close.
	 */
	function toggle(toggle = !isOpen) {
		toggle ? open() : close();
	}

	/**
	 * Destroy
	 */
	function destroy() {
		const attributes = [
			'role',
			'aria-modal',
			'aria-label',
			'aria-labeledby',
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
		const event = new CustomEvent(name, {
			bubbles: true,
			cancelable: true,
		});

		return elements.dialog.dispatchEvent(event);
	}

	return { elements, create, destroy, open, close, toggle, isOpen, on, off };
}
