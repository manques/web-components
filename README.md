# web-components
## Custom Html
### HTML elements, described by our class, with its own methods and properties, events

## There are two kinds of custom elements:
### 1.Autonomous custom elements – “all-new” elements, extending the abstract HTMLElement class.
### 2.Customized built-in elements – extending built-in elements, like a customized button, based on HTMLButtonElement etc.
## ------------------------------------------------------------
## 1.Autonomous custom elements – “all-new” elements, extending the abstract HTMLElement class.
### we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page,

### class with special methods -- all of them are optional.
### MyComponents

## register the element
### customElements.define("my-element", MyElement);
### // let the browser know that <my-element> is served by our new class
### document.createElement('my-element')