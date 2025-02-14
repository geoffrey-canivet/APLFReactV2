import React, {useEffect, useState} from 'react';
import avat from "../../../assets/avat.png";
import {
    faAward,
    faBoxArchive,
    faCalculator,
    faCameraRetro, faCartShopping, faCheck,
    faCloudSun, faEarthEurope, faEllipsis,
    faGear, faIdCard, faIdCardClip, faImage, faLock, faRectangleList, faStar,
    faToolbox, faTrash,
    faUser, faUserPen, faUserTag
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useUserStore from "../../../store/useUserStore.js";
import ToastNotification from "sweetalert2";
import Swal from "sweetalert2";
import axios from "axios";
import useLogHistoryStore from "../../../store/useLogHistoryStore.js";
import { HexColorPicker } from "react-colorful";
import useCommerceStore from '../../../store/useCommerceStore.js';

const trophees = import.meta.glob("../../../assets/trophees/*.png", { eager: true });

const ProfileUser = () => {

    const {deleteCommerce, commerces, fetchCommerces, createCommerce } = useCommerceStore();
    const { avatar_url, uploadAvatar, user, fetchUser, updateUser, loading, error } = useUserStore();
    const { log, getAllLogHistory } = useLogHistoryStore();
    useEffect(() => {
        getAllLogHistory();
    }, []);
    console.log("Logs stockés dans Zustand :", log);

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [color, setColor] = useState("#aabbcc");
    const [commerceName, setCommerceName] = useState("");

    useEffect(() => {
        fetchCommerces();
    }, []);

    // image profile
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Modifier photo profile
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        await uploadAvatar(selectedFile);
        fetchUser();
        setSelectedFile(null);
    };

    // Ajouter un commerce
    const handleAddCommerce = async () => {
        const newCommerce = {
            label: commerceName,
            value: commerceName,
            color: color,
        };

        await createCommerce(newCommerce);
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
            hour12: false,
            timeZone: "Europe/Paris"
        }).format(new Date(user.updatedAt))
        : "Non disponible";

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



    if (loading) return <div className="flex items-center justify-center bg-gray-700 min-h-screen">
        <div role="status">
            <svg aria-hidden="true"
                 className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <style>
                {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #74C0FC; /* Couleur de la barre */
                    border-radius: 4px; /* Coins arrondis */
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #58a7e0; /* Couleur au survol */
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: transparent; /* Fond invisible */
                }

                .hover\\:overflow-y-auto:hover {
                    overflow-y: auto; /* Activer le scroll au survol */
                }

                .hover\\:overflow-y-hidden {
                    overflow-y: hidden; /* Désactiver le scroll par défaut */
                }
                `}
            </style>
            {/*PROFILE*/}
            <div className="pt-20 px-3">
                <div
                    className="dark:bg-gray-800 border  dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center">
                    <span>

                        <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400" icon={faUserTag}/>

                    </span>

                    <h5 className="text-white ml-4 font-bold text-md tracking-wide uppercase">utilisateur</h5>

                </div>
            </div>
            <div className="pt-0 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 ">
                    <div className="px-5 py-4 bg-gray-800 rounded-md flex flex-col">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400"
                                                 icon={faIdCardClip}/>
                                <span>Photo</span>
                            </div>
                            <div className="flex items-center">
                                {/*Photo*/}
                                <div className="">
                                    <img src={user?.avatar_url || avat} style={{
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "15%",
                                        marginTop: "1rem"
                                    }} alt="App Logo"/>
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

                            {/*                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400"
                                                 icon={faAward}/>
                                <span>Trophées</span>
                            </div>
                            <div className="flex flex-wrap">
                                {Object.values(trophees).map((image, index) => (
                                    <img className="mr-5 mb-5 w-12 h-12" key={index} src={image.default} alt={`Image ${index + 1}`}/>
                                ))}
                            </div>*/}


                            <div>
                                <div className="flex  mb-2">
                                    <h2 className="text-white mr-2">Modifier la photo de profil</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400"
                                       id="file_input_help">(MAX. 5Mo)</p>
                                </div>

                                <form onSubmit={handleUpload}>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}/>

                                    <button type="submit"
                                            disabled={loading}
                                            className="text-white mt-3 justify-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">

                                        <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faImage}/>
                                        {loading ? "Uploading..." : "Modifier la photo"}

                                    </button>
                                </form>
                                {error && <p style={{color: "red"}}>{error}</p>}
                            </div>

                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md ">
                        {/*modifier profil*/}

                        <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">

                            <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400" icon={faIdCard}/>
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
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dernière
                                        mise à jour</label>
                                    <input type="text" id="Autre"
                                           disabled={true}
                                           placeholder={formattedDate}
                                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </div>
                            <hr className="border-t my-4 border-gray-600"/>
                            <div className="flex flex-col">
                                <div className="flex gap-2">
                                    <button type="button"
                                            onClick={handleUpdateProfile}
                                            className="flex-1 text-white justify-center text-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                        <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faUserPen}/>
                                        Modifier
                                    </button>
                                    <button type="button"
                                            className="flex-1 text-white justify-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                        <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faLock}/>
                                        Modifier le mot de passe
                                    </button>
                                </div>

                                <button type="button"
                                        className="text-white justify-center bg-orange-500 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faLock}/>
                                    Désinscription
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            {/*     Settings*/}
            <div className="pt-4 px-3">
                <div
                    className="dark:bg-gray-800 border  dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center">
                    <span>
                        <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400" icon={faGear}/>

                    </span>
                    <h5 className="text-white ml-4 font-bold text-md tracking-wide uppercase">Paramètres</h5>
                </div>
            </div>
            <div className="pt-0 px-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 ">
                    <div className="px-5 py-4 bg-gray-800 rounded-md">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon className="text-gray-800 dark:text-blue-400" icon={faCartShopping}/>
                                <span>Ajouter un commerce</span>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>

                            <div className="">
                                <HexColorPicker color={color} onChange={setColor}
                                                style={{width: "150px", height: "150px", margin: "auto"}}/>
                            </div>
                            <input type="text" id="Prénom"
                                   onChange={(e) => setCommerceName(e.target.value)}
                                   placeholder="Nom du commerce"
                                   className="block w-full p-2 mt-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <button type="button"
                                    onClick={handleAddCommerce}
                                    className="flex-1 mt-3 text-white justify-center text-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">

                                <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faCheck}/>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon className="text-gray-800 dark:text-blue-400" icon={faRectangleList}/>
                                <span>Liste de commerces</span>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>

                            <div
                                className="relative w-full h-64 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <tbody>
                                    {commerces.map((commerce) => (
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {commerce.label}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    style={{backgroundColor: commerce.color}}
                                                    className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm"
                                                >
                                                  {commerce.color}
                                                </span>

                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => {
                                                        deleteCommerce(commerce.id)
                                                    }}
                                                    className="dropdown text-gray-500 hover:text-blue-500 dark:hover:text-red-400"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon className="text-gray-800 dark:text-blue-400" icon={faStar}/>
                                <span>Mes commerces</span>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* Historique*/}
            <div className="pt-4 px-3">
                <div
                    className="dark:bg-gray-800 border  dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center">
                    <span>

                        <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400" icon={faBoxArchive}/>
                    </span>
                    <h5 className="text-white ml-4 font-bold text-md tracking-wide uppercase">historique</h5>
                </div>
            </div>
            <div className="pt-0 px-7">
                <div className="px-5 py-4 bg-gray-800 rounded-md">
                    <div className="">

                        <div className="relative overflow-x-auto">

                            {loading ? (
                                <p className="text-white">Chargement des logs...</p>
                            ) : error ? (
                                <p className="text-red-500">Erreur : {error}</p>
                            ) : log.length === 0 ? (
                                <p className="text-white">Aucun log disponible</p>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                                    <tr>
                                        <th className="px-6 py-3">Nom</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {log.map((log) => (
                                        <tr key={log.id} className="bg-gray-800 border-b border-gray-600">
                                            <td className="px-6 py-4 text-white">{log.name}</td>
                                            <td className="px-6 py-4">{log.type === 'CREATE' ?
                                                <span
                                                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Create</span> :
                                                log.type === 'UPDATE' ? <span
                                                        className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">Update</span> :
                                                    log.type === 'DELETE' ? <span
                                                            className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Delete</span> :
                                                        log.type === 'DELETE_ALL' ? <span
                                                                className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">Del_all</span> :
                                                            log.type === 'DELETE_BY_CATEGORY' ? <span
                                                                className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-pink-900 dark:text-pink-300">Delete_by_category</span> : log.type
                                            }</td>
                                            <td className="px-6 py-4">{log.date} - {log.time}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfileUser;