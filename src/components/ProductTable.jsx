export default function ProductTable({ data }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full  border rounded">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-2">Name</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>In Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((p, i) => (
                        <tr key={i} className="text-center even:bg-gray-50">
                            <td className="p-2">{p.name}</td>
                            <td>{p.category}</td>
                            <td>{p.price}</td>
                            <td>{p.stock_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
