import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import '../../pages/admin/Admin.css';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material";
import Card from "@mui/material/Card";

function DashboardCharts() {
    const [rentersCount, setRentersCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [rentalsData, setRentalsData] = useState(0);

    // Ref to chart canvas and chart instance
    const pieChartRef = useRef(null);
    const pieChartInstanceRef = useRef(null);

    const barChartRef = useRef(null);
    const barChartInstanceRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const rentersResponse = await axios.get(
                    'http://127.0.0.1:8000/admin/getRentersCount/'
                );
                setRentersCount(rentersResponse.data.broj_osoba);

                const usersResponse = await axios.get(
                    'http://127.0.0.1:8000/admin/getUsersCount/'
                );
                setUsersCount(usersResponse.data.broj_osoba);

                const rentalsResponse = await axios.get('http://127.0.0.1:8000/admin/getRentalsData/');
                setRentalsData(rentalsResponse.data.rentals_per_month);
                console.log("rentals data: ", rentalsData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (pieChartRef.current && rentersCount !== 0 && usersCount !== 0) {
            // Destroy existing chart instance
            if (pieChartInstanceRef.current) {
                pieChartInstanceRef.current.destroy();
            }

            // Create new chart instance
            pieChartInstanceRef.current = new Chart(pieChartRef.current, {
                type: 'pie',
                data: {
                    labels: ['Renters', 'Users'],
                    datasets: [
                        {
                            label: 'Number of renters and users',
                            data: [rentersCount, usersCount],
                            backgroundColor: ['#FF6384', '#36A2EB'],
                        },
                    ],
                },
            });
        }

        if (barChartRef.current && rentalsData.length > 0) {
            // Destroy existing chart instance
            if (barChartInstanceRef.current) {
                barChartInstanceRef.current.destroy();
            }
            const barChartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'Bookings',
                        data: rentalsData,
                        backgroundColor: '#36A2EB',
                    },
                ],
            };

            // Create new chart instance
            barChartInstanceRef.current = new Chart(barChartRef.current, {
                type: 'bar',
                data: barChartData,
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });
        }
    }, [rentersCount, usersCount, rentalsData]);

    const CardContainer = styled("div")({
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "1rem",
    });

    const CardWrapper = styled(Card)({
        width: "100%",
        maxWidth: "25rem",
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
    });

    return (
        <div className="dashboard-data mt-5">
            <CardContainer className="analytic-cards">
                <CardWrapper>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Card 1
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        <Typography>
                            DODATI NEKI CHART
                        </Typography>
                    </CardContent>
                </CardWrapper>
                <CardWrapper>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Card 2
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        <canvas ref={barChartRef} id="barChartRef" />
                    </CardContent>
                </CardWrapper>
                <CardWrapper>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Card 3
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        <canvas ref={pieChartRef} id="pieChartRef" />
                    </CardContent>
                </CardWrapper>
                <CardWrapper>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Card 4
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        <Typography>
                            DODATI NEKI CHART
                        </Typography>
                    </CardContent>
                </CardWrapper>
            </CardContainer>
        </div>
    );
}

export default DashboardCharts;