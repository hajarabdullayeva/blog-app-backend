const { body, ValidationResult, validationResult } = require("express-validator")

const categoryValidation = [
    body("name").notEmpty().withMessage("Name field required !"),

    (req, res, next) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            res.status(422).json({ "message": errors.array()[0].msg })
        }
        next()
    }
]

module.exports = categoryValidation