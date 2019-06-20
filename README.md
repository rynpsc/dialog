# Dialog

Dialog provides a bare bones baseline for building accessible modals or modal like UI elements such as fullscreen menus.

[View demo on CodePen](https://codepen.io/rynpsc/pen/YVVGdr)

## Install

```
$ npm install @rynpsc/dialog
```

## Usage

The `dialog` constructor takes two parameters:

* `dialog` - The ID of the element used as the dialog
* `options` - Configuration Object ([see options](#options))

### HTML

```html
<body>
  
  <main>
    <header></header>
    <main></main>
    <footer></footer>
  </main>

  <div class="dialog" id="dialog">
    <!-- Dialog content -->
  </div>

</body>
```

### JavaScript

```js
import { dialog } from '@rynpsc/dialog';

const dialog = dialog(dialog, options);

if (dialog) {
  dialog.create();
}
```

### CSS

```css
.dialog {
  visibility: hidden;
}

.dialog.is-open {
  visibility: visible;
}
```

[For an example on how to animate the dialog see the CodePen demo](https://codepen.io/rynpsc/pen/YVVGdr).

### Autofocus

By default focus will be set to the first focusable element inside the `dialog` element when calling `open()`. Focus can be set to a specific element by adding the `data-dialog-autofocus` attribute to the desired element.

```html
<div id="dialog">
  <button>Cancel</button>
  <button data-dialog-autofocus>Confirm</button>
</button>
```

### Data Attribute API

This library contains an optional data attribute API that enables opening and closing a dialog instance.

```js
import { domapi } from '@rynpsc/dialog';
```

```html
<button data-dialog-open="main">Open Dialog</button>
<button data-dialog-close="main">Close Dialog</button>
```

Where "main" is the ID of the dialog element.

## Options

```js
const dialog = Dialog('dialog', 'main', {
  // ID of HTMLElement to use in aria-labelledby or a string to use as the aria-label.
  label: 'Dialog',
  
  // ID of HTMLElement to use in aria-describedby.
  description: '',
  
  // Set dialog role to alertdialog.
  alert: false,

  // The class applied to elements.dialog when open.
  openClass: 'is-open'
});
```

## API

### .open(element)

Open the dialog.

```js
dialog.open(element);
```

The optional `element` argument is the element focus will be returned to when closing the dialog, usually this is the element that triggered opening. For example when manually triggering the dialog with a button, `element` should be the button that triggered the element

### .close()

Close the dialog.

```js
dialog.close();
```

### .toggle()

Toggle the dialog between opened and closed.

```js
dialog.toggle(force);
```

If the optional `force` parameter evaluates to true, open the dialog, if false, close the dialog.

### .destroy()

Destroy the dialog.

```js
dialog.destroy();
```

### .create()

Create the dialog after destroying it.

```js
dialog.create();
```

### .on(string, function)

Subscribe to an event.

```js
dialog.on(event);
```

### .off(string, function)

Unsubscribe to an event.

```js
dialog.off(event);
```

### .isOpen

Returns a boolean indicating if the dialog is currently open.

```js
dialog.isOpen;
```

### .initiated

Returns a boolean indicating if the dialy has been initiated.

```js
dialog.isOpen;
```

### .elements

An object containing the dialog and main elements.

```js
const { dialog, main } = dialog.elements;
```

## Events

Events are handled via the [CustomEvent API](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).

### open

Emitted when the dialog opens.

```js
dialog.on('dialog:open', listener);
```

This event can be cancelled, see [Cancelling events](#cancelling-events).

### close

Emitted when the dialog closes.

```js
dialog.on('dialog:close', listener);
```

This event can be cancelled, see [Cancelling events](#cancelling-events).

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

### Cancelling events

Some event can be cancelling by calling `event.preventDefault`.

```js
dialog.on('dialog:cancel', function(event) {
  event.preventDefault();
});
```

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
