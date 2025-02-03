import React, {useEffect, useState} from 'react';
import avat from "../../../assets/avat.png";
import {
    faBoxArchive,
    faCalculator,
    faCameraRetro,
    faCloudSun, faEarthEurope,
    faGear,
    faToolbox,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useUserStore from "../../../store/useUserStore.js";
import ToastNotification from "sweetalert2";
import Swal from "sweetalert2";
import axios from "axios";

const ProfileUser = () => {

    const { user, fetchUser, updateUser, loading, error } = useUserStore();

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    // UPLOAD IMG
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // 📌 Stocker l’image sélectionnée
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Sélectionne une image d'abord !");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const token = localStorage.getItem("token"); // 🔥 Authentification
            const response = await axios.post("http://localhost:3000/auth/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            setImageUrl(response.data.imageUrl);
            alert("Image uploadée avec succès !");
        } catch (error) {
            console.error("Erreur d'upload :", error);
        }
    };






    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setFirstName(user.firstName || "");
            setEmail(user.email || "");
        }
    }, [user]);

    useEffect(() => {
        fetchUser();
    }, []);

    // Configure Toast
    const ToastNotification = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1F2937",
        color: "#FFFFFF",
        customClass: {
            popup: "rounded-lg shadow-lg",
        },
    });

    // Formater la date de la derniere maj
    const formattedDate = user?.updatedAt
        ? new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Format 24h
            timeZone: "Europe/Paris"
        }).format(new Date(user.updatedAt))
        : "Non disponible"; // Valeur par défaut si `updatedAt` est vide

    const handleUpdateProfile = async () => {
        try {
            await updateUser({ name, firstName, email });
            fetchUser();
            ToastNotification.fire({
                icon: "success",
                title: `Mis a jour avec succès.`,
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            alert("Erreur lors de la mise à jour du profil");
        }
    };


    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            {/*PROFILE*/}
            <div className="pt-20 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 ">
                    <div className="px-5 py-4 bg-gray-800 rounded-md flex flex-col">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faCameraRetro}/>
                                <span>Photo de profile</span>
                            </div>
                            <div className="flex items-center">
                                {/*Photo*/}
                                <div className="">
                                    <img src={avat} width="120px" alt="App Logo"/>
                                </div>
                                {/*infos*/}
                                <div className="ml-3">
                                    {/*Status*/}
                                    <div className="mb-2">
                                    <span
                                        className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        Utilisateur</span>
                                    </div>
                                    {/*Nom*/}
                                    <div className="text-2xl font-bold text-white">
                                        {user?.name} {user?.firstName}
                                    </div>
                                    {/*email*/}
                                    <div className="italic text-sm mb-2 font-semibold text-gray-500">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                            <hr className="border-t my-4 border-gray-600"/>
                            <div className="grid grid-cols-2">
                                <div className="">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                           htmlFor="file_input">Modifier</label>
                                    <input
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        aria-describedby="file_input_help" id="file_input" type="file"/>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                       id="file_input_help">SVG,
                                        PNG, JPG GIF (MAX. 800x400px)</p>
                                </div>
                                <div className="">
                                    <button type="button"
                                            onClick={handleUpload}
                                            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                        <svg className="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor"
                                             viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                  d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                                                  clipRule="evenodd"/>
                                        </svg>


                                        Modifier
                                    </button>
                                </div>

                                <form>
                                    <label htmlFor="search"
                                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                            </svg>
                                        </div>
                                        <input type="search" id="search"
                                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="Search" required/>
                                        <button type="submit"
                                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                                        </button>
                                    </div>
                                </form>


                                {imageUrl && (
                                    <div>
                                        <p>Image de profil :</p>
                                        <img src={imageUrl} alt="Avatar" width="100"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md ">
                        {/*modifier profil*/}
                        <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <FontAwesomeIcon icon={faUser}/>
                            <span>Informations </span>
                        </div>
                        <form>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="Nom"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                    <input type="text" id="Nom"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label htmlFor="Prénom"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                                    <input type="text" id="Prénom"
                                            value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label htmlFor="Email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" id="Email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label htmlFor="Autre"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dernière mise à jour</label>
                                    <input type="text" id="Autre"
                                           disabled={true}
                                           placeholder={formattedDate}
                                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </div>
                            <hr className="border-t my-4 border-gray-600"/>
                            <div className="">
                                <button type="button"
                                        onClick={handleUpdateProfile}
                                        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <svg className="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Modifier
                                </button>
                                <button type="button"
                                        onClick={handleUpdateProfile}
                                        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <svg className="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Modifier le mot de passe
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            {/*     Settings*/}
            <div className="pt-5 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 ">
                    <div className="px-5 py-4 bg-gray-800 rounded-md">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faToolbox}/>
                                <span>Widgets</span>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>

                            <ul className="grid w-full gap-6 md:grid-cols-3">
                                <li>
                                    <input type="checkbox" id="calculatrice-widget" value="" className="hidden peer"
                                           required=""/>
                                    <label htmlFor="calculatrice-widget"
                                           className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="block text-center">
                                            <FontAwesomeIcon icon={faCalculator} size="xl" />
                                            <div className="w-full text-lg font-semibold">Calculatrice</div>
                                            <div className="w-full text-sm">Simple mais efficace.
                                            </div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="meteo-widget" value="" className="hidden peer"/>
                                    <label htmlFor="meteo-widget"
                                           className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="block  text-center">
                                            <FontAwesomeIcon icon={faCloudSun} size="xl" />
                                            <div className="w-full text-lg font-semibold">Météo</div>
                                            <div className="w-full text-sm">Avec l'API open-meteo.com
                                            </div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="devise-widget" value="" className="hidden peer"/>
                                    <label htmlFor="devise-widget"
                                           className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="block  text-center">
                                            <FontAwesomeIcon icon={faEarthEurope} size="xl" />
                                            <div className="w-full text-lg font-semibold">Devise</div>
                                            <div className="w-full text-sm">Converteur de devise.</div>
                                        </div>
                                    </label>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faGear}/>
                                <span>Préférences</span>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer"/>
                                <div
                                    className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                <span
                                    className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Small toggle</span>
                            </label>
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer"/>
                                <div
                                    className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                <span
                                    className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Small toggle</span>
                            </label>

                            <div className="flex">
                                <div className="flex items-center me-4">
                                    <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="inline-radio"
                                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        1</label>
                                </div>
                                <div className="flex items-center me-4">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="inline-2-radio"
                                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        2</label>
                                </div>
                                <div className="flex items-center me-4">
                                    <input checked id="inline-checked-radio" type="radio" value=""
                                           name="inline-radio-group"
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="inline-checked-radio"
                                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        checked</label>
                                </div>
                                <div className="flex items-center">
                                    <input disabled id="inline-disabled-radio" type="radio" value=""
                                           name="inline-radio-group"
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="inline-disabled-radio"
                                           className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline
                                        disabled</label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           {/* Historique*/}
            <div className="pt-5 px-3">
                <div className="px-5 py-4 bg-gray-800 rounded-md">
                    <div className="">
                        <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <FontAwesomeIcon icon={faBoxArchive}/>
                            <span>Historique</span>
                        </div>
                        <div className="">
                            <hr className="border-t my-4 border-gray-600"/>
                        </div>


                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        Silver
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">
                                        White
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop PC
                                    </td>
                                    <td className="px-6 py-4">
                                        $1999
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        Black
                                    </td>
                                    <td className="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfileUser;