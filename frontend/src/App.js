import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components & pages
import Home from './pages/home/Home';
import SportsPage from './pages/home/SportsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/admin/Admin';
import Renters from "./pages/admin/Renters";
import Users from "./pages/admin/Users";
import Renter from './pages/renter/Renter';
import MyFields from "./pages/renter/MyFields";
import Analytics from "./pages/renter/Analytics";
import RenterAccount from './pages/renter/RenterAccount';
import User from './pages/user/User';
import MyReservations from './pages/user/MyReservations';
import Invites from './pages/user/Invites';
import UserAccount from './pages/user/UserAccount';
import UserContact from './pages/user/Contact';
import RenterContact from './pages/renter/Contact';
import NoPage from './pages/NoPage';
import Activate from './auth/Activate'
import ResetPassword from "./auth/ResetPassword";
import ResetPasswordConfirm from './auth/ResetPasswordConfirm'
import Logout from './auth/Logout'
import {Provider} from 'react-redux'
import store from './store'
import Authentification from "./auth/Authentification";
import AdminLogin from "./pages/AdminLogin";
import AdminInbox from "./pages/admin/Inbox";
import Favorites from "./pages/user/Favorites";
import ArchivedMessages from "./pages/admin/ArchivedMessages";
import MyTeams from "./pages/user/MyTeams";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Authentification>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/sport/:sport" element={<SportsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/inbox" element={<AdminInbox />} />
              <Route path="/admin/archived-messages" element={<ArchivedMessages/>} />
              <Route path="/admin/renters" element={<Renters />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/renter" element={<Renter />} />
              <Route path="/renter/my-fields" element={<MyFields/>} />
              <Route path="/renter/analytics" element={<Analytics />} />
              <Route path="/renter/account" element={<RenterAccount />} />
              <Route path="/renter/contact" element={<RenterContact />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/my-reservations" element={<MyReservations />} />
              <Route path="/user/favorites" element={<Favorites />} />
              <Route path="/user/my-teams" element={<MyTeams />} />
              <Route path="/user/invites" element={<Invites />} />
              <Route path="/user/account" element={<UserAccount />} />
              <Route path="/user/contact" element={<UserContact />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Authentification>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
