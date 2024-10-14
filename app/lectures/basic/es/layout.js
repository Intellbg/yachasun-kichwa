"use client"
import NavBar from '../../../components/Navbar'
import BackButton from "@/app/components/BackButton"

export default function MdxLayout({ children }) {

    return (
        <>
            <NavBar />
            <div className='container my-1 py-5 h-100'>
                <div className='card p-5'>
                    {children}
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <BackButton></BackButton>
                </div>
            </div>

        </>
    )
}