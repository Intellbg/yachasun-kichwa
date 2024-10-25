"use client"
import { useRouter } from 'next/navigation';

function BootstrapClient() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return <button className="btn btn-lg text-center m-a w-25" onClick={goBack}>
        <i className="bi bi-arrow-left-circle"></i> Retroceder
    </button>;
}

export default BootstrapClient;