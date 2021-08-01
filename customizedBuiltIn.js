
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

customElements.define('hello-button', HelloButton, {extends: 'button'});


{/* <button is="hello-button">Click me</button> */}

{/* <button is="hello-button" disabled>Disabled</button> */}