"use client"
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/Navbar'

export default function MdxLayout({ children }) {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    return (
        <>
            <NavBar />
            <div className='container my-1 py-5 h-100'>
                <div className='card p-5'>
                    {children}
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <button className="btn btn-lg text-center m-a w-25" onClick={goBack}>
                        <i className="bi bi-arrow-left-circle"></i> Retroceder
                    </button>
                </div>
            </div>

        </>
    )
}