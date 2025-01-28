import NavBar from "./NavBar.jsx";
import DrawerContainer from "./DrawerContainer.jsx";
import {useState} from "react";
import useUserStore from "../../store/useUserStore.js";

const NavigationContainer = () => {
    const user = useUserStore((state) => state.user);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = (stat) => {
        setDrawerOpen(stat);
    }

    console.log("handleDrawerOpen in NavigationContainer:", handleDrawerOpen);
    return (
        <>
            <NavBar handleDrawerOpen={handleDrawerOpen} />
            <DrawerContainer isDrawerOpen={isDrawerOpen}/>
        </>
    );
};

export default NavigationContainer;