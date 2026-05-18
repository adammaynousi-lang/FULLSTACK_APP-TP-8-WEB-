// backend/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares globaux
app.use(express.json());
app.use(cors()); // À configurer correctement en production

// Connexion Base de Données
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Liaisons MongoDB Atlas établies."))
  .catch(err => console.error("Erreur de connexion DB :", err));

const PORT = process.env.PORT || 5000;
// 1. Déclarer l'accès aux fichiers statiques du build React
app.use(express.static(path.join(__dirname, "../frontend/build")));

// 2. Gestionnaire universel (Catch-all) pour le routage côté client (React Router)
// Tout chemin qui ne correspond pas à une route API renvoie l'index.html de React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Lancement du serveur d'intégration
app.listen(PORT, () => {
  console.log(`Serveur de production actif sur le port ${PORT}`);
});