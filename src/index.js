import defaults from './defaults';
import * as Emitter from './emitter';
import focusTrap from './focus-trap';

function dialog(dialog, main, options) {

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

		elements.dialog.setAttribute('role', role);
		elements.dialog.setAttribute('aria-modal', true);
		elements.dialog.setAttribute(`aria-${attr}`, config.label);

		if (document.getElementById(config.description)) {
			elements.dialog.setAttribute('aria-describedby', config.description);
		} else if (config.description) {
			throw new Error(`Invalid element: No element with the id "${config.description}"`);
		}

		initiated = true;

		Emitter.emit('create', elements.dialog);
	}

	/**
	 * Open
	 */
	function open() {
		if (isOpen || !initiated) return;

		isOpen = true;

		elements.dialog.classList.add(config.openClass);
		Emitter.emit('open', elements.dialog);

		document.addEventListener('keydown', onKeydown, true);

		trap.activate();
	}

	/**
	 * Close
	 */
	function close() {
		if (!isOpen || !initiated) return;

		trap.deactivate();

		isOpen = false;

		document.removeEventListener('keydown', onKeydown, true);

		elements.dialog.classList.remove(config.openClass);
		Emitter.emit('close', elements.dialog);
	}

	/**
	 * Toggle
	 */
	function toggle(toggle = !isOpen) {
		toggle ? open() : close();
	}

	/**
	 * Destroy
	 */
	function destroy() {
		const attributes = [ 'aria-describedby', 'aria-label', 'aria-labeledby', 'aria-modal', 'role' ];

		close();
		initiated = false;
		attributes.forEach(attr => elements.dialog.removeAttribute(attr));
		Emitter.emit('destroy', elements.dialog);
	}

	if (config.autoInit) {
		create();
	}

	return { elements, create, destroy, open, close, toggle, isOpen, on: Emitter.on, off: Emitter.off };
}

export default dialog;
