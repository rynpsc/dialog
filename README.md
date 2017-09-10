# Dialog

Dialog provides a bare bones baseline for building accessible modals or modal like UI elements such as fullscreen menus.

[View demo on CodePen](https://codepen.io/rynpsc/pen/YVVGdr)

## Install

### npm

```
npm install @rynpsc/dialog
```

## Usage

The `Dialog` constructor takes three parameters:

* `dialog` - The element ID of the dialog element
* `main` - The element ID of the main page content
* `options` - Configuration Object ([see options](#options))

### HTML

```html
<body>
	
	<div id="main">
		<!-- All other page content -->
	</div>

	<div class="dialog" id="dialog">
		<!-- Dialog content -->
	</div>

</body>
```

### JavaScript

```js
import Dialog from '@rynpsc/dialog';

const dialog = dialog(dialog, main, options);
```

### CSS

```css
.dialog {
	display: none;
}

.dialog.is-open {
	display: block;
}
```

[For an example on how to animate the dialog see the CodePen demo](https://codepen.io/rynpsc/pen/YVVGdr).

## Options

```js
const dialog = Dialog('dialog', 'main', {
	// String with label or element ID to use as label
	label: 'Dialog',
	
	// ID of an element containing dialogs description
	description: '',
	
	// Reference to HTMLElement to focus on open, defaults to the first focusable element
	focus: '',
	
	// Whether dialog is of type alertdialog
	alert: false,

	autoInit: false,
});
```

## API

### open

Open the dialog.

```js
dialog.open();
```

### close

Close the dialog.

```js
dialog.close();
```

### toggle

Toggle the dialog between opened and closed.

```js
dialog.toggle(force);
```

If the optional `force` parameter evaluates to true, open the dialog, if false, close the dialog.

### destroy

Destroy the dialog.

```js
dialog.destroy();
```

Note: If relying on the library to move the `dialog` element outsideof the `main` element the method does not currently restore the `dialog` element to it's original DOM position.

### create

Create the dialog after destroying it.

```js
dialog.create();
```

### on

Subscribe to an event.

```js
dialog.on(event);
```

### off

Unsubscribe to an event.

```js
dialog.off(event);
```

### isOpen

Returns a Boolean indicating if the dialog is currently open.

```js
dialog.isOpen;
```

### elements

An object containing the dialog and main elements.

```js
const { dialog, main } = dialog.elements;
```

## Events

### open

Emitted when the dialog opens.

```js
dialog.on('open', listener);
```

### close

Emitted when the dialog closes.

```js
dialog.on('close', listener);
```

### create

```js
dialog.on('create', listener);
```

Emitted after the dialog is created.

Note in order to listen for the initial create event the dialog must be manually created via the `create()` method.

```js
const dialog = dialog(dialog, main, {
	autoInit: false
});

dialog.on('create', () => console.log('Dialog created'));

dialog.create();
```

### destroy

```js
dialog.on('destroy', listener);
```

Emitted after the dialog is destroyed.

## License

MIT &copy; [Ryan Pascoe](https://github.com/rynpsc)
