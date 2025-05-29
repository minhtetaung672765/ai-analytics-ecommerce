import { useEffect, useState } from 'react';
import { fetchJSON } from '../utils/helper';
import CustomerSegmentation from '../components/CustomerSegmentation';
import TopProducts from '../components/TopProducts';
import DiscountUsage from '../components/DiscountUsage';
import CategoryPreferences from '../components/CategoryPreferences';
import AnalyticsSkeleton from '../components/AnalyticsSkeleton';
import { FiZap, FiUpload, FiCheck } from 'react-icons/fi';

export default function Analytics() {
    const [showResults, setShowResults] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [externalSegmentation, setExternalSegmentation] = useState(null);

    //  Load from localStorage on page load
    useEffect(() => {
        const storedData = localStorage.getItem('analyticsData');
        if (storedData) {
            setData(JSON.parse(storedData));
            setShowResults(true);
        }
    }, []);

    //  Generate analytics
    const handleGenerate = async () => {
        setLoading(true);
        const [segmentation, topProducts, discountUsage, categoryPreferences] = await Promise.all([
            fetchJSON('/api/segment-customers/'),
            fetchJSON('/api/top-products/'),
            fetchJSON('/api/discount-usage/'),
            fetchJSON('/api/category-preferences/')
        ]);

        const newData = { segmentation, topProducts, discountUsage, categoryPreferences };
        setData(newData);
        setShowResults(true);
        localStorage.setItem('analyticsData', JSON.stringify(newData));
        setLoading(false);
    };

    // Clear results
    const handleExitView = () => {
        setShowResults(false);
        setExternalSegmentation(null);
        setData(null);
        localStorage.removeItem('analyticsData');
    };

    // Handle CSV file input
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

    //  Upload file and segment
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setUploadError('');
        setExternalSegmentation(null);

        try {
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

            const fileName = uploadData.file_name;
            const segmentRes = await fetchJSON(`/api/segment-customers-external/?file=${fileName}`);
            setExternalSegmentation(segmentRes);
        } catch (err) {
            setUploadError(err.message || 'An error occurred.');
        }

        setUploading(false);
    };

    return (
        <div className={`space-y-6 ${showResults ? '' : 'px-30'}`}>
            {loading ? (
                <AnalyticsSkeleton />
            ) : showResults ? (
                <>
                    <div className="flex justify-end">
                        <button
                            onClick={handleExitView}
                            className=" px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Exit View
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <CustomerSegmentation data={data?.segmentation} />
                        <TopProducts data={data?.topProducts} />
                        <DiscountUsage data={data?.discountUsage} />
                        <CategoryPreferences data={data?.categoryPreferences} />
                    </div>
                </>
            ) : (
                <>
                    {externalSegmentation ? (

                        <div className="mt-6">
                            <div className="flex justify-end">
                                <button
                                    onClick={handleExitView}
                                    className=" px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Exit View
                                </button>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 text-purple-900">External Segmentation Result</h3>
                            <CustomerSegmentation data={externalSegmentation} />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-x-2 gap-y-10 mt-5 mb-5">
                            {/* Internal Analysis Section */}
                            <div className="space-y-3 p-7">
                                <h3 className="text-xl font-semibold text-purple-900">Internal Data Insights</h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li className="flex items-center gap-2"><FiCheck /> Customer Segmentation</li>
                                    <li className="flex items-center gap-2"><FiCheck /> Top Selling Products</li>
                                    <li className="flex items-center gap-2"><FiCheck /> Discount Usage Patterns</li>
                                    <li className="flex items-center gap-2"><FiCheck /> Category Preferences</li>
                                </ul>
                            </div>

                            {/* Internal Generate Section */}
                            <div className="bg-purple-50 p-7 rounded-xl shadow-sm">
                                <div className="text-2xl font-bold">AI-Powered Analytics Dashboard</div>
                                <p className="text-gray-600 mt-3 mb-6">
                                    View advanced insights generated from JumpStart's customer and purchase data.
                                </p>
                                <button
                                    onClick={handleGenerate}
                                    className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                >
                                    <FiZap className="text-xl" />
                                    <span>Generate Analytics</span>
                                </button>
                            </div>

                            {/* External Upload Section */}
                            <div>
                                <h3 className="text-lg font-semibold">Or Perform Manual Customer Segmentation [.csv]</h3>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="border p-2 rounded w-full max-w-sm mt-2"
                                />
                                {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading || !file}
                                    className="flex items-center gap-2 mt-4 px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                                >
                                    <FiUpload />
                                    {uploading ? 'Uploading & Segmenting...' : 'Upload & Segment'}
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
