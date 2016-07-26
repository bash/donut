fetch('https://httpbin.org/get')
  .then((resp) => resp.json())
  .then((data) => console.log(data))
