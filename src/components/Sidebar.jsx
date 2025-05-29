
export default function Sidebar({ activeTab, onSelectTab }) {
    const tabs = ['Overview', 'Customers', 'Products', 'Purchases', 'Purchase Items'];

    return (
        <div className="w-48 bg-white shadow rounded p-4 space-y-2">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onSelectTab(tab)}
                    className={`block w-full text-left px-4 py-2 rounded 
            ${activeTab === tab ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-700'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
