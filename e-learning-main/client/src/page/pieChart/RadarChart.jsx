// import React from "react";
// import PropTypes from "prop-types";
// import { Card, CardHeader } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles";
// import Chart from "react-apexcharts";

// const CHART_HEIGHT = 400;
// const LEGEND_HEIGHT = 72;

// const StyledChart = styled(Chart)(({ theme }) => ({
//   height: CHART_HEIGHT,
//   "& .apexcharts-canvas": {
//     height: `100% !important`,
//   },
//   "& .apexcharts-legend": {
//     height: LEGEND_HEIGHT,
//     borderTop: `dashed 1px ${theme.palette.divider}`,
//     top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
//   },
// }));

// function RadarChart({ data, title, subheader }) {
//   const theme = useTheme();

//   const series = data.map((category) => category.value);
//   const categories = data.map((category) => category.label);

//   const chartOptions = {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     radar: {
//       size: 340,
//       polygons: {
//         strokeColor: '#e8e8e8',
//         fill: {
//           colors: ['#f8f8f8', '#fff']
//         },
//       },
//     },
//     colors: ['#1E90FF'],
//     markers: {
//       size: 6,
//       colors: ['#1E90FF'],
//       strokeColor: '#fff',
//       strokeWidth: 2,
//     },
//     tooltip: {
//       y: {
//         show: false, // Masquer les étiquettes de l'axe y
//       },
//       marker: {
//         show: true,
//       },
//     },
//     yaxis: {
//       labels: {
//         show: false, // Cacher les étiquettes de l'axe des y
//       },
//     },
//     xaxis: {
//       categories,
//     },
//     stroke: {
//       show: true,
//       width: 3,
//       colors: ['#1E90FF'],
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shade: 'dark',
//         gradientToColors: ['#1E90FF'],
//         shadeIntensity: 1,
//         type: 'horizontal',
//         opacityFrom: 1,
//         opacityTo: 1,
//         stops: [0, 100],
//         show: true,
//       },
//     },
//   };

//   return (
//     <Card>
//       <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
//       <StyledChart
//         type="radar"
//         series={[{ name: "Series 1", data: series }]}
//         options={chartOptions}
//         width="100%"
//         height={340}
//       />
//     </Card>
//   );
// }

// RadarChart.propTypes = {
//   data: PropTypes.array.isRequired,
//   title: PropTypes.string.isRequired,
//   subheader: PropTypes.string,
// };

// export default RadarChart;
