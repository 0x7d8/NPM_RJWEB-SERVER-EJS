<h1 align="center">Welcome to rjweb-server-ejs 👋</h1>
<div align="center">
  A rjweb-server Middleware to render ejs templates easily
</div>

## Install

```sh
npm i rjweb-server-ejs
```

or

```sh
yarn add rjweb-server-ejs
```

or

```sh
pnpm add rjweb-server-ejs
```

## Usage

Rendering a File & Setup
```js
const { Server } = require('rjweb-server')
const { eJS } = require('rjweb-server-ejs')

const server = new Server({
  port: 8000
}, [
  eJS.config({})
])

server.path('/', (path) => path
  .http('GET', '/', (http) => http
    .onRequest((ctr) => {
      ctr.printEJS('./index.ejs')
    })
  )
)

server.start().then((res) => {
  console.log(`Server started on port ${res.port}`)
})
```

## Author

👤 **0x4096** 

## Show your support

Give a Star if this project helped you!

## 📝 License

Copyright © 2023 0x4096.<br />
This project is MIT licensed.