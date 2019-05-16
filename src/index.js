import defaults from './defaults';
import focusTrap from './focus-trap';

/**
 * @param {string} dialog - ID of the HTMLElement.
 * @param {string} main - ID of the HTMLElement.
 * @param {Object} options - Options object.
 */
export function dialog(dialog, main, options) {
	let isOpen = false;
	let initiated = false;

	const elements = {
		triggeringElement: undefined,
		main: document.getElementById(main),
		dialog: document.getElementById(dialog),
	};

	if (!elements.dialog || !elements.main) {
		return;
	}

	}

	const config = Object.assign({}, defaults, options);

	const trap = focusTrap(elements.dialog);

	function onKeydown(event) {
		if (event.key === 'Escape') close();
	}

	/**
	 * Create
	 */
	function create() {
		const role = config.alert ? 'alertdialog' : 'dialog';

		elements.dialog.setAttribute('role', role);
		elements.dialog.setAttribute('aria-modal', true);

		if (config.label) {
			// If the label matches an ID use the element as the label.
			const labeledby = document.getElementById(config.label);
			const attribute = labeledby ? 'labelledby' : 'label';

			elements.dialog.setAttribute(`aria-${attribute}`, config.label);
		}

		if (config.description && document.getElementById(config.description)) {
			elements.dialog.setAttribute('aria-describedby', config.description);
		}

		initiated = true;

		dispatchEvent('create');
	}

	/**
	 * Open
	 */
	function open(element) {
		if (isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('open')) {
			return;
		}

		if (element instanceof HTMLElement) {
			elements.triggeringElement = element;
		}

		isOpen = true;
		elements.dialog.classList.add(config.openClass);
		document.addEventListener('keydown', onKeydown, true);

		trap.activate(elements.dialog.querySelector('[data-dialog-autofocus]'));
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

		trap.deactivate(elements.triggeringElement);

		isOpen = false;
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

	return { elements, create, destroy, open, close, toggle, isOpen, on, off };
}
