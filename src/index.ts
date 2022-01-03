import { FocusTrap } from '@rynpsc/focus-trap';

type FocusTarget = HTMLElement | undefined | null;

interface Options {
	alert: boolean;
	description: string | undefined;
	label: string;
	manageFocus: boolean;
	openClass: string;
}

interface EventMap {
	'open': DialogEvent;
	'close': DialogEvent;
	'create': DialogEvent;
	'destroy': DialogEvent;
}

interface DialogEvent extends CustomEvent {
	detail: { id: string }
}

export interface EventFunctionSignature {
	<K extends keyof EventMap>(type: K, listener: (this: HTMLElement, ev: EventMap[K]) => any): void;
}

interface Dialog {
	on: EventFunctionSignature;
	off: EventFunctionSignature;
	create(): void;
	destroy(): void;
	toggle(toggle: boolean): void;
	open(element?: FocusTarget, scroll?: boolean): void;
	close(element?: FocusTarget, scroll?: boolean): void;
	isOpen: boolean;
	initiated: boolean;
	element: HTMLElement;
	id: string;
}

export * as domapi from './dom-api';

const defaults: Options = {
	alert: false,
	description: undefined,
	label: 'Dialog',
	manageFocus: true,
	openClass: 'is-open',
};

export const instances: {
	[id: string]: Dialog | undefined
} = {};

/**
 * Get the dialog instance with the corresponding ID.
 *
 * @param id ID of dialog element.
 */
export function getInstanceById(id: string) {
	if (id === undefined) {
		return null;
	}

	if (!Object.prototype.hasOwnProperty.call(instances, id)) {
		return null;
	}

	return instances[id];
}

/**
 * @param elementId - ID of the HTMLElement.
 * @param options - Options object.
 */
export function dialog(elementId: string, options: Partial<Options> = {}) {
	let isOpen = false;
	let initiated = false;
	let focusTrap: FocusTrap | undefined;

	let dialogElement = document.getElementById(elementId) as HTMLElement;

	if (!dialogElement) {
		return undefined;
	}

	if (instances.hasOwnProperty(elementId)) {
		return instances[elementId];
	}

	const config = Object.assign({}, defaults, options);

	if (config.manageFocus) {
		focusTrap = FocusTrap(dialogElement);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') {
			return;
		}

		close();
	}

	function create() {
		if (initiated) {
			return false;
		}

		let role = config.alert ? 'alertdialog' : 'dialog';

		dialogElement.setAttribute('tabindex', '-1');
		dialogElement.setAttribute('role', role);
		dialogElement.setAttribute('aria-modal', 'true');

		if (config.label) {
			let matchesID = document.getElementById(config.label);
			let attribute = matchesID ? 'aria-labelledby' : 'aria-label';

			dialogElement.setAttribute(attribute, config.label);
		}

		if (config.description && document.getElementById(config.description)) {
			dialogElement.setAttribute('aria-describedby', config.description);
		}

		initiated = true;
		dispatchEvent('create');
	}

	function open(element: FocusTarget = undefined, scroll: boolean = true) {
		if (isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('open')) {
			return;
		}

		isOpen = true;
		dialogElement.classList.add(config.openClass);
		document.addEventListener('keydown', onKeydown, true);

		if (!focusTrap) {
			return;
		}

		if (
			element === undefined &&
			dialogElement.querySelector('[data-dialog-autofocus]') !== null
		) {
			element = dialogElement.querySelector('[data-dialog-autofocus]') as HTMLElement;
		}

		focusTrap.activate(element, scroll);
	}

	function close(element: FocusTarget = undefined, scroll: boolean = true) {
		if (!isOpen || !initiated) {
			return;
		}

		if (!dispatchEvent('close')) {
			return;
		}

		if (focusTrap) {
			focusTrap.deactivate(element, scroll);
		}

		isOpen = false;
		document.removeEventListener('keydown', onKeydown, true);
		dialogElement.classList.remove(config.openClass);
	}

	function toggle(toggle: boolean = !isOpen) {
		toggle ? open() : close();
	}

	function destroy() {
		if (!initiated) {
			return false;
		}

		let attributes = [
			'role',
			'tabindex',
			'aria-modal',
			'aria-label',
			'aria-labelledby',
			'aria-describedby',
		];

		close();
		initiated = false;
		attributes.forEach(attr => dialogElement.removeAttribute(attr));

		dispatchEvent('destroy');
	}

	function on<K extends keyof EventMap>(
		name: K,
		listener: (this: HTMLElement, ev: EventMap[K]) => any
	): void {
		let prefixedName = `dialog:${name}`;
		dialogElement.addEventListener(prefixedName, listener as EventListener);
	}

	function off<K extends keyof EventMap>(
		name: K,
		listener: (this: HTMLElement, ev: EventMap[K]) => any
	): void {
		let prefixedName = `dialog:${name}`;
		dialogElement.removeEventListener(prefixedName, listener as EventListener);
	}

	function dispatchEvent(name: keyof EventMap) {
		let prefixedName = `dialog:${name}`;

		let event = new CustomEvent(prefixedName, {
			bubbles: true,
			cancelable: true,
			detail: { id: elementId },
		});

		return dialogElement.dispatchEvent(event);
	}

	const instance: Dialog = {
		close,
		create,
		destroy,
		element: dialogElement,
		id: elementId,
		initiated,
		get isOpen() { return isOpen },
		off,
		on,
		open,
		toggle,
	};

	return instances[elementId] = instance;
}
