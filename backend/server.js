const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(cors());


// Routes
app.get('/', (req, res) => {
    res.send('Server running!');
});

app.get('/api/data', (req, res) => {
    const data = [
        { id: 1, name: "Info1" },
        { id: 2, name: "Info2" },
        { id: 3, name: "Info3" }
    ];
    res.json(data);
});



app.listen(PORT, () => {
    console.log(`Serveur ok 🟢 -> http://localhost:${PORT}`);
    console.log(`Base de donnée Nok 🔴`);
});
