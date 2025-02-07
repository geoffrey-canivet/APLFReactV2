import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {useEffect, useState} from "react";
import logo from "../../assets/logo-small.png";
import avat from "../../assets/avat.png";
import logo2 from "../../assets/logo2.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars, faCircleHalfStroke,
    faGear, faLandMineOn,
    faRightFromBracket,
    faTriangleExclamation,
    faUser,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import useTransactionStore from "../../store/useTransactionStore.js";

const NavBar = ({ handleDrawerOpen }) => {

    const { deleteAllTransactions} = useTransactionStore();

    const navigate = useNavigate();

    const { user, fetchUser, updateUser, loading, error } = useUserStore();

    const handleDellAllTransactions = async () => {
        console.log("click")
        await deleteAllTransactions();
        console.log("✅ Suppression terminée, redirection...");
        window.location.href = "/dashboard"
    }


    // Gestion du dropdown
    const [navDropdown, setNavDropdown] = useState(false);
    const toggleNavDropdown = () => {
        setNavDropdown((prev) => !prev);
    };

    // Gestion du drawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    useEffect(() => {
        handleDrawerOpen(drawerOpen);
    }, [drawerOpen, handleDrawerOpen]);

    const toggleNavDrawer = () => {
        setDrawerOpen(!drawerOpen)
    };

    // ACTION DROPDOWN
    // DECONNEXION
    const handleLogout = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem("token");

        // Rediriger vers la page de connexion
        navigate("/login");
    };

    return (
        <>
            {(drawerOpen || navDropdown) && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm"
                    onClick={() => {
                        setDrawerOpen(false); // Ferme le drawer
                        setNavDropdown(false); // Ferme le dropdown utilisateur
                    }}
                ></div>
            )}
            <nav
                className="bg-white dark:bg-gray-800 fixed w-full z-30 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap items-center justify-between mx-auto p-2 px-5 sm:px-10">
                    {/* Logo et menu */}
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo2} className="h-6 sm:h-8" alt="App Logo"/>
                        <button
                            id="dbtn"
                            onClick={toggleNavDrawer}
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-transparent rounded-lg text-sm py-1.5 px-2"
                            type="button"
                        >
                            {drawerOpen ? <FontAwesomeIcon icon={faXmark}/> : <FontAwesomeIcon icon={faBars}/>
                            }

                        </button>
                    </div>

                    {/* Dropdown utilisateur */}
                    <div
                        onClick={toggleNavDropdown}
                        className="cursor-pointer relative flex items-center dark:text-white">
                        <img className="mr-4 hidden sm:block w-10 h-10 rounded" src={avat} alt="User avatar"/>
                        <div className="text-center">
                            <p className="font-bold text-center text-sm">{user?.firstName}</p>
                            <span
                                className="bg-blue-100 text-center text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-300">
                                Utilisateur
                            </span>
                        </div>

                        {/* Dropdown menu */}
                        {navDropdown && (
                            <div id="dropdownAvatar"
                                 className="z-50 absolute shadow-xl right-5 mt-64 w-44 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700 dark:divide-gray-600">
                                {/* Email utilisateur */}
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium text-xs truncate">
                                        <FontAwesomeIcon className="mr-3" icon={faUser}/>
                                        {user?.email}
                                    </div>
                                </div>
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownUserAvatarButton"
                                >
                                    <li>
                                        <a
                                            className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <FontAwesomeIcon className="mr-3" icon={faCircleHalfStroke}/>
                                            Mode
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/settings"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <FontAwesomeIcon className="mr-3" icon={faGear}/>
                                            Réglages
                                        </a>
                                    </li>
                                </ul>
                                <hr className="border-gray-200 dark:border-gray-600"/>
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownUserAvatarButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            onClick={handleDellAllTransactions}
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-yellow-400 dark:hover:text-white"
                                        >
                                            <FontAwesomeIcon className="mr-3" icon={faTriangleExclamation}/>
                                            Init Month
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-red-400 dark:hover:text-white"
                                        >
                                            <FontAwesomeIcon className="mr-3" icon={faLandMineOn}/>
                                            Init All
                                        </a>
                                    </li>
                                </ul>
                                <hr className="border-gray-200 dark:border-gray-600"/>
                                {/* Déconnexion */}
                                <div className="py-2">
                                    <a
                                        onClick={handleLogout}
                                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-red-400 dark:hover:bg-red-400 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        <FontAwesomeIcon
                                            className="mr-3"
                                            icon={faRightFromBracket}
                                        />
                                        Déconnexion
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;