const express = require('express');
const http = require('http');
const indexRouter = require('./routes/index');
// const userRouter = require('./routes/user')
const productsRouter = require('./routes/products')

const app = express();

app.use(express.json());
//app.use(express.static(__dirname + '/public/images/')); // Generally not used here but good for future

app.use('/', indexRouter);
app.use('/products', productsRouter);
// Unused in the take home
// app.use('/user', userRouter);

const port = 3001;
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`Server listening on port: ${port}`)
});

server.on('error', onError);

function onError(error) {
  console.error('Error:', error);
  console.warn('Error logging beyond the scope of this application')
}

module.exports = server;