import React from 'react';
import { useParams } from 'react-router-dom';

//components
import Basketball from '../../components/sports/Basketball';
import Paintball from '../../components/sports/Paintball';
import Tennis from '../../components/sports/Tennis';
import IceSkating from '../../components/sports/IceSkating';
import Football from '../../components/sports/Football';
import Volleyball from '../../components/sports/Volleyball';
import Boxing from '../../components/sports/Boxing';
import Handball from '../../components/sports/Handball';
import TableTennis from '../../components/sports/TableTennis';
import Hockey from '../../components/sports/Hockey';
import TopNavbar from "../../components/navigation/Navbar";
import {Pagination} from "@mui/material";
import Footer from "../../components/navigation/Footer";

function SportsPage() {

    const { sport } = useParams();

    return (
        <div className="background-grayish sportsPage">
            <TopNavbar />
            {sport === 'basketball' && <Basketball header="Basketball" />}
            {sport === 'paintball' && <Paintball header="Paintball" />}
            {sport === 'tennis' && <Tennis header="Tennis" />}
            {sport === 'ice_skating' && <IceSkating header="Ice Skating" />}
            {sport === 'football' && <Football header="Football" />}
            {sport === 'volleyball' && <Volleyball header="Volleyball" />}
            {sport === 'boxing' && <Boxing header="Boxing" />}
            {sport === 'handball' && <Handball header="Handball" />}
            {sport === 'table_tennis' && <TableTennis header="Table Tennis" />}
            {sport === 'hockey' && <Hockey header="Hockey" />}
            <Pagination className="m-5" count={10} variant="outlined" shape="rounded" />
            <Footer />
        </div>
    );
}

export default SportsPage;
