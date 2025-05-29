export default function CustomerTable({ data }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full  border rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((c, i) => (
                        <tr key={i} className="text-center even:bg-gray-50">
                            <td className="p-2">{c.name}</td>
                            <td>{c.age}</td>
                            <td>{c.gender}</td>
                            <td>{c.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
