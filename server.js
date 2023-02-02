
const http = require('http')
const url = require('url')
const fs = require('fs')
var visits = 0;

const server = http.createServer((req, res) => {
  var time = new Date();
  console.log("Request received...")
  visits++;

  var obj = url.parse(req.url, true);
  var name = obj.query.name;
  var path = obj.path
  var logData = `${visits}. Request @${obj.path} ----- ${time} \n`
  fs.appendFile('log.txt', logData, (err) => {
    if (!err) console.log("Log entried...")
  })
  // console.log(path)
  var fpath = './resources' + path;


  if (path != '/home.html') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('Page Not Found')
    res.end();
    return;
  }

  fs.readFile(fpath, (err, data) => {
    if (!err) {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write(data.toString())
      res.end();
    }
  })

  // fs.writeFile('log.txt', `${visits}`, err => {
  //   if (!err)
  //     console.log("visit++")
  // })


})

server.listen(9000, () => {
  console.log("Server Started....")
})