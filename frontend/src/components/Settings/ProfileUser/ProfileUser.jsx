import React, {useEffect, useState} from 'react';
import avat from "../../../assets/avat.png";
import {
    faAward,
    faBoxArchive,
    faCalculator,
    faCameraRetro,
    faCloudSun, faEarthEurope,
    faGear, faIdCard, faIdCardClip, faLock,
    faToolbox,
    faUser, faUserPen, faUserTag
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useUserStore from "../../../store/useUserStore.js";
import ToastNotification from "sweetalert2";
import Swal from "sweetalert2";
import axios from "axios";
import useLogHistoryStore from "../../../store/useLogHistoryStore.js";
const trophees = import.meta.glob("../../../assets/trophees/*.png", { eager: true });

const ProfileUser = () => {

    const { user, fetchUser, updateUser, loading, error } = useUserStore();
    const { log, getAllLogHistory } = useLogHistoryStore();
    useEffect(() => {
        getAllLogHistory(); // Charger les logs au montage du composant
    }, []);
    console.log("Logs stockés dans Zustand :", log);

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

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
                <div
                    className="dark:bg-gray-800 border  dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center">
                    <span>

                        <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400"  icon={faUserTag} />

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

                            <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400"
                                                 icon={faAward}/>
                                <span>Trophées</span>
                            </div>
                            <div className="flex flex-wrap">
                                {Object.values(trophees).map((image, index) => (
                                    <img className="mr-5 mb-5 w-12 h-12" key={index} src={image.default} alt={`Image ${index + 1}`}/>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md ">
                        {/*modifier profil*/}
                        <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">

                            <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400" icon={faIdCard} />
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
                                <button type="button"
                                        onClick={handleUpdateProfile}
                                        className="text-white justify-center text-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faUserPen}/>
                                    Modifier
                                </button>
                                <button type="button"
                                        className="text-white justify-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faLock}/>
                                    Modifier le mot de passe
                                </button>
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
                        <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400"  icon={faGear} />

                    </span>
                    <h5 className="text-white ml-4 font-bold text-md tracking-wide uppercase">Paramètres</h5>
                </div>
            </div>
            <div className="pt-0 px-3">
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
                                            <FontAwesomeIcon icon={faCalculator} size="xl"/>
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
                                            <FontAwesomeIcon icon={faCloudSun} size="xl"/>
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
                                            <FontAwesomeIcon icon={faEarthEurope} size="xl"/>
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
                                    <input id="inline-checked-radio" type="radio" value=""
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
            <div className="pt-4 px-3">
                <div
                    className="dark:bg-gray-800 border  dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center">
                    <span>

                        <FontAwesomeIcon className="w-6 h-6 text-gray-800 dark:text-blue-400"  icon={faBoxArchive} />
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