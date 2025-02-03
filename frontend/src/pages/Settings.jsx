import React from 'react';
import NavigationContainer from "../components/Navigation/NavigationContainer.jsx";
import ProfileUser from "../components/Settings/ProfileUser/ProfileUser.jsx";

const Settings = () => {
    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <NavigationContainer/>
            <ProfileUser/>
        </div>
    );
};

export default Settings;