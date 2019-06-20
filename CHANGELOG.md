# Changelog

## 3.0.0 - 2019-06-08

### Added

- Added basic data attribute API.
- Added ability to cancel opening and closing via `event.preventDefault`.
- Added `initiated` property to dialog instance.

### Changed

- Now uses `aria-modal="true"` and aligns with [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal).
- Events now use the native CustomEvent API.
- Event names are now prefixed with `dialog:`.
- No longer provides a default export, use `import { dialog } from @rynpsc/dialog` instead.

### Removed

- Removed `main` parameter from constructor.
- Removed `autoInit` option, dialogs must now be manually created with `create()`.
- Removed `focus` option, autofocus element should now be defined using the `data-dialog-autofocus` attribute.

## v2.1.0 - 2017-12-10

### Added

- Added `aria-hidden` attribute to main and dialog elements.

## 2.0.0 - 2017-09-10

### Added

- Added `create`, `destroy`, `open` and `close` events.
- Added event subscription via `on` and `off` methods.

### Removed

- Removed `onCreate`, `onDestroy`, `onOpen` and `onClose` callbacks.

## 1.0.0 - 2017-05-29

- Initial release
