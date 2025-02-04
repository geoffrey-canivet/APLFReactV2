import Calculator from "../Widgets/Calculator.jsx";

const DrawerItem = () => {
    return (
        <>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a
                            href="/dashboard"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default DrawerItem;