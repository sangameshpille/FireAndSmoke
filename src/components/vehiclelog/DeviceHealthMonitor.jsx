import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Styles from "./../cards/Card.module.css";
import AxiosInstance from "../api/AxiosInstance";
import "./vehiclelog.css";
import { BiCalendar, BiSolidTimeFive } from "react-icons/bi";
import Footer from "../footer/Footer";
import Badge from '@mui/material/Badge';
import { green, red } from '@mui/material/colors';


const DeviceHealthMonitor = () => {


    // Get the button
    let mybutton = document.getElementById("myBtn1");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    // Get the modal
    var modal = document.getElementById("id01");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };


    const [laneId, setLaneId] = useState(0);
    const [lanes, setLanes] = useState([]);
    const [laneId1, setLaneId1] = useState(0);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = await AxiosInstance.get("/DropDown");
                setLanes(data?.data?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleLaneIdChange = (event) => {
        setLaneId(event.target.value);
    };

    const handleSearchClick = () => {
        setLaneId1(laneId);
    };

    const handleResetClick = () => {
        setLaneId1(0);
        setLaneId(0);
    };

    useEffect(() => {
        let fetchSearchData = async () => {
            try {
                let data = await AxiosInstance.get(
                    `/get_device_health_monitor?track_id=${laneId1}`
                );
                setSearchData(data?.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSearchData();
    }, [laneId1]);

    return (
        <>
            <button onClick={topFunction} id="myBtn1" title="Go to top">Top</button>
            <section>
                <article>
                    <div>
                        <Header />
                    </div>

                    {/* search vehicle inputs started*/}
                    <div className="card p-0 mb-5 card-shadow">
                        <div className="card-body py-2 px-4">
                            <div className="row">
                                <div className="col-2 trackInput">
                                    <div className="my-3 text-left">
                                        <label className="custom-label">Camera Id</label>
                                        <select
                                            className="browser-default custom-select-dropdown w-100 fromdate"
                                            value={laneId}
                                            onChange={handleLaneIdChange}
                                            onFocus={(e) => {
                                                e.target.style.boxShadow =
                                                    "0px 0px 2px 2px rgb(40,181,250)";
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.boxShadow = "none";
                                            }}
                                        >
                                            <option value="0">All Camera Id</option>
                                            {lanes?.length > 0 &&
                                                lanes.map((list) => {
                                                    return (
                                                        <option value={list.camera_id} key={list.camera_id}>
                                                            {list.camera_name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-2 px-4 bg-white">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <div className="my-0">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-large rounded-lg w-100 font-weight-bold serchButton"
                                            onClick={handleSearchClick}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="my-0">
                                        <button
                                            type="button"
                                            className="btn btn-large rounded-lg w-100 btn-outline-danger font-weight-bold resetButton"
                                            onClick={handleResetClick}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* table started */}
                    <section className={`${Styles.appBar} `}>
                        <div className={`${Styles.childAppBar}`} style={{ justifyContent: 'center', top: '40px', padding: "15px" }}>
                            <div className={Styles.employeeDetails}>
                                <h3>Device health monitor</h3>
                            </div>
                        </div>
                    </section>
                    <div className={Styles.container} style={{ minHeight: " calc(100vh - (88px + 283px))" }}>
                        <aside className={Styles.cardSection} style={{ padding: "30px", width: searchData.length > 0 ? "fit-content" : "auto" }}>
                            {/* table data started */}
                            {searchData.length > 0 ? (
                                <div style={{ margin: 0 }}>
                                    <table>
                                        <thead>
                                            <tr className="tableHead">
                                                <th>Lane Id</th>
                                                <th>Lane name</th>
                                                <th>Device status</th>
                                                <th>Device ping last timestamp</th>
                                                <th>Side view camera status</th>
                                                <th>Side view camera status last timestamp</th>
                                                <th>Top view camera status</th>
                                                <th>Top view camera status last timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchData.map((list) => {
                                                return (
                                                    <React.Fragment key={list.lane_id}>
                                                        <tr key={list.lane_id} className="tableHead">
                                                            <td>{list.lane_id}</td>
                                                            <td>{list.lane_name}</td>
                                                            <td>{list.device_status ? (
                                                                    <Badge badgeContent="Online" color="success" >
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge badgeContent="Offline" color="error" >
                                                                    </Badge>
                                                                )}</td>
                                                            <td>
                                                                {list.device_ping_last_timestamp ? (
                                                                    <>
                                                                        {new Date(list.device_ping_last_timestamp).toLocaleString("en-US", {
                                                                             month: "short",
                                                                             day: "numeric",
                                                                             year: "numeric",
                                                                             hour: "numeric",
                                                                             minute: "numeric",
                                                                             second: "numeric",
                                                                             hour12: true,
                                                                        })}
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                            <td>
                                                                {list.side_view_camera_status ? (
                                                                    <Badge badgeContent="Online" color="success" >
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge badgeContent="Offline" color="error" >
                                                                    </Badge>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {list.side_view_camera_status_last_timestamp ? (
                                                                    <>
                                                                        {new Date(list.side_view_camera_status_last_timestamp).toLocaleString("en-US", {
                                                                            month: "short",
                                                                            day: "numeric",
                                                                            year: "numeric",
                                                                            hour: "numeric",
                                                                            minute: "numeric",
                                                                            second: "numeric",
                                                                            hour12: true,
                                                                        })}
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                            <td>{list.top_view_camera_status ? (
                                                                    <Badge badgeContent="Online" color="success" >
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge badgeContent="Offline" color="error" >
                                                                    </Badge>
                                                                )}</td>
                                                            <td>
                                                                {list.top_view_camera_status_last_timestamp ? (
                                                                    <>
                                                                        {new Date(list.top_view_camera_status_last_timestamp).toLocaleString("en-US", {
                                                                           month: "short",
                                                                           day: "numeric",
                                                                           year: "numeric",
                                                                           hour: "numeric",
                                                                           minute: "numeric",
                                                                           second: "numeric",
                                                                           hour12: true,
                                                                        })}
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "96%", padding: "10px 0px 50px 0px" }}>
                                    <h1 style={{ fontWeight: 300 }}>No Data Found</h1>
                                </div>
                            )}
                            {/* table data ended */}
                        </aside>
                    </div>
                    <Footer />
                </article>
            </section>
        </>
    );
};

export default DeviceHealthMonitor;
