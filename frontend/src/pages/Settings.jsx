import React from 'react';
import NavigationContainer from "../components/Navigation/NavigationContainer.jsx";
import ProfileUser from "../components/Settings/ProfileUser/ProfileUser.jsx";
import SettingsUser from "../components/Settings/Settings/SettingsUser.jsx";
import HistoriqueUser from "../components/Settings/HistoriqueUser/HistoriqueUser.jsx";

const Settings = () => {
    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <NavigationContainer/>
            <ProfileUser/>
            <SettingsUser/>
            <HistoriqueUser/>
        </div>
    );
};

export default Settings;