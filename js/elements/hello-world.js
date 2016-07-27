export class HelloWorld extends HTMLElement {

  connectedCallback () {
    this.innerText = 'Hello World'
  }

}
