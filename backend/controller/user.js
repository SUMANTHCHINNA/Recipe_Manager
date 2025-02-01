const { checkUserByEmail, createUser, checkPaswword, getUserID, createToken } = require('../model/index');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: 'Fill all fields' });
        }

        if (username.length === 0 || email.length === 0 || password.length === 0) {
            return res.status(400).json({ status: false, message: 'Fill all fields' });
        }

        if (await checkUserByEmail(email)) {
            return res.status(400).json({ status: false, message: 'User already registered, please login' });
        }

        const s = await createUser({ username, email, password })
        const user_id = await getUserID(email)
        const token = await createToken(user_id)
        return res.status(201).json({ status: true, message: `User Registered successfully`, token: token });


    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Fill all fields' });
        }

        if (email.length === 0 || password.length === 0) {
            return res.status(400).json({ status: false, message: 'Fill all fields' });
        }

        if (await checkUserByEmail(email) == false) {
            return res.status(400).json({ status: false, message: 'User not registered, please register' });
        }
        if (await checkPaswword(email, password) == false) {
            return res.status(404).json({ status: false, message: 'Unauthorized access' });

        }
        const user_id = await getUserID(email)
        const token = await createToken(user_id)
        return res.status(201).json({ status: true, message: `login successfully`, token: token });


    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });

    }
}


module.exports = { register, login };
