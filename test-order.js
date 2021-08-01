
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});


<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>