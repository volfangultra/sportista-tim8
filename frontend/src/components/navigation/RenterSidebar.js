import React, {useEffect, useState} from 'react';
import './Sidebar.css'
import {CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from 'cdbreact';
import { NavLink, useLocation } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { FaThLarge } from 'react-icons/fa';
import { FaFutbol } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';


const RenterSidebar = () => {
    const location = useLocation();
    const [isActive1, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(!location.pathname.startsWith('/renter/'));
    }, [location]);

    return (
        <div className='sticky-div' style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor='white' backgroundColor='#2e424d'>
                <CDBSidebarHeader prefix={<FaBars className="fa-large" />} >
                    <img src='/favicon.svg' alt='logo' style={{ width: '30px' , paddingRight: '3px'}}/>
                    <span className='text-decoration-none' style={{ color: 'inherit' }}>
                    Sportista
                    </span>
                </CDBSidebarHeader>

                <CDBSidebarContent>
                    <CDBSidebarMenu>
                        <NavLink to="/renter" className={isActive1 ? 'activeClicked' : ''}>
                            <CDBSidebarMenuItem>
                                <FaThLarge style={{ marginRight: '15px' }} />
                                Dashboard
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/renter/my-fields" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaFutbol style={{ marginRight: '15px' }} />
                                My Fields
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/renter/analytics" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaChartLine style={{ marginRight: '15px' }} />
                                Analytics
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/renter/account" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaUser style={{ marginRight: '15px' }} />
                                Account
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/renter/contact" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaPhone style={{ marginRight: '15px' }} />
                                Contact
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/logout">
                            <CDBSidebarMenuItem>
                                <FaSignOutAlt style={{ marginRight: '15px' }} />
                                Logout
                            </CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default RenterSidebar;