import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AnalyticsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded shadow space-y-4">
                    <Skeleton height={30} width="60%" />
                    <Skeleton count={5} />
                </div>
            ))}
        </div>
    );
}
