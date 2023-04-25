function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isGues() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
}

function hasRole(role) {
    return (req, res, next) => {
        if (req.user == undefined || req.user.role.includes(role) == false) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGues,
    hasRole
}