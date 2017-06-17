var defaults = {
	label: 'Dialog',
	description: '',
	focus: '',
	alert: false,
	onCreate: function onCreate(dialog, main) {},
	onOpen: function onOpen(dialog, main) {},
	onClose: function onClose(dialog, main) {},
	onDestroy: function onDestroy(dialog, main) {}
};

/**
 * List of selectors for elements that are focusable via the keyborad.
 */
var selectors = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

/**
 * Get a NodeList of all focusable child nodes
 * @param 	{HTMLElement} node
 * @return 	{NodeList}
 */
function getFocusableElements(node) {
	return node.querySelectorAll(selectors);
}

/**
 * Focuses the first focusable element within a node
 * @param {HTMLElement} node
 */
function focusFirstElement(node) {
	var nodes = node.querySelectorAll(selectors);
	nodes.length ? nodes[0].focus() : node.focus();
}

/**
 * Traps tab key within a given node
 * @param {HTMLElment} node
 */
function trapTabKey(node, event) {
	var activeElement = document.activeElement;
	var focusableElements = getFocusableElements(node);
	var firstTabStop = focusableElements[0];
	var lastTabStop = focusableElements[focusableElements.length - 1];

	if (event.shiftKey && activeElement === firstTabStop) {
		lastTabStop.focus();
		event.preventDefault();
	} else if (!event.shiftKey && activeElement === lastTabStop) {
		firstTabStop.focus();
		event.preventDefault();
	}
}

function Dialog(modal, main, options) {
	var mainElement = document.getElementById(main);
	var modalElement = document.getElementById(modal);
	var config = Object.assign({}, defaults, options);

	var isOpen = false;
	var initialFocusedElement = null;

	if (!mainElement) {
		throw new Error('No element with the id "' + main + '"');
	}

	if (!modalElement) {
		throw new Error('No element with the id "' + modal + '"');
	}

	function create() {
		var role = config.alert ? 'alertdialog' : 'dialog';

		modalElement.setAttribute('role', role);
		modalElement.setAttribute('tabindex', -1);
		modalElement.setAttribute('aria-modal', true);

		toggleAriaHidden(isOpen);

		var matchesID = document.getElementById(config.label);
		var attr = matchesID ? 'labeledby' : 'label';
		modalElement.setAttribute('aria-' + attr, config.label);

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
			trapTabKey(modalElement, event);
		}
	}

	function trapFocus(event) {
		if (!modalElement.contains(document.activeElement)) {
			event.preventDefault();
			focusFirstElement(modalElement);
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
			focusFirstElement(modalElement);
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

	function toggle() {
		var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !isOpen;

		toggle ? open() : close();
	}

	function onTransitionEnd(event) {
		if (event.propertyName === 'visibility') {
			setModalFocus();
			modalElement.removeEventListener('transitionend', onTransitionEnd);
		}
	}

	function destroy() {
		var modalAttrs = ['aria-describedby', 'aria-hidden', 'aria-label', 'aria-labeledby', 'aria-modal', 'role', 'tabindex'];

		modalAttrs.forEach(function (attr) {
			return modalElement.removeAttribute(attr);
		});

		mainElement.removeAttribute('aria-hidden');
		document.removeEventListener('keydown', onKeydown);
		document.removeEventListener('focus', trapFocus, true);

		if (typeof config.onDestroy === 'function') {
			config.onDestroy(modalElement, mainElement);
		}
	}

	create();

	return { create: create, open: open, close: close, toggle: toggle, isOpen: isOpen, destroy: destroy };
}

export default Dialog;
