const express = require('express')
const app = express()
const port = 3000

require('./config')()

const orderService = require('./app/service/orderService')
const { orderTransformer } = require('./app/transformer')

app.get('/', (req, res) => {
  orderService
    .get()
    .then(orders => {
      res.status(200).send(orderTransformer(orders));
    })
    .catch(err => {
      // console.log(err)
      res.status(500).send('Ups Something went wrong')
    })
})

app.listen(port, () => {
  console.log(`Server is running, Please open http://localhost:${port}!`)
})