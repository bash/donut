/**
 * (c) 2016 Ruben Schmidmeister
 */

import { HelloWorld } from './elements/hello-world'

const url = 'https://httpbin.org/get'

window.fetch(url)
  .then((resp) => resp.json())
  .then((data) => console.log(data))

window.customElements.define('hello-world', HelloWorld)
