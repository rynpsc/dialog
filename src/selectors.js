/**
 * List of selectors for elements that are focusable via the keyborad.
 */
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
	'textarea:not([disabled])',
];

export default selectors;
