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

    const handleGenerate = async () => {
        setLoading(true);

        const [segmentation, topProducts, discountUsage, categoryPreferences] = await Promise.all([
            fetchJSON('/api/segment-customers/'),
            fetchJSON('/api/top-products/'),
            fetchJSON('/api/discount-usage/'),
            fetchJSON('/api/category-preferences/'),
        ]);

        setData({ segmentation, topProducts, discountUsage, categoryPreferences });
        setShowResults(true);
        setLoading(false);
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
                    <div className="text-2xl font-bold">AI-Powered Analytics Dashboard</div>
                    <p className="text-gray-600">
                        View advanced insights generated from JumpStart's customer and purchase data.
                    </p>

                    <button
                        onClick={handleGenerate}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Generate Analytics
                    </button>
                </>
            )}
        </div>
    );
}
