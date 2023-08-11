const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler  } = require('./middlewares/error.handler')
const app = express();
const port = 3000;
//Deploy a heroku
//const port = process.env.PORT || 3000;


app.use(express.json());
const whiteList = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin) || !origin){
      callback(null, true);
    } else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors());

app.get('/', (req, res) =>{
  res.send('Hola server express');
});

app.get('/nueva-ruta', (req, res) =>{
  res.send('Hola soy un nuevo end-point');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () =>{
  console.log('Mi port' + port);
});
