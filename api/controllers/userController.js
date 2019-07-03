'use strict';

const mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.list_all_users = async (req, res) => {
  try {
      let result;
      result = await User
                      .find({})

      res.status(200).json({
        status: 200,
        message: 'success',
        data: result
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: error,
        data: []
    });
  }
}

exports.create_a_user = async (req, res) => {
  try {
      let user = await User
                      .findOne({dni: req.body.dni});

      if (!user) {
        let result = await new User(req.body).save()
        res.status(200).json({
          status: 200,
          message: 'success',
          data: result
      });

      } else {
        res.status(201).json({
          status: 201,
          message: 'User already exists',
          data: []
      });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: error,
        data: []
    });
  }
}

exports.read_a_user = async (req, res) => {
  try {
      let result;
      result = await User
                      .findOne({dni: req.params.userId})

      res.status(200).json({
        status: 200,
        message: 'success',
        data: result
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: error,
        data: []
    });
  }
}

exports.update_a_user = async (req, res) => {
  try {
      let result;
      result = await User
                      .updateOne({dni: req.params.userId}, req.body, {new: true})

      res.status(200).json({
        status: 200,
        message: 'success',
        data: result
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: error,
        data: []
    });
  }
}

exports.delete_a_user = async (req, res) => {
  try {
      let result;
      result = await User
                      .deleteOne({dni: req.params.userId})

      res.status(200).json({
        status: 200,
        message: 'success',
        data: result
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: error,
        data: []
    });
  }
}