import useUserStore from "../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import NavigationContainer from "../components/Navigation/NavigationContainer.jsx";
import TitrePeriod from "../components/BarTitle/TitrePeriod.jsx";
import TitreOutils from "../components/BarTitle/TitreOutils.jsx";
import {Card} from "@mui/material";

import CardFixe from "../components/Cards/CardFixe.jsx";
import AccordionsCards from "../components/Accordions/AccordionsCards.jsx";
import AccordionsTools from "../components/Accordions/AccordionsTools.jsx";
import SliderSwiper from "../components/Slider/SliderSwiper.jsx";
import FloatingDatePicker from "../components/BarTitle/FloatingDatePicker.jsx";
import FloatingTemplatePicker from "../components/BarTitle/FloatingTemplatePicker.jsx";

const Dashboard = () => {

    const navigate = useNavigate();

    const setUser = useUserStore((state) => state.setUser);
    /*const user = useUserStore((state) => state.user);*/

    const { avatar_url, uploadAvatar, user, showPeriod, showTemplate, fetchUser, updateUser, loading, error } = useUserStore();

    console.log("bouton -> " + showPeriod);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate, setUser]);

    // DECONNEXION
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) {
        return <div className="flex items-center justify-center bg-gray-700 min-h-screen">
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
    }

    return (
        <>
            <div className="dark:bg-gray-900 min-h-screen">
                <NavigationContainer/>
                <div className="pt-16">
                    <SliderSwiper/>
                    <TitrePeriod/>
                    <AccordionsCards/>
                    <TitreOutils/>
                    <AccordionsTools/>

                        {showPeriod ? <FloatingDatePicker/> : null}
                    {showTemplate ? <FloatingTemplatePicker/> : null}




                </div>
            </div>
        </>
    );
};

export default Dashboard;
