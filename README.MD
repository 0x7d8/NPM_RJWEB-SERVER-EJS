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

## Add Intellisense (Important for good developer experience!)
```ts
// webserver.d.ts

import { MiddlewareToHTTPContext } from "rjweb-server"
import { Props as AdditionalProps1 } from "rjweb-server-ejs"

declare module "rjweb-server" {
  export interface HTTPRequestContext extends MiddlewareToHTTPContext<[ AdditionalProps1 ]> {}
}
```

## Usage

Rendering a File & Setup
```js
const { Server } = require('rjweb-server')
const ejs = require('rjweb-server-ejs').Init

const server = new Server({
  port: 8000
})

server.middleware(ejs())

server.prefix('/')
  .add('GET', '/', (ctr) => {
    ctr.printEJS('./index.ejs')
  })

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