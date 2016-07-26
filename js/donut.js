/**
 * (c) 2016 Ruben Schmidmeister
 */

const url = 'https://httpbin.org/get'

fetch(url)
  .then((resp) => resp.json())
  .then((data) => console.log(data))
