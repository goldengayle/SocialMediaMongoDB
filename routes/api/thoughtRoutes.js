const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  updateReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/thoughts/:thoughtId/reactions').post(createReaction)

router.route('/thoughts/:thoughtId/:reactionId').put(updateReaction).delete(deleteReaction)

module.exports = router;