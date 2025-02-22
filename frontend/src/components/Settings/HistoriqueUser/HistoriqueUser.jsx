import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxArchive} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect} from "react";
import useLogHistoryStore from "../../../store/useLogHistoryStore.js";
import useUserStore from "../../../store/useUserStore.js";

const HistoriqueUser = () => {

    const { avatar_url, uploadAvatar, showPeriod, user, fetchUser, updateUser, loading, toggleShowPeriod, error } = useUserStore();

    const { log, getAllLogHistory } = useLogHistoryStore();

    useEffect(() => {
        getAllLogHistory();
    }, []);


    return (
        <>

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
            <div className="pt-0 px-7 pb-5">
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
                                <div className="relative w-full h-96 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
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
                                </div>

                            )}
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default HistoriqueUser;