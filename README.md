# Dialog

- Automatically handles adding and toggling the appropiate aria roles, states and properties.
- Can be used as an accesible baseline for any dialog or dialog like like UI e.g lightbox's or fullscreen menus. 

[View demo on CodePen](https://codepen.io/rynpsc/pen/YVVGdr)

## Install

### Yarn

```
yarn add @rynpsc/dialog
```

### NPM

```
npm install --save @rynpsc/dialog
```

## Usage

Dialog requires that the dialog element lives outside of the main page content.

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

Alternatively the dialog element can be placed within `#main` and the script will move the `#dialog` element outside of the `#main` element.

```html
<body>
	
	<div id="main">
		<!-- All other page content -->
		
		<div class="dialog" id="dialog">
			<!-- Dialog content -->
		</div>

	</div>

</body>
```

The `Dialog` constructor takes three parameters:

* `dialog` - The element ID of the dialog element
* `main` - The element ID of the main page content
* `options` - Configuration Object ([see options](#options))

```js
import Dialog from '@rynpsc/dialog';

const dialog = Dialog(dialog, main, options);
```

Dialog does not provide and styling of its own, instead this is left to the user to implement.

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
const dialog = Dialog('dialog', 'main', {
	// String with label or element ID to use as label
	label: 'Dialog',
	
	// ID of an element containing dialogs description
	description: '',
	
	// Reference to HTMLElement to focus on open, defaults to the first focusable element
	focus: '',
	
	// Whether dialog is of type alertdialog
	alert: false,

	// Callback on initialisation
	onCreate: (dialog, main) => {},
	
	// Callback on open
	onOpen: (dialog, main) => {},
	
	// Callback on close
	onClose: (dialog, main) => {},

	// Callback on destroy
	onDestroy: (dialog, main) => {},
});
```

The callbacks , `onCreate`, `onOpen`, `onClose` and `onDestroy` each access to two parameters, `dialog` and `main` which reference the respective `HTMLElements`.

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

Toggle the dialog between open and close.

```js
dialog.toggle(force);
```

If the optional `force` parameter evaluates to true, open the dialog, if false, close the dialog.

### destroy

Destroy the dialog. 

```js
dialog.destroy();
```

Note: If relying on the library to move the `dialog` element outsideof the `main` element the method does not currently restore the `dialog` element to it's previous DOM position.

### create

Create the dialog after destroying it.

```js
dialog.create();
```

### isOpen

Returns a Boolean indicating if the dialog is currently open.

```js
dialog.isOpen;
```

## License

MIT &copy; 2017 [Ryan Pascoe](https://github.com/rynpsc)
