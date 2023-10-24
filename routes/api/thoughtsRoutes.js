const router = require('express').Router();
const {
  getThoughts,
  getThoughtsById,
  createAThought,
  updateAThought,
  deleteAThought,
} = require('../../controllers/thoughtsController.js');

// /api/courses
router.route('/').get(getThoughts).post(createAThought);

// /api/courses/:courseId
router
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .put(updateAThought)
  .delete(deleteAThought);

module.exports = router;
