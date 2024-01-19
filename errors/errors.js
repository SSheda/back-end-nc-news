exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "23505") {
        const details = err.detail.split("(").slice(2).join("").split(")")
        res.status(409).send({ msg: `${details[0]} is already been registered` });
    }
    else if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    }
    else {
        next(err);
    }
}


exports.handleBadRequestError = (err, req, res, next) => {
    if (err.status ==="400"){
        res.status(400).send({ msg: 'Bad request' });
    }
    else {
        next(err);
    }
};

exports.handleServerError = (err, req, res, next) => {
    if (err.status ==="500"){
        res.status(500).send({ msg: 'Internal Server Error' });
    }
    else {
        next(err);
    }
};

exports.handleCustomerErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else {
        next(err);
    }
}

// 400 Bad request
//500 Internal Server Error