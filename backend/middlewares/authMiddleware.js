const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret_pour_jwt"; // Todo .env

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Récupère le token depuis les headers

    if (!token) {
        return res.status(401).json({ error: "Accès refusé, token manquant." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Ajoute les données du token à l'objet req
        next();
    } catch (err) {
        res.status(401).json({ error: "Token invalide ou expiré." });
    }
};

module.exports = authMiddleware;
