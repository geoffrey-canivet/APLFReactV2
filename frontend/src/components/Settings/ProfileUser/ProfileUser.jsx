import React, {useEffect, useState} from 'react';
import avat from "../../../assets/avatar.png";
import {faIdCard, faIdCardClip, faImage, faLock, faUserPen, faUserTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useUserStore from "../../../store/useUserStore.js";
import Swal from "sweetalert2";
import Toast from "sweetalert2";

const ProfileUser = () => {

    const { avatar_url, uploadAvatar, showPeriod, user, fetchUser, updateUser, loading, toggleShowPeriod, error } = useUserStore();

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

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
        await Toast.fire({
            icon: "success",
            title: "Photo modifiée avec succes !",
            background: "#1F2937",
            color: "#ffffff"
        });
        setSelectedFile(null);
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
        /*try {
            await updateUser({ name, firstName, email });
            fetchUser();
            ToastNotification.fire({
                icon: "success",
                title: `Mis a jour avec succès.`,
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            alert("Erreur lors de la mise à jour du profil");
        }*/
        await Swal.fire({
            title: "Version de démonstration",
            text: "La modification des données utilisateur sont bloquée dans la version de démonstration.",
            icon: "info"
        });
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
                                        maxWidth: "120px",
                                        maxHeight: "120px",
                                        minWidth: "120px",
                                        minHeight: "120px",
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
                                            onClick={handleUpdateProfile}
                                            className="flex-1 text-white justify-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                        <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faLock}/>
                                        Modifier le mot de passe
                                    </button>
                                </div>

                                <button type="button"
                                        onClick={handleUpdateProfile}
                                        className="text-white justify-center bg-orange-500 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faLock}/>
                                    Désinscription
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>


        </>
    );
};

export default ProfileUser;