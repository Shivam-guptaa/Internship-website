const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not logged in (Auth failed)", status: false });
        }

        const decoded = jwt.verify(token, "Secretkey");
        req.user = decoded; 
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: "Invalid token", status: false });
    }
};

module.exports = auth;
