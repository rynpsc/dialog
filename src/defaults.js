/**
 * Default configuration.
 *
 * @property {string} label - ID of HTMLElement to use in aria-labelledby or a string to use as the aria-label.
 * @property {string} description - ID of HTMLElement to use in aria-describedby.
 * @property {boolean} alert - Set dialog role to alertdialog.
 * @property {string} openClass - The class applied to elements.dialog when open.
 */
const defaults = {
	description: '',
	label: 'Dialog',
	alert: false,
	openClass: 'is-open',
};

export default defaults;
