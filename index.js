///////////////////////////////////////////////////////////////////////////////////////////
// Basic file reading/writing 

const fs = require('fs')
const http = require('http')
const url = require('url')

// const textIn = fs.readFileSync('./resources/1-node-farm/starter/txt/input.txt', 'utf-8')
// const textOut = `Information about avocado: ${textIn}.\nCreated on ${Date.now()}`

// console.log(textOut)

// // Writing content from input.txt to new file output.txt
// fs.writeFileSync('./txt/output.txt', textOut)

// // Read and Write file in Async 
// fs.readFile('./resources/1-node-farm/starter/txt/start.txt', 'utf-8', (err, datastart) => {
//    fs.readFile('./resources/1-node-farm/starter/txt/input.txt', 'utf-8', (err, datainput) => {
//       fs.writeFile('./txt/output2.txt', `${datastart}, ${datainput}`, 'utf-8', (err) => {
//          if (err) throw err;
//          console.log('You file has been save!')
//       })
//    })
// })

////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER

const replaceTemplate = (temp, product) => {
   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
   output = output.replace(/{%IMAGE%}/g, product.image)
   output = output.replace(/{%PRICE%}/g, product.price)
   output = output.replace(/{%FROM%}/g, product.from)
   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
   output = output.replace(/{%QUANTITY%}/g, product.quantity)
   output = output.replace(/{%DESCRIPTION%}/g, product.description)
   output = output.replace(/{%ID%}/g, product.id)

   if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

   return output
}

// Reading data from file
const productHome = fs.readFileSync(`${__dirname}/templates/product-home.html`, 'utf-8')
const productCard = fs.readFileSync(`${__dirname}/templates/product-cards.html`, 'utf-8')
const productDetails = fs.readFileSync(`${__dirname}/templates/product-details.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
   // const { query, pathName } = url.parse(req.url, true)

   const pathName = req.url

   // Product home page
   if (pathName === '/' || pathName === '/overview') {
      res.writeHead(200, { 'Content-type': 'text/html' })

      const cardsHTML = dataObj.map(el => replaceTemplate(productCard, el)).join('')
      const output = productHome.replace('{%PRODUCT_CARDS%}', cardsHTML)
      res.end(output)

      // Product detail page
   } else if (pathName === '/product') {
      res.end('Welcome to Product page!')
      // API
   } else if (pathName === '/api') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(data)
      // Page not found
   } else {
      res.writeHead(404, {
         'my-name': 'Thanh Vu Nguyen'
      })
      res.end('<h1>Page not found!')
   }
})

server.listen(8000, '127.0.0.1', () => {
   console.log('Started http server and Listening to request on port 8000')
})