import defaults from './defaults';
import emitter from './emitter';
import focusTrap from './focus-trap';

function dialog(dialog, main, options) {

	const elements = {
		main: document.getElementById(main),
		dialog: document.getElementById(dialog),
	};

	let events = emitter();

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

		events.emit('create', elements.dialog);
	}

	/**
	 * Open
	 */
	function open() {
		if (isOpen || !initiated) return;

		isOpen = true;

		elements.main.setAttribute('aria-hidden', true);
		elements.dialog.setAttribute('aria-hidden', false);

		elements.dialog.classList.add(config.openClass);
		events.emit('open', elements.dialog);

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

		elements.main.setAttribute('aria-hidden', false);
		elements.dialog.setAttribute('aria-hidden', true);

		document.removeEventListener('keydown', onKeydown, true);

		elements.dialog.classList.remove(config.openClass);
		events.emit('close', elements.dialog);
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
		events.emit('destroy', elements.dialog);
	}

	if (config.autoInit) {
		create();
	}

	return { elements, create, destroy, open, close, toggle, isOpen, on: events.on, off: events.off };
}

export default dialog;
