import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faCheck,
    faGear,
    faRectangleList, faRotate, faScrewdriverWrench,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {HexColorPicker} from "react-colorful";
import React, {useEffect, useState} from "react";
import useCommerceStore from "../../../store/useCommerceStore.js";
import useUserStore from "../../../store/useUserStore.js";
import Swal from "sweetalert2";


const SettingsUser = () => {

    const { avatar_url, uploadAvatar, showPeriod, showTemplate, toggleShowTemplate, user, fetchUser, updateUser, loading, toggleShowPeriod, error } = useUserStore();

    const {deleteCommerce, commerces, fetchCommerces, createCommerce } = useCommerceStore();

    const [color, setColor] = useState("#aabbcc");
    const [commerceName, setCommerceName] = useState("");
    const [btnFloatPeriod, setBtnFloatPeriod] = useState(true);
    const [btnFloatTemplate, setBtnFloatTemplate] = useState(true);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        fetchCommerces();
    }, []);

    // Ajouter un commerce
    const handleAddCommerce = async () => {
        if (commerceName === "") {

        } else {
            const newCommerce = {
                label: commerceName,
                value: commerceName,
                color: color,
            };

            await createCommerce(newCommerce);
            setCommerceName("")
            await Toast.fire({
                icon: "success",
                title: "Commerce ajouté avec succes !",
                background: "#1F2937",
                color: "#ffffff"
            });

        }

    };

    // Supprimer un commerce
    const handleDeleteCommerce = async (commerceId) => {
        Swal.fire({
            color: "#ffffff",
            background: "#1F2937",
            title: "Supprimer le commerce ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33", // Rouge pour confirmer
            cancelButtonColor: "#3085d6", // Bleu pour annuler
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCommerce(commerceId); // Exécute la suppression si confirmé
                Toast.fire({
                    icon: "success",
                    title: "Commerce supprimé avec succes !",
                    background: "#1F2937",
                    color: "#ffffff"
                });
            }
        });
    };

    // Activer / désactiver btn Periode
    const handleClickBtnFloatPeriod = () => {
        toggleShowPeriod()

        if (btnFloatPeriod) {
            Toast.fire({
                icon: "success",
                title: "Bouton Périodes désactivé",
                background: "#1F2937",
                color: "#ffffff"
            })
            setBtnFloatPeriod(false);
        } else {
            Toast.fire({
                icon: "success",
                title: "Bouton Périodes activé",
                background: "#1F2937",
                color: "#ffffff"
            })
            setBtnFloatPeriod(true);
        }
    }

    // Activer / désactiver btn Template
    const handleClickBtnFloatTemplate = () => {
        toggleShowTemplate()

        if (btnFloatTemplate) {
            Toast.fire({
                icon: "success",
                title: "Bouton Template désactivé",
                background: "#1F2937",
                color: "#ffffff"
            })
            setBtnFloatTemplate(false);
        } else {
            Toast.fire({
                icon: "success",
                title: "Bouton Template activé",
                background: "#1F2937",
                color: "#ffffff"
            })
            setBtnFloatTemplate(true);
        }
    }

    return (
        <>

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
                                   value={commerceName}
                                   onChange={(e) => setCommerceName(e.target.value)}
                                   placeholder="Nom du commerce"
                                   className="block w-full p-2 mt-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <button type="button"
                                    onClick={handleAddCommerce}
                                    className=" flex-1 mt-3 text-white justify-center text-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg mt-1 text-sm px-3 py-2 inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">

                                <FontAwesomeIcon className=" pr-2 w-4 h-4" icon={faCheck}/>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800 rounded-md">
                        <div className="">
                            <div className="text-xl font-bold text-white mb-6 flex justify-between items-center space-x-2">
                                <div className="">
                                    <FontAwesomeIcon className="text-gray-800 mr-3 dark:text-blue-400" icon={faRectangleList}/>
                                    <span>Liste de commerces</span>
                                </div>
                                <div className="">
                                    <FontAwesomeIcon className="mr-7 w-4 h-4 dark:text-gray-400" icon={faRotate} />
                                </div>

                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>

                            <div
                                className="relative w-full h-64 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <tbody>
                                    {commerces.map((commerce) => (
                                        <tr key={commerce.id}>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {commerce.label}
                                                {commerce.userId ?
                                                    <span className="ml-2">🔵</span> :
                                                    null
                                                }
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    style={{backgroundColor: commerce.color}}
                                                    className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm"
                                                >
                                                  {commerce.color}
                                                </span>

                                            </td>
                                            {commerce.userId ?
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteCommerce(commerce.id)
                                                        }}
                                                        className="dropdown text-gray-500 hover:text-blue-500 dark:hover:text-red-400"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </td>
                                                :
                                                null
                                            }

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
                                <FontAwesomeIcon className="text-gray-800 dark:text-blue-400"
                                                 icon={faScrewdriverWrench}/>
                                <span>Préférences</span>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>

                            <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Affichage du bouton Périodes
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="showPeriodToggle"
                                        type="checkbox"
                                        checked={showPeriod}
                                        onChange={handleClickBtnFloatPeriod}
                                        className="w-4 h-4 border border-gray-600 rounded bg-gray-800 focus:ring-3 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    {showPeriod
                                        ?
                                        <label htmlFor="showPeriodToggle"
                                               className="text-gray-500 dark:text-gray-300">Activé</label>
                                        :
                                        <label htmlFor="showPeriodToggle"
                                               className="text-gray-500 dark:text-gray-500">Désactivé</label>
                                    }
                                </div>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>

                            <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Affichage du bouton
                                Templates
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="showTemplateToggle"
                                        type="checkbox"
                                        checked={showTemplate}
                                        onChange={handleClickBtnFloatTemplate}
                                        className="w-4 h-4 border border-gray-600 rounded bg-gray-800 focus:ring-3 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    {showTemplate
                                        ?
                                        <label htmlFor="showTemplateToggle"
                                               className="text-gray-500 dark:text-gray-300">Activé</label>
                                        :
                                        <label htmlFor="showTemplateToggle"
                                               className="text-gray-500 dark:text-gray-500">Désactivé</label>
                                    }
                                </div>
                            </div>
                            <div className="">
                                <hr className="border-t my-4 border-gray-600"/>
                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default SettingsUser;
