exports.validateEmail = (email) => {
    const regex = /^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (email.match(regex)){
        return true
    }
    return false
}

exports.validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/
    if (password.match(regex)){
        return true
    }
    return false
}