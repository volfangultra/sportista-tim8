import React, {useEffect, useState} from 'react';
import './Sidebar.css'
import {CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from 'cdbreact';
import { NavLink, useLocation } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { FaThLarge } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';


const RenterSidebar = () => {
    const location = useLocation();
    const [isActive1, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(!location.pathname.startsWith('/user/'));
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
                        <NavLink exact to="/user" className={isActive1 ? 'activeClicked' : ''}>
                            <CDBSidebarMenuItem>
                                <FaThLarge style={{ marginRight: '15px' }} />
                                Dashboard
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/my-reservations" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaCalendar style={{ marginRight: '15px' }} />
                                My Reservations
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/my-teams" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaUsers style={{ marginRight: '15px' }} />
                                My Teams
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/favorites" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaHeart style={{ marginRight: '15px' }} />
                                Favorites
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/invites" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaComment style={{ marginRight: '15px' }} />
                                Invites
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/account" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaUser style={{ marginRight: '15px' }} />
                                Account
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/contact" className={({ isActive }) => (isActive ? "activeClicked" : '')}>
                            <CDBSidebarMenuItem>
                                <FaPhone style={{ marginRight: '15px' }} />
                                Contact
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/logout">
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