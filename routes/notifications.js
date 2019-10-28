const express = require('express');
const notificationRouter = express.Router();


const Notification = require('../models/notification.model');

notificationRouter.route('/').get((req, res) => {
    Notification.find()
        .then(notifications => res.json(notifications))
        .catch(err => res.status(400).json('Error: ' + err))
});

notificationRouter.route('/add').post(function (req, res, next) {
    const notification = new Notification(req.body);
    notification.save()
      .then(() => res.json('Notification added successfully'))
      .catch(err => res.status(400).send("unable to save to database"));
  });

  notificationRouter.route('/delete/:id').delete(function (req, res) {
      Notification.findByIdAndRemove({ _id: req.params.id })
        .then(notification => res.send(notification))      
        .catch(err => res.status(400).send("unable to delete from database"));
  })

module.exports = notificationRouter;