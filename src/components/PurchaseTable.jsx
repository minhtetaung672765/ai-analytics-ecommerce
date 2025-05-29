export default function PurchaseTable({ data }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full  border rounded">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-2">Customer</th>
                        <th>Purchased Date</th>
                        <th>Total ($)</th>
                        <th>Used Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((p, i) => (
                        <tr key={i} className="text-center even:bg-gray-50">
                            <td className="p-2">{p.customer}</td>
                            <td>{p.purchase_date}</td>
                            <td>{p.total_amount}</td>
                            <td>{p.discount_applied ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
