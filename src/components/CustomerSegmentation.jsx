import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#9900cc', '#16a34a', '#f97316', '#dc2626'];
// const COLORS = ['#4f46e5', '#16a34a', '#f97316', '#dc2626'];

export default function CustomerSegmentation({ data }) {
    if (!data?.segment_summary || !data?.preview) return null;

    const chartData = Object.entries(data.segment_summary).map(([label, count], i) => ({
        name: label,
        value: count,
    }));

    return (
        <div className="bg-white p-6 rounded shadow-md space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Customer Segmentation</h2>
                <p className="text-gray-600 mb-2">Overview of customer groups based on behavior patterns - determines <b>Potential and Loyalty</b></p>

            </div>

            {/* Pie Chart */}
            <div className="flex justify-center">
                <PieChart width={320} height={240}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            {/* Preview Table */}
            {/* <p className="text-gray-600"><b>Factors:</b> [Spend | Purchase Frequency | Recency ]</p> */}
            <div>
                <h3 className="font-semibold text-gray-700 mb-2">Sample Customers</h3>
                <div className="overflow-auto max-h-64">
                    <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-2 px-3 border">Customer ID</th>
                                <th className="py-2 px-3 border">Spend</th>
                                <th className="py-2 px-3 border">Frequency</th>
                                <th className="py-2 px-3 border">Recency (days)</th>
                                <th className="py-2 px-3 border">Segment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.preview.map((c, idx) => (
                                <tr key={idx} className="text-center even:bg-gray-50">
                                    <td className="border px-3 py-1">{c.CustomerID}</td>
                                    <td className="border px-3 py-1">{c.TotalSpend}</td>
                                    <td className="border px-3 py-1">{c.PurchaseFrequency}</td>
                                    <td className="border px-3 py-1">{c.LastPurchaseDays}</td>
                                    <td className="border px-3 py-1 font-medium text-blue-600">{c.SegmentLabel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
