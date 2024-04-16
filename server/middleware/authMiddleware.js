const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        console.log('Req: ', req);
        console.log('Req auth middleware: ', req.headers);
        console.log('Req method: ', req.method);
        const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
        if (!token) {
            console.log('Not authorized');
            return res.status(401).json({message: "Not authorized"})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log('DECODE: ', decode);
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Authentication failed!',
        });
    }
};

module.exports = authentication;