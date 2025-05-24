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
import { useState } from 'react';

export default function DiscountUsage({ data }) {
    const usage = data?.discount_usage_by_age_group || {};
    const [view, setView] = useState('quantity'); // or 'revenue'

    if (!Object.keys(usage).length) return null;

    const chartData = Object.entries(usage).map(([ageGroup, values]) => ({
        ageGroup,
        withDiscount: view === 'quantity' ? values.purchases_with_discount : values.revenue_with_discount,
        withoutDiscount: view === 'quantity' ? values.purchases_without_discount : values.revenue_without_discount
    }));

    return (
        <div className="bg-white p-6 rounded shadow-md space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h2 className="text-xl font-bold mb-1">Discount Usage Analysis</h2>
                    <p className="text-gray-600">
                        {view === 'quantity'
                            ? 'Comparison of purchase count by age group'
                            : 'Comparison of revenue by age group'}
                    </p>
                </div>

                {/* Toggle */}
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={() => setView('quantity')}
                        className={`px-4 py-1 rounded-l border ${view === 'quantity' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        Quantity
                    </button>
                    <button
                        onClick={() => setView('revenue')}
                        className={`px-4 py-1 rounded-r border ${view === 'revenue' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        Revenue
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ageGroup" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="withDiscount"
                            fill="#22c55e"
                            name={view === 'quantity' ? 'With Discount (Qty)' : 'With Discount (Rev)'}
                        />
                        <Bar
                            dataKey="withoutDiscount"
                            fill="#f97316"
                            name={view === 'quantity' ? 'Without Discount (Qty)' : 'Without Discount (Rev)'}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
