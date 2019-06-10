# Dialog

Dialog provides a bare bones baseline for building accessible modals or modal like UI elements such as fullscreen menus.

[View demo on CodePen](https://codepen.io/rynpsc/pen/YVVGdr)

## Install

### npm

```
npm install @rynpsc/dialog
```

## Usage

The `dialog` constructor takes three parameters:

* `dialog` - The ID of the element used as the dialog
* `main` - The ID of the element containing the main page content
* `options` - Configuration Object ([see options](#options))

### HTML

```html
<body>
  
  <div id="main">
    <header></header>
    <main></main>
    <footer></footer>
  </div>

  <div class="dialog" id="dialog">
    <!-- Dialog content -->
  </div>

</body>
```

### JavaScript

```js
import { dialog } from '@rynpsc/dialog';

const dialog = dialog(dialog, main, options);

if (dialog) {
  dialog.create();
}
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

### Data Attribute API

This library contains an optional data attribute API that enables opening and closing a dialog instance.

```js
import { domapi } from '@rynpsc/dialog';
```

```html
<button data-open-dialog="main">Open Dialog</button>
<button data-close-dialog="main">Close Dialog</button>
```

Where "main" is the ID of the dialog element.

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
});
```

## API

### open(element)

Open the dialog.

```js
dialog.open(element);
```

The optional `element` argument is the element focus will be returned to when closing the dialog, usually this is the element that triggered opening. For example when manually triggering the dialog with a button, `element` should be the button that triggered the element

### close()

Close the dialog.

```js
dialog.close();
```

### toggle()

Toggle the dialog between opened and closed.

```js
dialog.toggle(force);
```

If the optional `force` parameter evaluates to true, open the dialog, if false, close the dialog.

### destroy()

Destroy the dialog.

```js
dialog.destroy();
```

### create()

Create the dialog after destroying it.

```js
dialog.create();
```

### on()

Subscribe to an event.

```js
dialog.on(event);
```

### off()

Unsubscribe to an event.

```js
dialog.off(event);
```

### isOpen

Returns a boolean indicating if the dialog is currently open.

```js
dialog.isOpen;
```

### initiated

Returns a boolean indicating if the dialy has been initiated.

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
dialog.on('dialog:open', listener);
```

### close

Emitted when the dialog closes.

```js
dialog.on('dialog:close', listener);
```

### create

```js
dialog.on('dialog:create', listener);
```

Emitted after the dialog is created.

### destroy

```js
dialog.on('dialog:destroy', listener);
```

Emitted after the dialog is destroyed.

## Browser Support

Requires the following API's:

- CustomEvent
- Array.from
- Array.prototype.some
- Array.prototype.filter
- Element.prototype.classList
- Element.prototype.matches
- Element​.query​Selector() / Element​.query​SelectorAll()

## License

MIT &copy; [Ryan Pascoe](https://github.com/rynpsc)
