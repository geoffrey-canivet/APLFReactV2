const cloudinary = require("./config/cloudinary");

async function testCloudinaryConnection() {
    try {
        const result = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", {
            folder: "test_uploads"
        });

        console.log("✅ Cloudinary fonctionne !");
        console.log("📂 URL de l'image :", result.secure_url);
    } catch (error) {
        console.error("❌ Erreur de connexion à Cloudinary :", error);
    }
}

testCloudinaryConnection();
