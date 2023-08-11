const express = require('express');
const ProductsService = require('./../services/product');
const validatorHandler = require('./../middlewares/validator');
const {createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product');


const router = express.Router();
const service = new ProductsService();

/*Crear las capas de los servicios*/
router.get('/', async (req, res) =>{
 const products = await service.find();
  res.json(products);
});
/*Todo lo que es especifico debe de ir antes de lo dinamico para que las rutas no choquen*/
router.get('/filter', (req, res) =>{
  res.send('Yo soy un filtro');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error){
      next(error);
    }
  }
);

router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) =>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) =>{
      try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
      } catch (error) {
       next(error);
      }
});


router.delete('/:id', async (req, res) =>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
