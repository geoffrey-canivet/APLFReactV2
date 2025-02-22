import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import logo from "/src/assets/logo-small.png"
import axios from "axios";
import useUserStore from "../store/useUserStore.js";

const Login = () => {

    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {

        const savedEmail = localStorage.getItem("registeredEmail");
        if (savedEmail) {
            console.log(savedEmail);
            setEmail(savedEmail);
            localStorage.removeItem("registeredEmail");
        }
    }, []);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:3000/auth/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUser(response.data);
                    navigate("/dashboard");
                } catch (error) {
                    console.error("Token invalide ou expiré :", error);
                    localStorage.removeItem("token");
                }
            }
        };

        checkToken();
    }, [navigate, setUser]);


    const handleLogin = async (e) => {
        e.preventDefault();

        if (email ==='' || motDePasse === '') {
            setErrorMessage("Vous devez remplire tout les champs");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password: motDePasse,
            });

            if (response.status === 200) {
                const { token, userData } = response.data;
                console.log("Connexion réussie, token :", token);

                setUser(userData);

                localStorage.setItem('token', token);

                navigate('/dashboard', { state: userData });
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
            }
        }

    };


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2"
                             src={logo}/>
                        APLFinance
                    </a>

                    <div
                        className="w-full bg-white rounded-lg dark:border md:mt-0 shadow-md sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-800">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Connexion
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
                                        Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email"
                                           id="email"
                                           className="bg-gray-50 autofill:bg-gray-800  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="exemple@email.com" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
                                        mot de passe</label>
                                    <input onChange={(e) => setMotDePasse(e.target.value)} type="password"
                                           name="password" id="password" placeholder=""
                                           className="bg-gray-50 autofill:bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-600 rounded bg-gray-800 focus:ring-3 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se
                                                souvenir de moi</label>
                                        </div>

                                    </div>
                                    <a href="#"
                                       className="text-sm font-medium text-primary-600 hover:text-gray-300 dark:text-gray-500">Mot
                                        de passe oublié?
                                    </a>
                                </div>
                                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                                <button type="submit"
                                        className="text-white w-full bg-[#3b5998] hover:bg-[#3b5998]/90
                                           focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50
                                           font-medium rounded-lg text-sm px-5 py-2.5
                                           text-center flex items-center justify-center gap-2
                                           dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white pr-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                                              clipRule="evenodd"/>
                                    </svg>

                                    Connexion
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Pas encore de compte? <a href="/register"
                                                             className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inscription</a>
                                </p>
                            </form>
                            <div id="alert-additional-content-3"
                                 className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                                 role="alert">
                                <div className="flex items-center">
                                    <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <h3 className="text-lg font-medium">Version de démonstration</h3>
                                </div>
                                <div className="mt-2 mb-4 text-sm">
                                    Cette version de démonstration désactive les outils de modification de l'utilisateur. Tous les autres outils restent disponibles pour évaluer au mieux l'application. Pour vous connecter: <span className="underline">user-demo@email.com</span>  - <span className="underline">admin</span>
                                </div>
                                {/*<div className="flex">
                                    <button type="button"
                                            className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                                                  clip-rule="evenodd"/>
                                        </svg>

                                        Plus d'info
                                    </button>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;