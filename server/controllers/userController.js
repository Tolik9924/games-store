const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
};

class UserController {
    async getUser(req, res) {
        try {
            const user = await findByEmailWithRoleId(req.user.email);

            if (!user) {
                res.status(401).json({ message: 'User was not found!' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
    async registration(req, res, next) {
        const { fullName, dateOfBirth, email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Uncorrect email or password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('User with this email exist'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword, fullName, dateOfBirth });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('User is not found.'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Uncorrect password.'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }


}

module.exports = new UserController()