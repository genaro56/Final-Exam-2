const { TOKEN } = require('../config')
function validateToken(req, res, next) {
    console.log(req.headers);
    const { token } = req.headers.authorization;
    if(!token) {
        res.statusMessage = "You need to send the 'session-exam-token'."
        return res.status(401).end();
    }

    if(token !== `Bearer ${TOKEN}`) {
        res.statusMessage = '“The session-exam-token” is invalid.'
        return res.status(401).end()
    }
    next();
}

module.exports = validateToken;
