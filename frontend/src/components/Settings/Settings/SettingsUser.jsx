import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faToolbox } from "@fortawesome/free-solid-svg-icons";

const SettingsUser = () => {


    return (
        <div className="pt-5 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4">
                {/* Widgets */}
                <div className="px-5 py-4 bg-gray-800 rounded-md">
                    <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faToolbox} />
                        <span>Widgets</span>
                    </div>
                    <hr className="border-t my-4 border-gray-600" />
                    <ul className="grid w-full gap-6 md:grid-cols-3">
                        <li>
                            <input type="checkbox" id="react-option" className="hidden peer" />
                            <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">React Js</div>
                                    <div className="w-full text-sm">A JavaScript library for UI.</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>

                {/* Préférences */}
                <div className="px-5 py-4 bg-gray-800 rounded-md">
                    <div className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faGear} />
                        <span>Préférences</span>
                    </div>
                    <hr className="border-t my-4 border-gray-600" />
                </div>
            </div>
        </div>
    );
};

export default SettingsUser;
