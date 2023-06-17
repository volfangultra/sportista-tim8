import React, {useEffect, useState} from 'react';
import './Sidebar.css'
import {CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from 'cdbreact';
import { NavLink, useLocation } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { FaThLarge } from 'react-icons/fa';
import { FaInbox } from 'react-icons/fa';
import { FaArchive } from 'react-icons/fa';
import { FaUserTag } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';


const AdminSidebar = () => {
    const location = useLocation();
    const [isActive1, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(!location.pathname.startsWith('/admin/'));
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
                        <NavLink to="/admin" className={isActive1 ? 'activeClicked' : ''}>
                            <CDBSidebarMenuItem>
                                <FaThLarge style={{ marginRight: '15px' }} />
                                Dashboard
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/inbox" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaInbox style={{ marginRight: '15px' }} />
                                Inbox
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/arcvhied-messages" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaArchive style={{ marginRight: '15px' }} />
                                Archived Messages
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/renters" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaUserTag style={{ marginRight: '15px' }} />
                                Renters
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaUsers style={{ marginRight: '15px' }} />
                                Users
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

export default AdminSidebar;