import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <div className="flex justify-between items-start px-6 py-4 ">
            {/* Logo */}
            <div className="font-bold text-2xl">JumpStart</div>

            {/* Center nav links */}
            <div className="mx-auto mt-5 mb-3 bg-purple-200 border border-purple-300 rounded-full  flex ">
                <Link
                    to="/"
                    className={`px-7 py-3 text-[19px] rounded-full ${location.pathname === '/' ? 'bg-purple-100 border border-purple-300 text-black-700 font-semibold' : 'text-gray-800'
                        }`}
                >
                    Overview
                </Link>
                <Link
                    to="/analytics"
                    className={`px-7 py-3 text-[19px] rounded-full ${location.pathname === '/analytics' ? 'bg-purple-100 border-purple-300 text-black-700 font-semibold' : 'text-gray-800'
                        }`}
                >
                    AI Analytics
                </Link>
            </div>

            {/* Right-side user info */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user?.username}</span>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
