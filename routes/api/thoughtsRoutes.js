const router = require('express').Router();
const {
  getThoughts,
  getThoughtsById,
  createAThought,
  updateAThought,
  deleteAThought,
  addAReaction,
  removeAReaction,
} = require('../../controllers/thoughtsController.js');

// /api/courses
router.route('/').get(getThoughts).post(createAThought);

// /api/courses/:courseId
router
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .put(updateAThought)
  .delete(deleteAThought);

  // /api/students/:studentId/assignments
router.route('/:thoughtsId/Reaction').post(addAReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtsId/Reactions/:reactionId').delete(removeAReaction);


module.exports = router;
