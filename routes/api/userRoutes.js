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

// /api/Users
router.route('/').get(getUsers).post(createAUser);

// /api/User/:user_id
router.route('/:Id').get(getUsersById).put(updateAUser).delete(deleteAUser);

// // /api/user/:studentId/assignments
// router.route('/:userId/assignments').post(addAssignment);

// /api/user/:user_id/Friends/:friendsId
router.route('/:users_Id/Friends/:friendsId').post(addAFriend).delete(removeAFriend);

module.exports = router;
