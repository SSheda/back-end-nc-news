exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "23505") {
        const details = err.detail.split("=")
        res.status(400).send({ msg: `Bad request ${details[1]}` });
    }
    else if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    }
    else {
        next(err);
    }
}

exports.handlePathNotFound = (err, req, res, next) => {
    if (err && err.status === 404) {
        res.status(404).send({ msg: "Path not found" });
    } else {
        // Pass the error to the default error handler
        next(err);
    }
};

exports.handleServerError = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
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