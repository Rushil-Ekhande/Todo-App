import jwt from "jsonwebtoken";

export async function getAuthToken(req, res, next) {
    const token = req.cookies.authToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
        req.user = decoded;
    } else {
        return res.json({
            success: false,
            message: "Not a valid token"
        });
    }
    next();
}