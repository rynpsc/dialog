# Dialog

> A simple, accessible libary for building dialogs.

- Automatically handles adding and toggling the appropiate aria roles, states and properties.
- Can be used as an accesible baseline for any dialog or dialog like like UI e.g lightbox's or fullscreen menus. 

## Install

```
npm install --save @rynpsc/dialog
```

## Usage

```js
const dialog = Dialog('dialog', 'main', options);
```

```html
<body>
	
	<div id="main">
		<!-- Contains all other page content -->
	</div>

	<div class="dialog" id="dialog">
		<!-- dialog content -->
	</div>

</body>
```

Alternatively the dialog element can be placed within `#main` and the script will move the `#dialog` element outside.

```css
.dialog {
	display: none;
}

.dialog[aria-hidden="false"] {
	display: block;
}
```

## Options

```js
const defaults = {
	// String with label or element ID to use as label
	label: 'Dialog',
	
	// ID of an element containing dialogs description
	description: '',
	
	// Element to focus on open, defaults to the first focusable element
	focus: '',
	
	// Whether dialog is of type alertdialog
	alert: false,
	
	// Callback on open
	onOpen: (modal, main) => {},
	
	// Callback on close
	onClose: (modal, main) => {},
};
```

## API

```js
dialog.open();
```

```js
dialog.close();
```

```js
dialog.toggle();
```

```js
dialog.isOpen;
```

## License

MIT &copy; 2017 [Ryan Pascoe](https://github.com/ryan-pascoe)
