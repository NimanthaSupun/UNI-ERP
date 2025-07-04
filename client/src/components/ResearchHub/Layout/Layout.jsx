import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';


function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;