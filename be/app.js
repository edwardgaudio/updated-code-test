const express = require('express');
const http = require('http');
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const cluster = require('cluster');
const os = require('os');

//const userRouter = require('./routes/user')

// Add cluster to take advantage of multi-core processors in the event there are multiple incoming requests
// Not necessary if application is containerized with docker/kubernetes, however we assume no containerization
if(cluster.isMaster) {
  const numCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {

  const app = express();

  app.use(express.json());
//app.use(express.static(__dirname + '/public/images/')); // Generally not used here but good for future

  app.use('/', indexRouter);
// Unused in the take home
// app.use('/user', userRouter);

  app.use('/products', productsRouter);

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
}