import {useState} from 'react';
import axios from "axios";
import logo from "../assets/logo-small.png";

const Register = () => {

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Erreur
        if (name === "" || firstName === "" || email === "" || password === "" || confirmPassword === "") {
            setError("Vous devez remplire tout les champs");
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe sont différent");
            return;
        }
        setError("");

        // Envois des données vers backend
        console.log(name, firstName, email, password);
        try {
            const response = await axios.post("http://localhost:3000/auth/register", {
                name,
                firstName,
                email,
                password,
            })
            // Succès
            setSuccess("Utilisateur créé avec succès !");
            setName("");
            setFirstName("")
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            console.log("Réponse du serveur :", response.data);
        }  catch (err) {
            // Gestion des erreurs
            console.error(err);
            if (err.response && err.response.data) {
                setError(err.response.data.error || "Erreur inconnue");
            } else {
                setError("Erreur serveur. Veuillez réessayer.");
            }
        }
    }



    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img alt="logo" className="w-8 h-8 mr-2" src={logo}/>APLFinance
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Inscription
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="nom"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
                                        nom</label>
                                    <input type="text" name="nom"
                                           id="nom"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Musk" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="prénom"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
                                        Prénom</label>
                                    <input type="text" name="prénom"
                                           id="prénom"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Elon" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse
                                        Email</label>
                                    <input type="text" name="email"
                                           id="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="elonMusk@mail.com" required=""/>
                                </div>
                                <div>

                                </div>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="pass"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot
                                            de passe</label>
                                        <input type="password" id="pass"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder=". . . . . ."/>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPass"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmation</label>
                                        <input type="password" id="confirmPass"
                                               value={confirmPassword}
                                               onChange={(e) => setConfirmPassword(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder=". . . . . ."/>
                                    </div>
                                </div>
                                {error ? <p className="text-red-500">{error}</p> : null}
                                {success ? <p className="text-green-500">{success}</p> : null}
                                <button type="submit"
                                        className="text-white w-full bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white pr-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                                              clipRule="evenodd"/>
                                    </svg>

                                    <p className="text-center">Inscription</p>
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Vous avez déja un compte? <a href="/login"
                                                                 className="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez-vous</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;