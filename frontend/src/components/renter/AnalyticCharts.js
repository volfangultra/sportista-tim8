import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "../../pages/renter/Renter.css";
import {SERVER_URL} from "../../auth/Consts";
import axios from "axios";

const AnalyticCharts = (props) => {
    const pieChartRef = useRef();
    const lineChartRef = useRef();
    const barChartRef = useRef();
    const barChartRef2 = useRef();

    const renterID = props.renter_id;

    useEffect(() => {
        let pieChartInstance = null;

        const fetchRenterFieldsCount = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/renter/field_count/${renterID}`);
                const renterFieldsCount = response.data;

                const pieChartData = {
                    labels: renterFieldsCount.map((item) => item.sport),
                    datasets: [
                        {
                            label: "Number of fields",
                            data: renterFieldsCount.map((item) => item.count),
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(135, 206, 250, 0.2)",
                                "rgba(192, 192, 192, 0.2)",
                                "rgba(0, 0, 0, 0.2)",
                                "rgba(255, 165, 0, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                                "rgba(135, 206, 250, 1)",
                                "rgba(192, 192, 192, 1)",
                                "rgba(0, 0, 0, 1)",
                                "rgba(255, 165, 0, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                if (pieChartRef.current) {
                    const ctx = pieChartRef.current.getContext("2d");

                    if (pieChartInstance) {
                        pieChartInstance.destroy();
                    }

                    if (Chart.getChart(ctx)) {
                        Chart.getChart(ctx).destroy();
                    }

                    pieChartInstance = new Chart(ctx, {
                        type: "pie",
                        data: pieChartData,
                        options: {
                            responsive: true,
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching renter fields count:", error);
            }
        };

        fetchRenterFieldsCount();

        return () => {
            if (pieChartInstance) {
                pieChartInstance.destroy();
            }
        };
    }, [renterID]);

    useEffect(() => {
        let lineChartInstance = null;

        const fetchRenterFieldsPrice = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/renter/field_price/${renterID}`);
                const renterFieldsPrice = response.data;

                const lineChartData = {
                    labels: renterFieldsPrice.map((item) => item.name),
                    datasets: [
                        {
                            label: "Price",
                            data: renterFieldsPrice.map((item) => item.price),
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                };

                if (lineChartRef.current) {
                    const ctx = lineChartRef.current.getContext("2d");

                    if (lineChartInstance) {
                        lineChartInstance.destroy();
                    }

                    if (Chart.getChart(ctx)) {
                        Chart.getChart(ctx).destroy();
                    }

                    lineChartInstance = new Chart(ctx, {
                        type: "line",
                        data: lineChartData,
                        options: {
                            responsive: true,
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching renter fields price:", error);
            }
        };

        fetchRenterFieldsPrice();

        return () => {
            if (lineChartInstance) {
                lineChartInstance.destroy();
            }
        };
    }, [renterID]);

    useEffect(() => {
        let barChartInstance = null;

        const fetchRenterFieldsCount = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/renter/field_total_count/${renterID}`
                );
                const renterFieldsCount = response.data.total_fields_count;

                const barChartData = {
                    labels: ["Total Fields"],
                    datasets: [
                        {
                            label: "Number of fields",
                            data: [renterFieldsCount],
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                };

                if (barChartRef.current) {
                    const ctx = barChartRef.current.getContext("2d");

                    if (barChartInstance) {
                        barChartInstance.destroy();
                    }

                    new Chart(ctx, {
                        type: "bar",
                        data: barChartData,
                        options: {
                            responsive: true,
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching renter fields count:", error);
            }
        };

        fetchRenterFieldsCount();

    }, [renterID]);

    useEffect(() => {
        let barChartInstance2 = null;

        const fetchRenterBookingCount = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/renter/get_bookings_count/${renterID}`);
                const renterBookingCount = response.data.booking_count;

                const barChartData2 = {
                    labels: ["Total Bookings"],
                    datasets: [
                        {
                            label: "Number of bookings",
                            data: [renterBookingCount],
                            backgroundColor: "rgba(135, 206, 250, 0.2)",
                            borderColor: "rgba(135, 206, 250, 1)",
                            borderWidth: 1,
                        },
                    ],
                };

                if (barChartRef2.current) {
                    const ctx = barChartRef2.current.getContext("2d");

                    if (barChartInstance2) {
                        barChartInstance2.destroy();
                    }

                    barChartInstance2 = new Chart(ctx, {
                        type: "bar",
                        data: barChartData2,
                        options: {
                            responsive: true,
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching renter booking count:", error);
            }
        };

        fetchRenterBookingCount();

        return () => {
            if (barChartInstance2) {
                barChartInstance2.destroy();
            }
        };
    }, [renterID]);

    const CardContainer = styled("div")({
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "1rem",
    });

    const CardWrapper = styled(Card)({
        width: "100%",
        maxWidth: "22rem",
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
    });

    return (
        <CardContainer className="analytic-cards mt-5">
            <CardWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        SPORTS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Here you can see the number of your fields for a specific sport.
                    </Typography>
                    <canvas ref={pieChartRef} id="pieChartRef" />
                </CardContent>
            </CardWrapper>
            <CardWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        PRICES
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Here you can see the prices of your fields.
                    </Typography>
                    <canvas ref={lineChartRef} id="lineChartRef" />
                </CardContent>
            </CardWrapper>
            <CardWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        FIELDS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Here you can see the total number of your fields.
                    </Typography>
                    <canvas ref={barChartRef} id="barChartRef" />
                </CardContent>
            </CardWrapper>
            <CardWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        RESERVATIONS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Here you can see the total number of reservations for your fields.
                    </Typography>
                    <canvas ref={barChartRef2} id="radarChartRef2" />
                </CardContent>
            </CardWrapper>
        </CardContainer>
    );
};

export default AnalyticCharts;
