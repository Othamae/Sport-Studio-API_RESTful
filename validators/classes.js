const { check } = require('express-validator')
const { validateResult } = require('../utils/handleValidators')

const validatorCreateClass = [
  check('name')
    .exists()
    .notEmpty(),
  check('instructor')
    .exists()
    .notEmpty(),
  check('level')
    .exists()
    .notEmpty(),
  check('capacity')
    .exists()
    .notEmpty(),
  check('time')
    .exists()
    .notEmpty(),
  check('duration')
    .exists()
    .notEmpty(),
  check('duration.lections')
    .exists()
    .notEmpty(),
  check('duration.start')
    .exists()
    .notEmpty(),
  check('duration.end')
    .exists()
    .notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next)
  }
]

const validatorGetClass = [
  check('id')
    .exists()
    .notEmpty(),
  // .isMongoId(),
  (req, res, next) => {
    return validateResult(req, res, next)
  }
]

module.exports = { validatorCreateClass, validatorGetClass }
