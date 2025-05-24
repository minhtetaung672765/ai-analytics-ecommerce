
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {

    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
            <div className="font-bold text-lg">JumpStart</div>
            <div className="flex justify-center space-x-6 mx-auto">
                <Link to="/" className={location.pathname === '/' ? 'font-bold text-blue-600' : ''}>Overview</Link>
                <Link to="/analytics" className={location.pathname === '/analytics' ? 'font-bold text-blue-600' : ''}>AI Analytics</Link>
            </div>
            {/* <div>
                <span className="text-sm text-gray-500">Welcome, User</span>
            </div> */}
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
    )
}
