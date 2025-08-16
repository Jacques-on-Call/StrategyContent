const router = require('express').Router();
let Proposal = require('../models/proposal.model');
const auth = require('../middleware/auth');
const authorize = require('../middleware/roles');
const { check, validationResult } = require('express-validator');

router.route('/').get((req, res) => {
  Proposal.find()
    .then(proposals => res.json(proposals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(
  [
    auth,
    authorize(['admin', 'editor']),
    check('clientName', 'Client name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProposal = new Proposal(req.body);

    newProposal
      .save()
      .then(() => res.json('Proposal added!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  }
);

router.route('/:id').get([auth, authorize(['admin', 'editor', 'viewer'])], (req, res) => {
  Proposal.findById(req.params.id)
    .then(proposal => {
      if (!proposal) {
        return res.status(404).json('Proposal not found');
      }
      const decryptedProposal = proposal.toObject();
      decryptedProposal.sensitiveDetails = proposal.decryptSensitiveDetails();
      res.json(decryptedProposal);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete([auth, authorize(['admin'])], (req, res) => {
  Proposal.findByIdAndDelete(req.params.id)
    .then(() => res.json('Proposal deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(
  [
    auth,
    authorize(['admin', 'editor']),
    check('clientName', 'Client name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Proposal.findById(req.params.id)
      .then((proposal) => {
        Object.assign(proposal, req.body);

        proposal
          .save()
          .then(() => res.json('Proposal updated!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  }
);

module.exports = router;
