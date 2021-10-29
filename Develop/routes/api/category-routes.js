const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/**
 * @async
 * Finding and Showing all the Categories with the respective Product
 */
router.get('/', async (req, res) => {
  try{
    const categories_data = await Category.findAll({
      include: Product
    })
    res.status(200).json(categories_data)
  } catch (err) {
    res.status(500).json(err)
  }

});

/**
 * @async
 * Finding The Category by the ID that is on the URL and include the respective Product
 */
router.get('/:id', async (req, res) => {
  try{
    const categories_id = await Category.findByPk(req.params.id, {
      include: Product
    })
    categories_id ? res.status(200).send(categories_id) 
    : res.status(500).json({message: 'No Category found'})
  }catch (err){
    res.status(500).json(err)
  }

});

/**
 * @async
 * Creating (posting) one new category
 */
router.post('/', async (req, res) => {
  try{
    const category_add = await Category.create(req.body)
    res.status(200).json(category_add)
  }catch(err){
    res.status(500).json({message: err})
  }
});

/**
 * @async
 * Finding one Category by ID and update with the body values.
 */
router.put('/:id', async (req, res) => {
  try{
    const catergory_update = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    catergory_update ? res.status(200).json(`id: ${req.params.id} has been added`) 
    : res.status(500).json({message: 'Error: the category could not be updated'}) 
  }catch(err){
    res.status(500).json(err)
  }
});

/**
 * @async
 * Finding one Category by ID and delete it.
 */
router.delete('/:id', async (req, res) => {
  try{
    const catergory_del = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    catergory_del ? res.status(200).json(`id: ${req.params.id} has been deleted`) 
    : res.status(500).json({message: 'Could not find category'})
  }catch(err){
    res.status(400).json(err)
  } 
});

module.exports = router;