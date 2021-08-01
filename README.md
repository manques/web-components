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

## ----------------- style ----------------------------------
### shadow DOM can include styles, such as <style> or <link rel="stylesheet">.
## Cascading
### The shadow host (<custom-dialog> itself) resides in the light DOM, so it’s affected by document CSS rules.
### If there’s a property styled both in :host locally, and in the document, then the document style takes precedence.

## Styling slotted content
### Slotted elements come from light DOM, so they use document styles. Local styles do not affect slotted content.
## style slotted elements in our component, there are two choices
### 1.<slot> itself and rely on CSS inheritance:
### 2. use ::slotted(selector) pseudo-class. It matches elements based on two conditions:
#### a) That’s a slotted element, that comes from the light DOM. Slot name doesn’t matter. Just any slotted element, but only the element itself, not its children.
####  b) The element matches the selector.
#### Please note, ::slotted selector can’t descend any further into the slot. These selectors are invalid:
#### Also, ::slotted can only be used in CSS. We can’t use it in querySelector.

##  CSS hooks with custom properties
### There’s no selector that can directly affect shadow DOM styles from the document. But just as we expose methods to interact with our component, we can expose CSS variables (custom CSS properties) to style it.
## Custom CSS properties exist on all levels, both in light and shadow.
### in shadow DOM we can use --user-card-field-color CSS variable to style fields, and the outer document can set its value:

## Document styles can affect:
### shadow host (as it lives in the outer document)
### slotted elements and their contents (as that’s also in the outer document)
### When CSS properties conflict, normally document styles have precedence, unless the property is labelled as !important. Then local styles have precedence.

## CSS custom properties pierce through shadow DOM. They are used as “hooks” to style the component:
### 1.The component uses a custom CSS property to style key elements, such as var(--component-name-title, <default value>).
### 2. Component author publishes these properties for developers, they are same important as other public component methods.
### 3.When a developer wants to style a title, they assign --component-name-title CSS property for the shadow host or above.

## --------------------------  Shadow DOM and events ---------------------------------------------------------
### Events that happen in shadow DOM have the host element as the target, when caught outside of the component.
### If you click on the button, the messages are:
#### Inner target: BUTTON – internal event handler gets the correct target, the element inside shadow DOM.
#### Outer target: USER-CARD – document event handler gets shadow host as the target.
## Retargeting does not occur if the event occurs on a slotted element, that physically lives in the light DOM.

## Bubbling, event.composedPath()
`<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>`
### So, for a click on <span slot="username">, a call to event.composedPath() returns an array: [span, slot, div, shadow-root, user-card, body, html, document, window]. That’s exactly the parent chain from the target element in the flattened DOM, after the composition.