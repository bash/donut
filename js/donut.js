import { render } from 'preact'

const URL = 'https://httpbin.org/get'

const Title = ({ children }) => {
  return <h1>{children}</h1>
}

window.fetch(URL)
  .then((resp) => resp.json())
  .then((data) => console.log(data))

render(<Title>Hello from Preact</Title>, document.body)
