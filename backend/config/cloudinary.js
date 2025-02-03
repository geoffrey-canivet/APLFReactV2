const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// 📌 Configuration de Cloudinary avec tes clés
cloudinary.config({
    cloud_name: "dxynwtp1g",
    api_key: "592687883666456",
    api_secret: "gxtIKWbHEBnNAgo22KCRxoet3-w"
});

// Test de connexion
cloudinary.api.ping()
    .then(() => console.log("✅ Connexion réussie avec Cloudinary !"))
    .catch(err => console.error("❌ Erreur de connexion à Cloudinary :", err));

// 📌 Définition du stockage avec multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "avatars", // 📂 Dossier où seront stockées les images sur Cloudinary
        format: async () => "png", // 📌 Format de sortie
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    }
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
