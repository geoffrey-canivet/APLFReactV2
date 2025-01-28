import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {useEffect, useState} from "react";
import logo from "../../assets/logo-small.png";
import avat from "../../assets/avat.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faGear,
    faRightFromBracket,
    faTriangleExclamation,
    faUser,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ handleDrawerOpen }) => {
    console.log("handleDrawerOpen:", handleDrawerOpen);
    const navigate = useNavigate();

    const user = useUserStore((state) => state.user);
    console.log(user);

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
                <div className="flex flex-wrap items-center justify-between mx-auto p-2 px-10">
                    {/* Logo et menu */}
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="App Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">APPLAB</span>
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
                    <div className="relative flex items-center dark:text-white">
                        <div className="text-right mr-4">
                            <p className="font-bold text-sm">{user.email}</p>
                            <p className="text-sm text-gray-500">Admin</p>
                        </div>

                        <button
                            id="dropdownUserAvatarButton"
                            onClick={toggleNavDropdown}
                            className="flex text-sm bg-gray-800 rounded focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            type="button"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-10 h-10 rounded" src={avat} alt="User avatar"/>
                        </button>

                        {/* Dropdown menu */}
                        {navDropdown && (
                            <div id="dropdownAvatar"
                                 className="z-50 absolute shadow-xl right-5 mt-64 w-44 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700 dark:divide-gray-600">
                                {/* Email utilisateur */}
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium text-xs truncate">
                                        {user.email}
                                    </div>
                                </div>
                                {/* Liens de navigation */}
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownUserAvatarButton"
                                >
                                    <li>
                                        <a
                                            href="/profil"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <FontAwesomeIcon className="mr-3" icon={faUser}/>
                                            Profil
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
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
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <FontAwesomeIcon
                                                className="mr-3"
                                                icon={faTriangleExclamation}
                                            />
                                            Notifications
                                        </a>
                                    </li>
                                </ul>
                                <hr className="border-gray-200 dark:border-gray-600"/>
                                {/* Déconnexion */}
                                <div className="py-2">
                                    <a
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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