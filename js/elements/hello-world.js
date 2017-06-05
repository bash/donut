export class HelloWorld extends window.HTMLElement {
  connectedCallback () {
    this.innerText = 'Hello World'
  }
}
