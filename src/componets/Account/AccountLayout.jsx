import { Outlet, useMatch } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function AccountLayout() {
    const isMobile = useMediaQuery(1024);
    
    // Check if we are at the exact root '/profile' page without sub-paths
    const isRootProfile = useMatch({ path: '/profile', end: true });

    if (isMobile) {
        // On mobile: Show ONLY Sidebar at root, otherwise show ONLY the selected page
        if (isRootProfile) {
            return <Sidebar />;
        }
        return (
            <div className="w-full bg-white">
                <Outlet />
            </div>
        );
    }

    return (
        <div className="flex h-[800px] my-5 bg-white shadow-xl rounded-3xl container mx-auto overflow-hidden border border-gray-100">

            {/* LEFT SIDEBAR */}
            <div className="w-[320px] border-r border-gray-100 bg-[#F8F8F8]">
                <Sidebar />
            </div>

            {/* RIGHT DEFAULT PAGE (Content) */}
            <div className="flex-1 p-6 overflow-y-auto relative">
                <Outlet />
            </div>

        </div>
    );
}