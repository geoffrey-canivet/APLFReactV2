import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/data')
            .then((response) => {
                console.log('Données reçues :', response.data); // Vérifie ici
                setData(response.data); // Stocker les données
            })
            .catch((error) => {
                console.error('Erreur:', error);
            });
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <div>
            <h1 className="text-3xl">Mon Application React</h1>
            <ul>
                {data.map((data) => (
                    <li key={data.id} className="text-lg">
                        {data.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
