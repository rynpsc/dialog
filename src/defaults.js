const defaults = {
	label: 'Dialog',
	description: '',
	focus: '',
	alert: false,
	onCreate: (dialog, main) => {},
	onOpen: (dialog, main) => {},
	onClose: (dialog, main) => {},
	onDestroy: (dialog, main) => {},
	autoInit: true,
};

export default defaults;
