import { build } from './app'

const server = build()

const serverOptions = {
  host: '0.0.0.0',
  port: (process.env.PORT || 8888) as number,
}

server.listen(serverOptions, (err, address) => {
  if (err != null) {
    server.log.error(err)
    process.exit(1)
  }
})
