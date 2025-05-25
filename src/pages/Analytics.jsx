import { useState } from 'react';
import { fetchJSON } from '../utils/helper';
import CustomerSegmentation from '../components/CustomerSegmentation';
import TopProducts from '../components/TopProducts';
import DiscountUsage from '../components/DiscountUsage';
import CategoryPreferences from '../components/CategoryPreferences';

export default function Analytics() {
    const [showResults, setShowResults] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [externalSegmentation, setExternalSegmentation] = useState(null);

    // 🔹 Internal system analytics
    const handleGenerate = async () => {
        setLoading(true);
        const [segmentation, topProducts, discountUsage, categoryPreferences] = await Promise.all([
            fetchJSON('/api/segment-customers/'),
            fetchJSON('/api/top-products/'),
            fetchJSON('/api/discount-usage/'),
            fetchJSON('/api/category-preferences/')
        ]);

        setData({ segmentation, topProducts, discountUsage, categoryPreferences });
        setShowResults(true);
        setLoading(false);
    };

    // 🔹 Handle CSV file input
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected?.name.endsWith('.csv')) {
            setUploadError('Only .csv files are allowed.');
            setFile(null);
            return;
        }
        setUploadError('');
        setFile(selected);
    };

    // Upload file and segment
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setUploadError('');
        setExternalSegmentation(null);

        try {
            // Upload file
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload/`, {
                method: 'POST',
                body: formData
            });

            const uploadData = await uploadRes.json();
            if (!uploadRes.ok || !uploadData.file_name) {
                throw new Error(uploadData.error || 'File upload failed.');
            }

            // Trigger segmentation using returned file name
            const fileName = uploadData.file_name;
            const segmentRes = await fetchJSON(`/api/segment-customers-external/?file=${fileName}`);
            setExternalSegmentation(segmentRes);
        } catch (err) {
            setUploadError(err.message || 'An error occurred.');
        }

        setUploading(false);
    };

    return (
        <div className="space-y-6">
            {showResults ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <CustomerSegmentation data={data?.segmentation} />
                    <TopProducts data={data?.topProducts} />
                    <DiscountUsage data={data?.discountUsage} />
                    <CategoryPreferences data={data?.categoryPreferences} />
                </div>
            ) : (
                <>

                    {/* Segmentation results for external CSV */}
                    {externalSegmentation ? (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-blue-700">External Segmentation Result</h3>
                            <CustomerSegmentation data={externalSegmentation} />
                        </div>
                    ) : (
                        <>
                            <div className="text-2xl font-bold">AI-Powered Analytics Dashboard</div>
                            <p className="text-gray-600 mb-6">
                                View advanced insights generated from JumpStart's customer and purchase data.
                            </p>

                            {/* Internal data analytics */}
                            <button
                                onClick={handleGenerate}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Generate Analytics
                            </button>

                            {/* External CSV analytics */}
                            <div className="mt-10 space-y-4">
                                <h3 className="text-lg font-semibold">Or Upload External Customer CSV</h3>

                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="border p-2 rounded w-full max-w-sm"
                                />

                                {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}

                                <button
                                    onClick={handleUpload}
                                    disabled={uploading || !file}
                                    className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                >
                                    {uploading ? 'Uploading & Segmenting...' : 'Upload & Segment'}
                                </button>
                            </div>
                        </>
                    )}

                </>
            )}
        </div>
    );
}
