import { useEffect, useState } from 'react';
import { fetchJSON } from '../utils/helper';
import Sidebar from '../components/Sidebar';
import CustomerTable from '../components/CustomerTable';
import ProductTable from '../components/ProductTable';
import PurchaseTable from '../components/PurchaseTable';
import PurchaseItemTable from '../components/PurchaseItemTable';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Overview() {
    const [tab, setTab] = useState('Overview');
    const [analytics, setAnalytics] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [purchaseItems, setPurchaseItems] = useState([]);

    useEffect(() => {
        fetchJSON('/api/basic-analytics/').then(setAnalytics);
        fetchJSON('/api/customers/').then(setCustomers);
        fetchJSON('/api/products/').then(setProducts);
        fetchJSON('/api/purchases/').then(setPurchases);
        fetchJSON('/api/purchase-items/').then(setPurchaseItems);
    }, []);

    const renderContent = () => {
        if (tab === 'Overview') return renderOverview();
        if (tab === 'Customers') return <CustomerTable data={customers} />;
        if (tab === 'Products') return <ProductTable data={products} />;
        if (tab === 'Purchases') return <PurchaseTable data={purchases} />;
        if (tab === 'Purchase Items') return <PurchaseItemTable data={purchaseItems} />;
        return null;
    };

    const renderOverview = () => {
        if (!analytics) return <div>Loading...</div>;
        const { summary, top_categories, top_customers } = analytics;
        return (
            <div className="space-y-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard label="Customers" value={summary.total_customers} color="bg-blue-100" />
                    <StatCard label="Products" value={summary.total_products} color="bg-green-100" />
                    <StatCard label="Purchases" value={summary.total_purchases} color="bg-yellow-100" />
                    <StatCard label="Revenue" value={`$${summary.total_revenue}`} color="bg-purple-100" />
                </div>
                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Top Product Categories</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={top_categories}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="product__category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity_sold" fill="#9900cc" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Top Customers</h2>
                    <div className="space-y-3">
                        {top_customers.map((c, i) => (
                            <div key={i} className="flex justify-between bg-gray-50 p-3 rounded border">
                                <span>{c.customer__name}</span>
                                <span className="text-purple-600 font-semibold">${c.total_spent}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex gap-6">
            <Sidebar activeTab={tab} onSelectTab={setTab} />
            <div className="flex-1">{renderContent()}</div>
        </div>
    );
}

function StatCard({ label, value, color }) {
    return (
        <div className={`p-4 rounded shadow ${color}`}>
            <p className=" text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    );
}
