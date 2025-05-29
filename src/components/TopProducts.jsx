import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function TopProducts({ data }) {
    const products = data?.top_products || [];

    if (products.length === 0) return null;

    const chartData = products.map(item => ({
        name: item.product__name,
        quantity: item.total_quantity,
        revenue: parseFloat(item.total_revenue),
        category: item.product__category
    }));

    return (
        <div className="bg-white p-6 rounded shadow-md space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Top Products</h2>
                <p className="text-gray-600">Top-selling products based on quantity and revenue</p>
            </div>

            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#9900cc" name="Units Sold" />
                        <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
