import selectors from './selectors';

/**
 * Get a NodeList of all focusable child nodes
 * @param 	{HTMLElement} node
 * @return 	{NodeList}
 */
export function getFocusableElements(node) {
	return node.querySelectorAll(selectors);
}

/**
 * Focuses the first focusable element within a node
 * @param {HTMLElement} node
 */
export function focusFirstElement(node) {
	const nodes = node.querySelectorAll(selectors);
	nodes.length ? nodes[0].focus() : node.focus();
}

/**
 * Traps tab key within a given node
 * @param {HTMLElment} node
 */
export function trapTabKey(node, event) {
	const activeElement = document.activeElement;
	const focusableElements = getFocusableElements(node);
	const firstTabStop = focusableElements[0];
	const lastTabStop = focusableElements[focusableElements.length - 1];

	if (event.shiftKey && activeElement === firstTabStop) {
		lastTabStop.focus();
		event.preventDefault();
	} else if (!event.shiftKey && activeElement === lastTabStop) {
		firstTabStop.focus();
		event.preventDefault();
	}
}
