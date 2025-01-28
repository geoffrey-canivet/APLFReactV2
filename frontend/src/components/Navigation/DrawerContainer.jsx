import DrawerItem from "./DrawerItem.jsx";

const DrawerContainer = ({ isDrawerOpen }) => {
    return (
        <>
            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-50 h-screen mt-14 p-4 overflow-y-auto transition-transform bg-white w-64 dark:bg-gray-800 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
                tabIndex="-1"
                aria-labelledby="drawer-navigation-label"
            >
                <h5
                    id="drawer-navigation-label"
                    className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                >
                    Menu
                </h5>
                {/* Conteneur principal */}
                <div className="flex flex-col">
                    <DrawerItem/>
                    {/* Météo en bas */}

                </div>
            </div>
        </>
    );
};

export default DrawerContainer;