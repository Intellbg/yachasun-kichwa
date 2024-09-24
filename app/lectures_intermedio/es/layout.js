export default function MdxLayout({ children }) {
    return (
        <div className='container my-5 py-5 h-100'>
            <div className='card p-5'>
                {children}
            </div>
        </div>
    )
}