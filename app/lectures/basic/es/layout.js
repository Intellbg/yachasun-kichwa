import NavBar from '../../../components/Navbar'

export default function MdxLayout({ children }) {
    return (
        <>
            <NavBar />
            <div className='container my-1 py-5 h-100'>
                <div className='card p-5'>
                    {children}
                </div>
            </div>
        </>
    )
}