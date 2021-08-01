# web-components
## Custom Html
### HTML elements, described by our class, with its own methods and properties, events

## There are two kinds of custom elements:
### 1.Autonomous custom elements – “all-new” elements, extending the abstract HTMLElement class.
### 2.Customized built-in elements – extending built-in elements, like a customized button, based on HTMLButtonElement etc.

# ----------------- 1. Autonomous custom elements ----------------------------------------------------------
### we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page,

### class with special methods -- all of them are optional.
### myComponents.js - see code

## register the element
### customElements.define("my-element", MyElement);
### // let the browser know that <my-element> is served by our new class
### document.createElement('my-element')

## ------------------------------------
## To get the information about custom elements, there are methods:
### customElements.get(name) – returns the class for a custom element with the given name,
### customElements.whenDefined(name) – returns a promise that resolves (without value) when a custom element with the given name becomes defined.

## ---------------------------------------
## Rendering in connectedCallback, not in constructor
### when constructor is called, it’s yet too early.
### The element is created, but the browser did not yet process/assign attributes at this stage: calls to getAttribute would return null
## -------------------------------------------------
# Observing attributes

### In the current implementation of <time-formatted>, after the element is rendered, further attribute changes don’t have any effect. 
### We can observe attributes by providing their list in observedAttributes() static getter. For such attributes, attributeChangedCallback is called when they are modified. It doesn’t trigger for other, unlisted attributes (that’s for performance reasons).
## -----------------------------------------------
# Rendering order
### When HTML parser builds the DOM, elements are processed one after another, parents before children.
### we have <outer><inner></inner></outer>, then <outer> element is created and connected to DOM first, and then <inner>.
## Output order:
### outer connected.
### inner connected.
### outer initialized.
### inner initialized.

# ------------------------------  2. Customized built-in elements --------------------------
## Extend HTMLButtonElement with our class:
### class HelloButton extends HTMLButtonElement { /* custom element methods */ }
## Provide the third argument to customElements.define, that specifies the tag:
### customElements.define('hello-button', HelloButton, {extends: 'button'});
## At the end, to use our custom element, insert a regular <button> tag, but add is="hello-button" to it:
### <button is="hello-button">...</button>

## ------------------------------------ Flatten DOM -------------------------------------
### The process of rendering slotted elements inside their slots is called “composition”. The result is called a “flattened DOM”.