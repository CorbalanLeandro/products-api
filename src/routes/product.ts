import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.send({ message: 'Creating a product', body: req.body });
});

router.get('/', (_req, res) => {
  res.send('Getting all products');
});

router.patch('/:id', (req, res) => {
  res.send({
    message: 'Updating a product by id',
    body: req.body,
    id: req.params.id,
  });
});

router.delete('/:id', (req, res) => {
  res.send({
    message: 'Deleting a product by id',
    id: req.params.id,
  });
});

router.get('/code/:code', (req, res) => {
  res.send({
    message: 'Getting product by code',
    code: req.params.code,
  });
});

router.get('/name/:name', (req, res) => {
  res.send({
    message: 'Getting products by name',
    name: req.params.name,
  });
});

router.get('/best-seller', (_req, res) => {
  res.send('Getting best seller');
});

router.get('/best-revenue', (_req, res) => {
  res.send('Getting product with more revenue');
});

export { router as productRoutes };
