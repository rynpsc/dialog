# Dialog

Dialog provides a bare bones baseline for building accessible modals or modal like UI elements such as fullscreen menus.

![npm version](https://img.shields.io/npm/v/@rynpsc/dialog)
![npm bundle size (minified and gzipped)](https://img.shields.io/bundlephobia/minzip/@rynpsc/dialog?label=size)

## Features

- Takes care of adding the correct aria roles and attributes.
- Sends and traps focus within the dialog.
- Provides an event API via CustomEvents.
- Simple data attribute API for opening and closing.

[View demo on CodePen](https://codepen.io/rynpsc/pen/YVVGdr)

## Install

```
$ npm install @rynpsc/dialog
```

## Usage

The `dialog` constructor takes two parameters:

* `id` - The ID of the element used as the dialog
* `options` - Configuration Object ([see options](#options))

### HTML

```html
<body>
  
  <header></header>
  <main></main>
  <footer></footer>

  <div class="dialog" id="my-dialog">
    <!-- Dialog content -->
  </div>

</body>
```

### JavaScript

```js
import { dialog } from '@rynpsc/dialog';

const dialog = dialog('my-dialog', options);

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

```
## Options

```js
{
  // ID of HTMLElement to use in aria-labelledby or a string to use as the aria-label.
  label: 'Dialog',
  
  // ID of HTMLElement to use in aria-describedby.
  description: '',
  
  // Set dialog role to alertdialog.
  alert: false,

  // Enable automatic focus management.
  manageFocus: true,

  // The class applied to elements.dialog when open.
  openClass: 'is-open'
}
```

## API

### dialog(id: string, options: Object)

Creates a dialog instance.

#### .open(element: HTMLElement | undefined | null = undefined, scroll: boolean = true)

Open the dialog.

The optional `element` argument can be used to control the element that gets focused on opening. If `undefined` (the default) the first focusalbe element will be focused or the first element with the `data-dialog-autofocus` attribute. If `null` is passed, focus will not be redirected.

```js
dialog.open(element);
```

#### .close(element: HTMLElement | undefined | null = undefined, scroll: boolean = true)

Close the dialog.

The optional `element` argument can be used to control the element that gets focused on closing. If not set (`undefined`) the element that had focus before calling `open` will be focused. If `null` is passed, focus will not be redirected.

```js
dialog.close();
```

#### .toggle(force: boolean)

Toggle the dialog between opened and closed.

```js
dialog.toggle();
```

If the optional `force` parameter evaluates to true, open the dialog, if false, close the dialog.

#### .create()

Create the dialog after destroying it.

```js
dialog.create();
```

#### .destroy()

Destroy the dialog.

```js
dialog.destroy();
```

#### .on(string, function)

Subscribe to an event.

```js
dialog.on(event);
```

#### .off(string, function)

Unsubscribe to an event.

```js
dialog.off(event);
```

#### .isOpen

Returns a boolean indicating if the dialog is currently open.

```js
dialog.isOpen;
```

#### .initiated

Returns a boolean indicating if the dialog has been initiated.

```js
dialog.isOpen;
```

#### .id

The ID that was passed into the constructor.

```js
dialog.id
```

#### .element

The HTMLElement matching the ID passed into the constructor.

```js
dialog.element
```

### instances

Returns an object of all the dialog instances.

```js
import { instances } from '@rynpsc/dialog';

console.table(instances);
```

### getInstanceById(string)

Gets a dialog instance with the given id.

```js
import { getInstanceById } from '@rynpsc/dialog';

const instance = getInstanceById('dialog');

if (instance) {
  instance.open();
}
```

### Data Attribute API

This library contains an optional data attribute API that enables opening and closing a dialog instance.

```js
import { domapi } from '@rynpsc/dialog';

domapi.mount()
```

```html

<div id="dialog">
  <!-- Dialog content -->
</div>

<button data-dialog-open="dialog">Open Dialog</button>
<button data-dialog-close="dialog">Close Dialog</button>
```

Where "dialog" is the ID of the dialog element.

#### .mount()

Get and add event listeners to elements with data attributes.

```js
domapi.mount();
```

#### .unmount()

Remove event listeners from elements.

```js
domapi.unmount();
```

#### .openers

Get elements that will trigger open.

```js
domapi.openers;
```

#### .closers

Get elements that will trigger close.

```js
domapi.closers;
```

## Events

Events are handled via the [CustomEvent API](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).

### open

Emitted when the dialog opens.

```js
dialog.on('open', handler);
```

This event can be cancelled, see [Cancelling events](#cancelling-events).

### close

Emitted when the dialog closes.

```js
dialog.on('close', handler);
```

This event can be cancelled, see [Cancelling events](#cancelling-events).

### create

```js
dialog.on('create', handler);
```

Emitted after the dialog is created.

### destroy

```js
dialog.on('destroy', handler);
```

Emitted after the dialog is destroyed.

### Cancelling events

The `open` and `close `events can be canceled by calling `event.preventDefault` in the event handler.

```js
dialog.on('close', function(event) {
  event.preventDefault();
});
```

## Browser Support

Requires the following API's:

- Array.from
- Array.prototype.filter
- Array.prototype.some
- CustomEvent
- DOMTokenList.contains
- Element.classList
- Element.matches
- Element.querySelectorAll
- HTMLElement.dataset

## License

MIT
