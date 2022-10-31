import React from 'react'

const Layout = ({children}) => {
    return (
        <>
            <nav>
                <a href="/">
                    <h3 className="brand">DATABASE</h3>
                </a>
            </nav>
            {children}
        </>
    )
}

export default Layout
