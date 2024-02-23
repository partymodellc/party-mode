const stringValidators = {
    isString: {
        bail: true,
        errorMessage: "value must be a string"
    },
    notEmpty: {
        bail: true,
        errorMessage: "value cannot be empty"
    },
    trim: true
}

const numberValidators = {
    isNumeric: {
        bail: true,
        errorMessage: "value must be a number"
    }
}

const dateValidators = {
    isISO8601: {
        bail: true,
        errorMessage: "value must be a date"
    },
    toDate: true
}

const stringArrayValidators = {
    isArray: {
        bail: true,
        errorMessage: "value must be a string array"
    }
}

module.exports = {
    stringValidators: stringValidators,
    numberValidators: numberValidators,
    dateValidators: dateValidators,
    stringArrayValidators: stringArrayValidators
}