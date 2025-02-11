const { Ticket, User, SubTransaction } = require("../models");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const ticketController = {
    // 📌 1️⃣ Upload d'un ticket avec image et conversion en PDF
    uploadTicket: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: "Aucun fichier envoyé." });

            const { userId, subTransactionId } = req.body;

            // Vérifier si l'utilisateur existe
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

            // Vérifier si la sous-transaction existe
            const subTransaction = await SubTransaction.findByPk(subTransactionId);
            if (!subTransaction) return res.status(404).json({ error: "Sous-transaction non trouvée." });

            // Upload de l'image sur Cloudinary
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { folder: "tickets" });

            // Supprimer le fichier temporaire après upload
            fs.unlinkSync(req.file.path);

            // Sauvegarde en base de données
            const newTicket = await Ticket.create({
                imageUrl: imageUpload.secure_url,
                pdfUrl: null,  // On générera le PDF plus tard
                userId,
                subTransactionId
            });

            res.json(newTicket);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 📌 2️⃣ Récupérer les tickets d'un utilisateur
    getTicketsByUser: async (req, res) => {
        try {
            const { userId } = req.params;

            // Vérifier si l'utilisateur existe
            const user = await User.findByPk(userId, {
                include: { model: Ticket, as: "tickets" }
            });

            if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

            res.json(user.tickets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 📌 3️⃣ Récupérer un ticket par ID
    getTicketById: async (req, res) => {
        try {
            const { id } = req.params;
            const ticket = await Ticket.findByPk(id);

            if (!ticket) return res.status(404).json({ error: "Ticket non trouvé." });

            res.json(ticket);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 📌 4️⃣ Supprimer un ticket
    deleteTicket: async (req, res) => {
        try {
            const { id } = req.params;

            const ticket = await Ticket.findByPk(id);
            if (!ticket) return res.status(404).json({ error: "Ticket non trouvé." });

            // Supprimer l'image et le PDF de Cloudinary
            if (ticket.imageUrl) {
                const publicId = ticket.imageUrl.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`tickets/${publicId}`);
            }

            if (ticket.pdfUrl) {
                const publicId = ticket.pdfUrl.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`tickets/${publicId}`);
            }

            await ticket.destroy();

            res.json({ message: "Ticket supprimé avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ticketController;
