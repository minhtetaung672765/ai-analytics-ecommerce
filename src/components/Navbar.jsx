
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
            <div className="flex justify-center space-x-6 mx-auto">
                <Link to="/" className={location.pathname === '/' ? 'font-bold text-blue-600' : ''}>Overview</Link>
                <Link to="/analytics" className={location.pathname === '/analytics' ? 'font-bold text-blue-600' : ''}>AI Analytics</Link>
            </div>
            <div>
                <span className="text-sm text-gray-500">Welcome, User</span>
            </div>
        </div>
    )
}
