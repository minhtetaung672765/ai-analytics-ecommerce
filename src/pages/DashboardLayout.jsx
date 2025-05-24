import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <Navbar />

            {/* Dynamic Content */}
            <div className="p-6">
                <Outlet />
            </div>
        </div >
    );
}
