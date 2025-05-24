import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6', '#a855f7'];

function GenderPieChart({ data, gender }) {
    if (!data || data.length === 0) return null;

    const chartData = data.map((item, index) => ({
        name: item.product__category,
        value: item.total_quantity,
        revenue: item.total_revenue
    }));

    return (
        <div className="bg-white rounded  p-4 w-full max-w-sm">
            <h4 className="font-semibold mb-2 text-center">{gender}</h4>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={70}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) =>
                            [`${value} units`, `${props.payload.name} | Revenue: $${props.payload.revenue}`]
                        }
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function CategoryPreferences({ data }) {
    const preferences = data?.preferences || {};

    if (!Object.keys(preferences).length) return null;

    return (
        <div className="bg-white p-6 rounded shadow-md space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Category Preferences by Demographics</h2>
                <p className="text-gray-600">
                    View top product categories purchased by different age and gender groups
                </p>
            </div>

            {/* Age Groups Section */}
            {Object.entries(preferences).map(([ageGroup, genderData]) => (
                <div key={ageGroup} className="mb-10">
                    <h3 className="text-lg font-semibold mb-4 text-blue-700">{ageGroup}</h3>
                    {/* <div className="flex flex-wrap gap-6"> */}
                    <div className="columns-2 gap-6">
                        {Object.entries(genderData).map(([gender, data]) => (
                            <GenderPieChart key={`${ageGroup}-${gender}`} data={data} gender={gender} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
