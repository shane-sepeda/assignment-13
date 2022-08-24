const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id', 
      'tag_name'
    ],
    includes: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
      as: 'product_tags'
    }
  })
  .then(dbTagData => res.json(dbTagData))
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'tag_name'
    ],
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
      as: 'product_tags'
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag is found with this id!'});
    }
    res.json(dbTagData);
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, { 
    where: {
      id: req.params.id
    }
   })
   .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ mesage: 'No tag found with this id!'});
        return;
    }
    res.json(dbTagData);
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
    where: {
      id: req.params.id
    }
  }).
  then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id!'});
      return;
    }
    res.json(dbTagData)
  })
});

module.exports = router;
