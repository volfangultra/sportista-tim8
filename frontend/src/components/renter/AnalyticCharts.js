import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "../../pages/renter/Renter.css";

const AnalyticCharts = () => {

    const lineChartRef = useRef();
    const barChartRef = useRef();
    const pieChartRef = useRef();
    const radarChartRef = useRef();
    const radarChartRef2 = useRef();
    const radarChartRef3 = useRef();

    useEffect(() => {
        let lineChartInstance = null;

        const lineChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Number of requests",
                    data: [65, 59, 80, 81, 56, 55, 40],
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

            lineChartInstance = new Chart(ctx, {
                type: "line",
                data: lineChartData,
                options: {
                    responsive: true,
                },
            });
        }

        return () => {
            if (lineChartInstance) {
                lineChartInstance.destroy();
            }
        };
    }, []);

    useEffect(() => {
        let barChartInstance = null;

        const barChartData = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
                {
                    label: "Number of items",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        if (barChartRef.current) {
            const ctx = barChartRef.current.getContext("2d");

            if (barChartInstance) {
                barChartInstance.destroy();
            }

            barChartInstance = new Chart(ctx, {
                type: "bar",
                data: barChartData,
                options: {
                    responsive: true,
                },
            });
        }

        return () => {
            if (barChartInstance) {
                barChartInstance.destroy();
            }
        };
    }, []);

    useEffect(() => {
        let pieChartInstance = null;

        const pieChartData = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
                {
                    label: "Number of items",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
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

            pieChartInstance = new Chart(ctx, {
                type: "pie",
                data: pieChartData,
                options: {
                    responsive: true,
                },
            });
        }

        return () => {
            if (pieChartInstance) {
                pieChartInstance.destroy();
            }
        };
    }, []);

    useEffect(() => {
        let radarChartInstance = null;

        const radarChartData = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First Radar Chart",
                    data: [65, 59, 90, 81, 56, 55, 40],
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)"
                }
            ]
        };

        if (radarChartRef.current) {
            const ctx = radarChartRef.current.getContext("2d");

            if (radarChartInstance) {
                radarChartInstance.destroy();
            }

            radarChartInstance = new Chart(ctx, {
                type: "radar",
                data: radarChartData,
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (radarChartInstance) {
                radarChartInstance.destroy();
            }
        };
    }, []);

    useEffect(() => {
        let radarChartInstance2 = null;

        const radarChartData2 = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First Radar Chart",
                    data: [65, 70, 20, 44, 16, 22, 40],
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)"
                }
            ]
        };

        if (radarChartRef2.current) {
            const ctx = radarChartRef2.current.getContext("2d");

            if (radarChartInstance2) {
                radarChartInstance2.destroy();
            }

            radarChartInstance2 = new Chart(ctx, {
                type: "radar",
                data: radarChartData2,
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (radarChartInstance2) {
                radarChartInstance2.destroy();
            }
        };
    }, []);

    useEffect(() => {
        let radarChartInstance3 = null;

        const radarChartData3 = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First Radar Chart",
                    data: [89, 99, 80, 81, 16, 1, 51],
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)"
                }
            ]
        };

        if (radarChartRef3.current) {
            const ctx = radarChartRef3.current.getContext("2d");

            if (radarChartInstance3) {
                radarChartInstance3.destroy();
            }

            radarChartInstance3 = new Chart(ctx, {
                type: "radar",
                data: radarChartData3,
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (radarChartInstance3) {
                radarChartInstance3.destroy();
            }
        };
    }, []);

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
                        Card 1
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    <canvas ref={lineChartRef} id="lineChartRef" />
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
                    <canvas ref={radarChartRef} id="radarChartRef" />
                </CardContent>
            </CardWrapper>
            <CardWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Card 5
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    <canvas ref={radarChartRef2} id="radarChartRef2" />
                </CardContent>
            </CardWrapper>
            <CardWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Card 6
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    <canvas ref={radarChartRef3} id="radarChartRef3" />
                </CardContent>
            </CardWrapper>
        </CardContainer>
    );
};

export default AnalyticCharts;
