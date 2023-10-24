const router = require('express').Router();
const {
  getUsers,
  getUsersById,
  createAUser,
  updateAUser,
  deleteAUser,
  addAFriend,
  removeAFriend,

} = require('../../controllers/usersController');

// /api/students
router.route('/').get(getUsers).post(createAUser);

// /api/students/:studentId
router.route('/:Id').get(getUsersById).put(updateAUser).delete(deleteAUser);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:users_Id/friends/:friendsId').post(addAFriend).delete(removeAFriend);

module.exports = router;
