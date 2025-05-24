export default function PurchaseItemTable({ data }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th>Product</th>
                        {/* <th>Category</th> */}
                        <th>Quantity</th>
                        <th>Subtotal ($)</th>
                        <th className="p-2">Purchase ID</th>
                        <th>Purchased By</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="text-center even:bg-gray-50">

                            <td>{item.product_name}</td>
                            {/* <td>{item.category}</td> */}
                            <td>{item.quantity}</td>
                            <td>{item.price_at_purchase}</td>
                            <td className="p-2">{item.purchase_id}</td>
                            <td>{item.customer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
