exports.validateEmail = (email) => {
    const regex = /^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (email.match(regex)){
        return true
    }
    return false
}

exports.validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (password.match(regex)){
        return true
    }
    return false
}