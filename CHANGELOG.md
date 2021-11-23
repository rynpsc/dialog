# Changelog

## 5.0.0

- Added the `manageFocus` option
- Converted to TypeScript

## 4.2.0

- Added the `id` property to access the instances id.

## 4.1.1

- Fixed issue with incorrect event target when using domapi.

## 4.1.0

- The 'dialog' prefix is no longer required when using the `on` and `off` methods.

## 4.0.0

- Added the `element` property.
- Added the ability to set the focused element when calling `close()`.
- Added the ability to unmount the domapi.
- Added ability to access the elements being watched by the domapi.
- Changed: The domapi now needs to be explicitly mounted.
- Changed: The default browser action is now prevented when using the domapi.
- Changed: The element passed into `open()` is now the element that gets focused on open.
- Removed the `elements` property.

## 3.0.0

- Added basic data attribute API.
- Added ability to cancel opening and closing via `event.preventDefault`.
- Added `initiated` property to dialog instance.
- Now uses `aria-modal="true"` and aligns with [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal).
- Events now use the native CustomEvent API.
- Event names are now prefixed with `dialog:`.
- No longer provides a default export, use `import { dialog } from @rynpsc/dialog` instead.
- Removed `main` parameter from constructor.
- Removed `autoInit` option, dialogs must now be manually created with `create()`.
- Removed `focus` option, autofocus element should now be defined using the `data-dialog-autofocus` attribute.

## v2.1.0

- Added `aria-hidden` attribute to main and dialog elements.

## 2.0.0

- Added `create`, `destroy`, `open` and `close` events.
- Added event subscription via `on` and `off` methods.
- Removed `onCreate`, `onDestroy`, `onOpen` and `onClose` callbacks.

## 1.0.0

- Initial release
