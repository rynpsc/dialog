const selectors = [
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])',
	'a[href]',
	'area[href]',
	'button:not([disabled])',
	'embed',
	'iframe',
	'input:not([disabled])',
	'object',
	'select:not([disabled])',
	'textarea:not([disabled])'
];

function isVisible(element) {
	const isHidden = !(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	const isInvisible = window.getComputedStyle(element).visibility === 'hidden';

	return !(isHidden || isInvisible);
}

function getFocusableElements(node) {
	return [...node.querySelectorAll(selectors)].filter(elem => isVisible(elem));
}

function focus(node) {
	if (node && node.focus) node.focus();
}

function focusFirstElement(node) {
	const nodes = getFocusableElements(node);
	if (nodes.length) focus(nodes[0]);
}

function trapTab(element, event) {
	const activeElement = document.activeElement;

	const elements = getFocusableElements(element);
	const firstTabStop = elements[0];
	const lastTabStop = elements[elements.length - 1];

	if (event.shiftKey && activeElement === firstTabStop) {
		focus(lastTabStop);
		event.preventDefault();
	}

	if (!event.shiftKey && activeElement === lastTabStop) {
		focus(firstTabStop);
		event.preventDefault();
	}
}

function focusTrap(element, initialElement) {
	let trapActivated = false;
	let initialActiveElement = undefined;

	function onFocus(event) {
		const focusLost = !element.contains(document.activeElement);
		event.preventDefault();
		event.stopImmediatePropagation();
		if (focusLost && trapActivated) focusFirstElement(element);
	}

	function onKeydown(event) {
		if (event.key === 'Tab') trapTab(element, event);
	}

	function activate() {
		if (trapActivated) return;

		trapActivated = true;
		initialActiveElement = document.activeElement;

		if (initialElement && element.contains(initialElement)) {
			focus(initialElement);
		} else {
			focusFirstElement(element);
		}

		document.addEventListener('focus', onFocus, true);
		document.addEventListener('keydown', onKeydown, true);
	}

	function deactivate() {
		if (!trapActivated) return;

		trapActivated = false;
		focus(initialActiveElement);
		initialActiveElement = undefined;

		document.removeEventListener('focus', onFocus, true);
		document.removeEventListener('keydown', onKeydown, true);
	}

	return { activate, deactivate }

}

export default focusTrap;
