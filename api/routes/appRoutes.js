'use strict';

module.exports = app => {

  const User = require('../controllers/userController'),
    Loan = require('../controllers/loanController');

  // User Routes
  app.route('/users')
    .get(User.list_all_users)
    .post(User.create_a_user);

  app.route('/users/:userId')
    .get(User.read_a_user)
    .put(User.update_a_user)
    .delete(User.delete_a_user);


  // Loan Routes
  app.route('/loans')
    .get(Loan.list_all_loans)
    .post(Loan.create_a_loan);

  app.route('/loans/pending')
    .get(Loan.list_pending_loans);

  app.route('/loans/negated')
    .get(Loan.list_negated_loans);

  app.route('/loans/user/:userId')
    .get(Loan.list_user_loans);

  app.route('/loans/:loanId')
    .get(Loan.read_a_loan)
    .put(Loan.update_a_loan)
    .delete(Loan.delete_a_loan);

};