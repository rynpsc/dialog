/**
 * Default configuration.
 *
 * @property {string} label - ID of HTMLElement to use as label or a string.
 * @property {string} description - ID of HTMLElement to use as aria-describedby.
 * @property {boolean} alert - Set dialog role to alertdialog.
 * @property {string} openClass - The class applied to elements.dialog when open.
 */
const defaults = {
	label: 'Dialog',
	description: '',
	alert: false,
	openClass: 'is-open',
};

export default defaults;
