const identifyUserMiddleware = (req, res, next) => {
    const userId = req.userId; // Cela vient du token décodé, configure-le dans ton middleware JWT
    if (!userId) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    req.userId = userId;
    next();
};

module.exports = identifyUserMiddleware