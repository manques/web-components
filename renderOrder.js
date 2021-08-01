
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
    alert(this.innerHTML); // empty (*)
  }

});


{/* <user-info>John</user-info> */}


customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
    setTimeout(() => alert(this.innerHTML)); // John (*) -- async zero delay
  }

});


{/* <user-info>John</user-info> */}