const selectors = [
	'input',
	'select',
	'textarea',
	'button',
	'iframe',
	'a[href]',
	'area[href]',
	'audio[controls]',
	'video[controls]',
	'[contenteditable]:not([contenteditable="false"])',
];

/**
 *	Checks if an element appears in the tab order.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isTabbable(element) {
	if (isRadio(element) && !isFocusableRadio(element)) {
		return false;
	}

	let tabindex = parseInt(element.getAttribute('tabindex'), 10);

	if (tabindex && tabindex < 0) {
		return false;
	}

	return  (
		!element.hidden &&
		!element.disabled &&
		!(element.offsetParent === null || getComputedStyle(element).visibility === 'hidden')
	);
}

function focus(element) {
	if (element && element instanceof HTMLElement && element.focus) {
		element.focus();
	}
}

/**
 *	Checks if an element is a radio button.

 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isRadio(element) {
	return (element.tagName === 'INPUT' || element.type === 'radio');
}

/**
 * Checks if a radio button is focusable. A radio is focusable if either no
 * radio within the group is checked or the radio is the checked option in
 * a group.
 *
 * @param {HTMLElement} element The element to check.
 * @returns {boolean}
 */
function isFocusableRadio(element) {
	let inputs = Array.from(document.getElementsByName(element.name));
	let hasCheckedOption = inputs.some(input => input.checked);

	if (!hasCheckedOption) {
		return true;
	}

	return element.checked;
}

/**
 * Gets the focusable child elements within a given element.
 *
 * @param {HTMLElement} element
 * @returns {Array}
 */
function getFocusableElements(element) {
	return Array.from(element.querySelectorAll(selectors))
		.filter(elem => isTabbable(elem));
}

/**
 *	Focus the focusable child element within a given element.
 *
 * @param {HTMLElement} element
 */
function focusFirstElement(element) {
	const nodes = getFocusableElements(element);

	if (nodes.length) {
		focus(nodes[0]);
	}
}

/**
 *	Focus trap constructor.
 *
 * @param {HTMLElement} element
 */
function focusTrap(element) {
	let trapActivated = false;

	/**
	 * Activate the tab trap.
	 */
	function activate(element) {
		if (trapActivated) {
			return;
		}

		focus(element);
		trapActivated = true;

		document.addEventListener('focusin', onFocus, true);
		document.addEventListener('keydown', onKeydown, true);
	}

	/**
	 * Deactivate the tab trap.
	 */
	function deactivate(element) {
		if (!trapActivated) {
			return;
		}

		document.removeEventListener('focusin', onFocus, true);
		document.removeEventListener('keydown', onKeydown, true);

		focus(element);
		trapActivated = false;
	}

	/**
	 *
	 * @param {FocusEvent} event
	 */
	function onFocus(event) {
		const focusLost = !element.contains(document.activeElement);

		event.preventDefault();
		event.stopImmediatePropagation();

		if (focusLost && trapActivated) {
			focusFirstElement(element);
		}
	}

	/**
	 * Handle keydown event.
	 *
	 * @param {KeyboardEvent} event
	 */
	function onKeydown(event) {
		if (event.key === 'Tab') {
			trapTab(element, event);
		}

		/**
		 *
		 * @param {HTMLElement} element
		 * @param {KeyboardEvent} event
		 */
		function trapTab(element, event) {
			const activeElement = document.activeElement;

			const elements = getFocusableElements(element);
			const firstTabStop = elements[0];
			const lastTabStop = elements[elements.length - 1];

			if (event.shiftKey && (activeElement == firstTabStop)) {
				focus(lastTabStop);
				event.preventDefault();
			}

			if (!event.shiftKey && (activeElement == lastTabStop)) {
				focus(firstTabStop);
				event.preventDefault();
			}
		}
	}

	return { activate, deactivate };
}

export default focusTrap;
