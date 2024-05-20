import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import moment from "moment";
import "chartjs-plugin-labels";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Report.css";
const Report = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    // Chart setup and data mychart
    const chartData = {
      labels: ["2W", "4W"],
      datasets: [
        {
          data: [2866, 2574],
          backgroundColor: ["red", "blue"],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        labels: {
          render: "label",
          arc: true,
          fontColor: "#000",
          position: "outside",
        },
      },
    };

    const canvas = document.getElementById("myChart");
    const canvas4 = document.getElementById("myChart4");
    if (canvas) {
      const ctx1 = canvas.getContext("2d");
      if (ctx1) {
        const existingChart = Chart.getChart(ctx1);
        if (existingChart) {
          existingChart.destroy();
        }
      }
    }
    if (canvas4) {
      const ctx1 = canvas.getContext("2d");
      if (ctx1) {
        const existingChart = Chart.getChart(ctx1);
        if (existingChart) {
          existingChart.destroy();
        }
      }
    }
    new Chart(canvas, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });
    new Chart(canvas4, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });
    // Chart setup and data mychart2
    // const data1 = {
    //   labels: [" entry", " exit"],
    //   datasets: [
    //     {
    //       label: "Entry",
    //       data: [1187, 514, 381, 12, 40],
    //       backgroundColor: "red",
    //     },
    //     {
    //       label: "Exit",
    //       data: [1517, 672, 632, 1099, 1520],
    //       backgroundColor: "blue",
    //     },
    //   ],
    // };

    // const config = {
    //   type: "bar",
    //   data: data1,
    //   options: {
    //     barValueSpacing: 20,
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             min: 0,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // };

    // const canvas2 = document.getElementById("myChart2");
    // if (canvas2) {
    //   const ctx2 = canvas2.getContext("2d");
    //   if (ctx2) {
    //     const existingChart2 = Chart.getChart(ctx2);
    //     if (existingChart2) {
    //       existingChart2.destroy();
    //     }
    //   }
    // }

    // // Create new chart instance on canvas with ID 'myChart2'
    // new Chart(canvas2, config);

    // Hlane count

    let chartInstance;

    const updateChart = () => {
      let entryData = [700, 500, 200, 600];
      let exitData = [500, 800, 300, 250];

      const data1 = {
        labels: ["Lane1", "Lane2", "Lane3", "Lane4"],
        datasets: [
          {
            label: "Entry",
            data: entryData,
            backgroundColor: "red",
          },
          {
            label: "Exit",
            data: exitData,
            backgroundColor: "blue",
          },
        ],
      };

      const config = {
        type: "bar",
        data: data1,
        options: {
          barValueSpacing: 20,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");

        if (chartInstance) {
          chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, config);
      }
    };

    // Call the updateChart function initially
    updateChart();

    // mychart1-- hourly count data

    var result = [
      { x: "18:00", y: "230" },
      { x: "19:00", y: "232" },
      { x: "20:00", y: "236" },
      { x: "22:00", y: "228" },
    ];
    var lanes = [
      "Entry",
      "Exit",
    
    ];
    var counts = [
      [
        39, 40, 48, 1, 45, 28, 28, 80, 120, 149, 133, 110, 121, 101, 95, 111,
        77, 73, 15, 51, 48, 4, 0, 0,
      ],
      [
        12, 7, 8, 12, 5, 24, 14, 27, 39, 53, 37, 36, 44, 10, 36, 70, 32, 2, 90,
        56, 55, 3, 0, 0,
      ],
      
     
    ];
    var datasets = counts.map(function (count, index) {
      return {
        label: lanes[index],
        data: count,
        lineTension: 0,
        fill: false,
        borderColor:
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padEnd(6, 0), // generate random color for each lane
      };
    });
    // parse labels and data
    var labels = result.map((e) => moment(e.x, "HH:mm"));
    var data = result.map((e) => +e.y);
    const speedCanvas = document.getElementById("myChart1");
    if (speedCanvas) {
      const ctx2 = speedCanvas.getContext("2");
      if (ctx2) {
        const existingChart2 = Chart.getChart(ctx2);
        if (existingChart2) {
          existingChart2.destroy();
        }
      }
    }
    // Chart.defaults.global.defaultFontFamily = "Lato";
    // Chart.defaults.global.defaultFontSize = 18;

    // var dataFirst = {
    //    label: "2W",
    //    data: ,
    //    lineTension: 0,
    //    fill: false,
    //    borderColor: 'red'
    // };

    // var dataSecond = {
    //    label: "4W",
    //    data: ,
    //    lineTension: 0,
    //    fill: false,
    //    borderColor: 'blue'
    // };

    var speedData = {
      labels: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],

      datasets: datasets,
    };

    var chartOptions1 = {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 80,
          fontColor: "black",
        },
      },
    };

    new Chart(speedCanvas, {
      type: "line",
      data: speedData,
      options: chartOptions1,
    });
  }, []);

  return (
    <div className="container">
      {/* report heading started */}
      <div
        className="jumbotron p-3 p-md-5 rounded "
        style={{ backgroundColor: "snow" }}
      >
        <div className="col-md-12 px-0">
          <h1 className="display-4 font-italic" style={{ textAlign: "center" }}>
            <img
              src="https://www.mialotech.com/assets/img/logo-mialo.png"
              alt=""
            />
          </h1>
          &nbsp;
          <h1 style={{ textAlign: "center" }}>Daily Report</h1>
          <h1 style={{ textAlign: "center" }}>08 May 2023</h1>
          <p className="lead my-3" style={{ textAlign: "center" }}>
            This was yet another day of our journey to revolutionizing your
          </p>
          <p className="lead my-3" style={{ textAlign: "center" }}>
            premises and we are excited for the journey ahead.
          </p>
        </div>
      </div>
      {/* report heading ended */}
      {/* stream starts and alerts started */}
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <h1 className="d-inline-block mb-2">Stream Stats</h1>
              <h5 className="mb-0">Stream Start Time: 00:00</h5>
              <h5 className="mb-0">Stream End Time: 23:59</h5>
              <h5 className="mb-0">Stream Down Time: None</h5>
              <h5 className="mb-0">Longest Downtime Hour: None</h5>
            </div>
          </div>
        </div>
        {/* <div className="col-md-6">
          <div
            className="card flex-md-row mb-4 box-shadow h-md-250"
            style={{ height: 187 }}
          >
            <div className="card-body d-flex flex-column align-items-start">
              <h1 className="d-inline-block mb-2">Alerts</h1>
              <h5 className="mb-0">You had:</h5>
              <ul>
                <li>0 Blacklisted Vehicles</li>
                <li>4 Alert Vehicles</li>
                <li>0 Overstaying Vehicles</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      {/* stream starts and alerts ended */}
      {/* vehicle count and vehicle type started */}
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow d-flex h-100">
            <div className="card-body d-flex flex-column align-items-start">
              <h1 className="d-inline-block mb-2">Vehicle Count</h1>
              <div className="row">
                <div className="col-md-6">
                  <p className="d-flex mb-0">Entry Count: 2403</p>
                  <p className="d-flex">Exit Count: 3037</p>
                </div>
                <div className="col-md-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/552/552922.png"
                    style={{ height: 45, marginLeft: "-80%" }}
                    alt=""
                  />
                </div>
                <div className="col-md-6" style={{ marginLeft: "-39%" }}>
                  <span className="text-success">155%</span> <b>more </b> than
                </div>
                <div
                  className="col-md-6"
                  style={{ marginLeft: "47%", marginTop: "-8%" }}
                >
                  <span>yesterday </span>
                </div>
                <div className="col-md-6" />
              </div>
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Entry Count</th>
                    <th scope="col">Exit Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>7/5</td>
                    <td>Sun</td>
                    <td>907</td>
                    <td>1227</td>
                  </tr>
                  <tr>
                    <td>6/5</td>
                    <td>Sat</td>
                    <td>4265</td>
                    <td>4703</td>
                  </tr>
                  <tr>
                    <td>5/5</td>
                    <td>Fri</td>
                    <td>3342</td>
                    <td>4832</td>
                  </tr>
                  <tr>
                    <td>4/5</td>
                    <td>Thu</td>
                    <td>3917</td>
                    <td>4894</td>
                  </tr>
                  <tr>
                    <td>3/5</td>
                    <td>Wed</td>
                    <td>3910</td>
                    <td>4713</td>
                  </tr>
                  <tr>
                    <td>2/5</td>
                    <td>Tue</td>
                    <td>3555</td>
                    <td>4094</td>
                  </tr>
                  <tr>
                    <td>1/5</td>
                    <td>Mon</td>
                    <td>1772</td>
                    <td>1979</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4 box-shadow d-flex h-100 card-with-chart">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className="" />
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className="" />
              </div>
            </div>
            <div className="card-body d-flex flex-column align-items-start card-with-body">
              {/* Move the heading outside the flex container */}
              <h1>Vehicle Type</h1>
              <h5 className="card-text mb-auto">
                2W count today was 53% of the total count, whereas 4W count was
                47%
              </h5>

              {/* Flex container for canvas elements */}
              <div className=" w-100" style={{ padding: "20px" }}>
                {/* Show the first canvas */}
                <span>Entry</span>
                <div
                  className="flex-grow-1 mr-2"
                  style={{ boxSizing: "border-box", padding: "5px" }}
                >
                  <canvas
                    id="myChart"
                    className="chartjs-render-monitor"
                    width={200}
                  />
                </div>
                <span>Exit</span>
                {/* Show the second canvas */}
                <div
                  className="flex-grow-1 ml-2"
                  style={{ boxSizing: "border-box", padding: "5px" }}
                >
                  <canvas
                    id="myChart4"
                    className="chartjs-render-monitor"
                    width={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* vehicle count and vehicle type ended */}

      {/* Lane flow rate started */}
      <div className="row mb-2">
        <div className="col-md-12">
          <div className="card flex-md-row">
            <div className="card-body">
              <h1 className="d-inline-block mb-2">Lane Flow Rate</h1>
              <div className="row">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className="" />
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className="" />
                  </div>
                </div>
                <canvas ref={canvasRef} className="chartjs-render-monitor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Lane flow rate ended */}

      {/* hourly vehicle report started */}
      <div className="row mb-2">
        <div className="col-md-12">
          <div className="card flex-md-row">
            <div className="card-body">
              <h1 className="d-inline-block mb-2">Hourly Vehicle Count</h1>
              <div className="row">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className="" />
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className="" />
                  </div>
                </div>
                <canvas id="myChart1" className="chartjs-render-monitor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* hourly vehicle report ended */}
      {/* <div className="row mb-2">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <h1 className="d-inline-block mb-2">Peak Rush Hour</h1>
              <h2 className="mb-0" style={{ color: "blue" }}>
                12:00 to 13:00
              </h2>
              <br />
              <br />
              <h5 className="mb-0">Yesterday's peak rush hour</h5>
              <h5 className="mb-0">12:00 to 13:00</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6" />
      </div> */}
      <div className="row mb-2">
        <div className="col-md-12">
          <div className="card flex-md-row" />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6" />
      </div>
      {/* peak rush hour started */}
    </div>
  );
};

export default Report;
