// const Express = require('Express');
// const router = Express.Router();
const router = require('Express').Router();
const WorkoutLog = require('../db').import('../models/workoutlog');
const validateSession = require('../middleware/validate-session');

router.get('/', (req, res) => {
  WorkoutLog.findAll()
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/', (req, res) => {
  const workoutFromRequest = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner: req.body.owner
  }

  WorkoutLog.create(workoutFromRequest)
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({ error: "Workout log not created" }))
})

router.get('/:id', validateSession, (req, res) => {
  WorkoutLog.findOne({
    where: { id: req.params.id }
  })
  .then(workout => res.status(200).json(workout))
  .catch(err => res.status(500).json({ error: "Workout log not found" }))
})

router.put('/:id', validateSession, (req, res) => {
  WorkoutLog.update(req.body, {
    where: { id: req.params.id }
  })
  .then(workout => res.status(200).json(workout))
  .catch(err => res.status(500).json({ error: "Workout log not updated" }))
})

router.delete('/:id', validateSession, async(req, res) => {
  try {
    const result = await WorkoutLog.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Workout log not deleted"});
  }
})

module.exports = router;