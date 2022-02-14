const http = require('http')

// const server = http.createServer((req, res) => {
//   if (req.method.toLowerCase() === 'post') {
//     let chunkData = ''
//     req.on('data', chunk => {
//       chunkData += chunk.toString()
//     })
//     req.on('end', () => {
//       res.end('你的请求参数是:' + chunkData)
//     })
//   } else {
//     res.end('Do not use get request')
//   }
// })

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  res.end('你的请求参数是:' + data)
})

server.listen(3001)
