export default function emitter() {
	const events = Object.create(null);
	return {
		/**
		 * Subscribe to an event
		 * @param {String} type
		 * @param {Function} handler
		 */
		on(type, handler) {
			if (type && handler) {
				const handlers = events[type] = events[type] || [];
				if (handlers.indexOf(handler) == -1) {
					handlers.push(handler);
				}
			}
		},

		/**
		 * Unsubscribe from an event
		 * @param {String} event
		 * @param {Function} handler
		 */
		off(event, handler = false) {
			if (handler) {
				events[event].splice(events[event].indexOf(handler), 1);
			} else {
				delete events[event];
			}
		},

		/**
		 * Emit an event
		 * @param {String} event
		 * @param {*} args
		 */
		emit(event, ...args) {
			(events[event] || []).forEach(handler => handler.apply(handler, args));
		},
	}
}
