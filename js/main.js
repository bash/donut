import 'whatwg-fetch'

(async () => {
  
  const resp = await fetch('https://httpbin.org/get')
  const data = await resp.json()

  console.log(data)
  
})()
