import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useState } from "react";
import { BiCalendar, BiSolidTimeFive } from "react-icons/bi";
import { BsTrainFrontFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import AxiosInstance from "../api/AxiosInstance";
import Footer from "./../../components/footer/Footer";
import Header from "./../../components/header/Header";
import Styles from "./Card.module.css";
import CustomPaginationActionsTable from "./Table";

export default function OverflowCard() {
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
  const [open, setOpen] = React.useState(null);

  const [allTrack, setTrack] = React.useState([]);
  // getLanes api

  useEffect(() => {
    let fetchData = async () => {
      try {
        let data = await AxiosInstance.get("/getLanes");
        let data1 = data.data.lanes;
        // let allLanesOption = {
        //   lane_id: 0,
        //   lane_name: "All Tracks",
        // };
        // data1?.unshift(allLanesOption);
        setTrack(data1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [trackData, setTrackData] = useState([]);

  // pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(12);
  const [pageSize, setPageSize] = useState(pageLimit);
  let [total, setTotal] = useState(0);
  let [todayLogs, setTodayLogs] = useState(0);
  let [entryLogs, setEntryLogs] = useState(0);
  let [exitLogs, setExitLogs] = useState(0);

  const changePageLimit = (event) => {
    setPageLimit(event.target.value);
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    const totalPages = Math.ceil(total / pageSize);
    setCurrentPage(totalPages);
  };
  // Calculate total pages
  const totalPages = Math.ceil(total / pageSize);

  // Calculate start and end page numbers for the pagination
  let startPage, endPage;
  if (totalPages <= 3) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 2) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }
  let [laneId, setLaneId] = useState(0);
  let handleChange = (e) => {
    let data = allTrack?.filter(
      (item) => item.lane_id === Number(e.target.value)
    )[0]?.lane_id;
    if (data) {
      setLaneId(data);
    } else {
      setLaneId(0);
    }
  };
  // pagination end
  // totalCount
  let [totalStatus, setTotalStatus] = useState([]);
  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/getLogs?lane_id=${laneId}&page_no=${currentPage}&page_limit=${Number(
            pageLimit
          )}`
        );
        setTrackData(response.data.data);
        setTotal(response.data.total_logs);
        setTodayLogs(response.data.total_count_after_midnight);
        setEntryLogs(response.data.entry_count_after_midnight);
        setExitLogs(response.data.exit_count_after_midnight);
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchTrackData();
  }, [laneId, currentPage, pageLimit]);
  const handleOpen = (id) => {
    setOpen(id);
    // document.body.classList.add('modal-open');
  };

  const handleClose = () => {
    setOpen(null);
    // document.body.classList.remove('modal-open');
  };

  // box-shadow applying

  return (
    <>
     <button onClick={topFunction} id="myBtn1" title="Go to top">Top</button>
    <div className={Styles.CardContainer}>
      <span>
        <Header />
      </span>

      <section className={Styles.todayLogsSection}>
        <article>
          <span>
            <span style={{ color: "white" }}>
              <BiSolidTimeFive />
            </span>
            <span
              style={{
                color: "white",
                fontFamily: "sans-serif",
                fontSize: "13px",
              }}
            >
              SINCE MID-NIGHT
            </span>
            <span style={{ color: "white", fontWeight: "bolder" }}>
              {todayLogs}
            </span>
          </span>
          <span>
            <span style={{ color: "white" }}>
              <BsTrainFrontFill />
            </span>
            <span
              style={{
                color: "white",
                fontFamily: "sans-serif",
                fontSize: "13px",
              }}
            >
              ENTRY
            </span>
            <span style={{ color: "white", fontWeight: "bolder" }}>
              {entryLogs}
            </span>
          </span>
          <span>
            <span style={{ color: "white" }}>
              <ImExit />
            </span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "13px",
                color: "white",
              }}
            >
              EXIT
            </span>
            <span style={{ color: "white", fontWeight: "bolder" }}>
              {exitLogs}
            </span>
          </span>
        </article>
      </section>
      <>
        <section
          className={`${Styles.appBar} `}
          style={{ marginTop: "-3.0rem" }}
        >
          <div className={`${Styles.childAppBar}`}>
            <div className={Styles.cardContainerBody}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  className="font-small mb-0"
                  style={{
                    marginRight: "5px",
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  Tracks
                </label>
                <select
                  className="browser-default custom-select-dropdown w-100 "
                  onChange={(e) => {
                    handleChange(e);
                    setSearchValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow =
                      "0px 0px 2px 2px rgb(40,181,250)";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {allTrack?.length > 0 ? (
                    <option value="0">All Tracks</option>
                  ) : (
                    <option value="0">Select Track</option>
                  )}
                  {allTrack?.length > 0 &&
                    allTrack.map((list) => {
                      return (
                        <Fragment>
                          <option value={list.lane_id}>{list.lane_name}</option>
                        </Fragment>
                      );
                    })}
                </select>
              </div>
              <div className={`${Styles.dropdownvalue}  `}>
                <select
                  style={{
                    width: "60px",
                    padding: "2px 5px",

                    boxShadow: "none",

                    background:
                      'url(\'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"%3e%3cpath fill="%23343a40" d="M2 0L0 2h4zm0 5L0 3h4z"/%3e%3c/svg%3e\') no-repeat right 0.75rem center/8px 10px, white',
                  }}
                  className="browser-default custom-select"
                  onChange={changePageLimit}
                  value={pageLimit}
                  onFocus={(e) => {
                    e.target.style.boxShadow =
                      "0px 0px 2px 2px rgb(40,181,250)"; // Apply box-shadow when focused
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none"; // Remove box-shadow when focus is lost
                  }}
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="60">60</option>
                  <option value="80">80</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>

            <div className={Styles.employeeDetails}>
              <h3>Rake Analytics</h3>
            </div>
            {/* <div style={{display:"flex",alignItems:"center",flexBasis:"13%"}}><span>Today Logs  </span><span className={Styles.todayLogsValue} style={{color:"black",background:"white"}}>{todayLogs}</span></div> */}
          </div>
        </section>
      </>
      <div
        className={Styles.container}
        style={{ minHeight: "calc(100vh - (88px + 123px))" }}
      >
        <aside className={Styles.cardSection}>
          <div
            style={{
              width: "90vw",
              background: "white",

              position: "relative",
              zIndex: 3,
              borderRadius: "10px 10px 0px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <>
              {trackData.length > 0 && (
                <div className={Styles.pagination}>
                  <button
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((page) => (
                    <button
                      // key={page}
                      onClick={() => setCurrentPage(page)}
                      disabled={currentPage === page}
                      className={currentPage === page ? Styles.active : ""}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                  <button
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </button>
                  <span className={Styles.paginationDataBar}>{` ${
                    (currentPage - 1) * pageLimit + 1
                  } - ${Math.min(
                    currentPage * pageLimit,
                    total
                  )} of ${total}`}</span>
                </div>
              )}
            </>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            {trackData.length > 0 ? (
              trackData.map((track) => (
                <>
                  <Card
                    key={track.ref_id}
                    variant="outlined"
                    sx={{
                      flex: "1 0 24%", // Set flex basis to 25% to display 4 cards in a row
                      minWidth: "280px", // Set a minimum width to prevent shrinking
                      maxWidth: "25%", // Set a maximum width to limit card width
                      margin: "10px 10px 50px 0px",
                      cursor: "pointer",
                      boxShadow:
                        "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.16)",
                    }}
                    onClick={() => handleOpen(track.ref_id)}
                  >
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        listStyleType: "none",
                        padding: "0",
                      }}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="2">
                          <img
                            src={`${AxiosInstance.defaults.baseURL}/img/${track?.image}`}
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <div
                        style={{
                          textAlign: "center",
                          paddingBottom: "35px",
                          marginTop: "-42px",
                        }}
                      >
                        <table className={Styles.tableHead1}>
                          <tbody>
                            {track.lane_name ? (
                              <tr>
                                <th className={Styles.trackProperties}>
                                  Track Name
                                </th>
                                :
                                <td
                                  className={Styles.datalists}
                                  style={{ textAlign: "start" }}
                                >
                                  {track.lane_name}
                                </td>
                              </tr>
                            ) : null}
                            {track.direction ||
                            track.direction === 0 ||
                            track.direction === null ? (
                              <tr>
                                <th className={Styles.trackProperties}>
                                  Direction
                                </th>
                                :
                                <td
                                  className={Styles.datalists}
                                  style={{ textAlign: "start" }}
                                >
                                  {track.direction === 0
                                    ? "Entry"
                                    : track.direction === 1
                                    ? "Exit"
                                    : "Null"}
                                </td>
                              </tr>
                            ) : null}
                            {track.no_of_wagons === 0 ? (
                              <tr>
                                <th className={Styles.trackProperties}>
                                  Wagon Count
                                </th>
                                :
                                <td
                                  className={Styles.datalists}
                                  style={{ textAlign: "start" }}
                                >
                                  0
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <th className={Styles.trackProperties}>
                                  Wagon Count
                                </th>
                                :
                                <td
                                  className={Styles.datalists}
                                  style={{ textAlign: "start" }}
                                >
                                  {track.no_of_wagons}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </span>
                    <div
                      style={{
                        background: "#F7403A",
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        left: "0",
                        borderRadius: " 0 0 5px 5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {track.first_detection_timstamp ? (
                        <>
                          <Typography level="h6" sx={{ mt: 0.1, mb: 0.1 }}>
                            <span
                              className={Styles.datalists}
                              style={{ color: "white" }}
                            >
                              {" "}
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "0px 0px",
                                  verticalAlign: "middle",
                                }}
                              >
                                <BiCalendar />
                              </span>{" "}
                              {new Date(
                                track.first_detection_timstamp
                              ).toLocaleString("en-US", {
                                month: "short", // Short month name (e.g., Jan)
                                day: "numeric", // Day of the month (e.g., 1)
                                year: "numeric", // Full year (e.g., 2022)
                                hour: "numeric", // Hour (e.g., 9)
                                minute: "numeric", // Minute (e.g., 0)
                                second: "numeric", // Second (e.g., 0)
                                hour12: true,
                              })}
                            </span>
                          </Typography>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Card>
                  <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open === track.ref_id}
                    onClose={handleClose}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Sheet
                      variant="outlined"
                      sx={{
                        width: "auto",
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "90vh",
                      }}
                    >
                      <ModalClose
                        variant="outlined"
                        sx={{
                          boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                          borderRadius: "50%",
                          bgcolor: "background.body",
                        }}
                      />
                      <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                        textAlign="center"
                      >
                        Rake Details
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <CardOverflow
                            sx={{
                              width: "100%",
                              height: "225px",
                              marginBottom: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={`${AxiosInstance.defaults.baseURL}/img/${track?.image}`}
                                loading="lazy"
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </CardOverflow>
                        </div>
                        <div>
                          <Typography
                            style={{
                              display: "flex",
                              margin: "0px 0px 0px 15px",
                              alignItems: "stretch",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                              }}
                            >
                              <table
                                border=""
                                className={Styles.tableHead1}
                                style={{
                                  borderCollapse: "collapse",
                                }}
                              >
                                <tbody>
                                  {track?.lane_name ? (
                                    <tr
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <th
                                        className={Styles.trackProperties}
                                        style={{ textAlign: "center" }}
                                      >
                                        Track Name
                                      </th>

                                      <td
                                        className={Styles.datalists}
                                        style={{ textAlign: "center" }}
                                      >
                                        {track.lane_name}
                                      </td>
                                    </tr>
                                  ) : null}
                                  {track?.first_detection_timstamp ? (
                                    <tr
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <th
                                        className={Styles.trackProperties}
                                        style={{ textAlign: "center" }}
                                      >
                                        Time
                                      </th>

                                      <td
                                        className={Styles.datalists}
                                        style={{ textAlign: "center" }}
                                      >
                                        {new Date(
                                          track.first_detection_timstamp
                                        ).toLocaleString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                          hour: "numeric",
                                          minute: "numeric",
                                          second: "numeric",
                                          hour12: true,
                                        })}
                                      </td>
                                    </tr>
                                  ) : null}
                                  {track?.direction ||
                                  track?.direction === 0 ||
                                  track?.direction === null ? (
                                    <tr
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <th
                                        className={Styles.trackProperties}
                                        style={{ textAlign: "center" }}
                                      >
                                        Direction
                                      </th>

                                      <td
                                        className={Styles.datalists}
                                        style={{ textAlign: "center" }}
                                      >
                                        {track.direction === 0
                                          ? "Entry"
                                          : track.direction === 1
                                          ? "Exit"
                                          : "Null"}
                                      </td>
                                    </tr>
                                  ) : null}
                                  {track?.duration ? (
                                    <tr
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <th
                                        className={Styles.trackProperties}
                                        style={{ textAlign: "center" }}
                                      >
                                        Duration
                                      </th>

                                      <td
                                        className={Styles.datalists}
                                        style={{ textAlign: "center" }}
                                      >
                                        {track.duration}
                                      </td>
                                    </tr>
                                  ) : null}
                                  {totalStatus?.length > 0 && (
                                    <tr>
                                      <th colSpan={2}>
                                        <span style={{ visibility: "hidden" }}>
                                          0
                                        </span>
                                      </th>
                                    </tr>
                                  )}

                                  {totalStatus?.length > 0 &&
                                    totalStatus?.map((item, index) => {
                                      return (
                                        <>
                                          <tr>
                                            <th
                                              colSpan={2}
                                              style={{
                                                textAlign: "center",
                                                fontSize: "15px",
                                              }}
                                            >
                                              Wagon Load Status Count
                                            </th>
                                          </tr>

                                          <Fragment key={index}>
                                            <tr
                                              style={{
                                                border: "1px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  textAlign: "center",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                Covered
                                              </th>
                                              <td
                                                style={{
                                                  textAlign: "center",
                                                  fontSize: "15px",
                                                }}
                                              >
                                                {item[1]}
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "1px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  textAlign: "center",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                Empty
                                              </th>
                                              <td
                                                style={{
                                                  textAlign: "center",
                                                  fontSize: "15px",
                                                }}
                                              >
                                                {item[3]}
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "1px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  textAlign: "center",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                Loaded
                                              </th>
                                              <td
                                                style={{
                                                  textAlign: "center",
                                                  fontSize: "15px",
                                                }}
                                              >
                                                {item[2]}
                                              </td>
                                            </tr>
                                          </Fragment>
                                        </>
                                      );
                                    })}
                                  {track?.no_of_wagons === 0 ? (
                                    <tr
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <th
                                        className={Styles.trackProperties}
                                        style={{
                                          whiteSpace: "nowrap",
                                          textAlign: "center",
                                        }}
                                      >
                                        Wagon Count
                                      </th>
                                      <td
                                        className={Styles.datalists}
                                        style={{ textAlign: "center" }}
                                      >
                                        0
                                      </td>
                                    </tr>
                                  ) : (
                                    <tr
                                      style={{
                                        border: "1px solid black",
                                        padding: "5px",
                                      }}
                                    >
                                      <th
                                        className={Styles.trackProperties}
                                        style={{
                                          whiteSpace: "nowrap",
                                          textAlign: "center",
                                        }}
                                      >
                                        Wagon Count
                                      </th>

                                      <td
                                        className={Styles.datalists}
                                        style={{ textAlign: "center" }}
                                      >
                                        {track.no_of_wagons}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </Typography>
                        </div>
                      </div>
                      <CustomPaginationActionsTable
                        rakeId={track.ref_id}
                        setTotalStatus1={setTotalStatus}
                      />
                    </Sheet>
                  </Modal>
                </>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "96%",
                  padding: "40px 0px 40px 0px",
                }}
              >
                <span>{trackData.length === 0 ? "No Data Found" : ""}</span>
              </div>
            )}
          </div>
          {/* <div
            style={{
              width: "90vw",
              background: "white",

              position: "relative",
              zIndex: 3,
              borderRadius: "10px 10px 0px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <>
              {trackData.length > 0 && (
                <div className={Styles.pagination}>
                  <button
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((page) => (
                    <button
                      // key={page}
                      onClick={() => setCurrentPage(page)}
                      disabled={currentPage === page}
                      className={currentPage === page ? Styles.active : ""}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                  <button
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </button>
                  <span className={Styles.paginationDataBar}>{` ${
                    (currentPage - 1) * pageLimit + 1
                  } - ${Math.min(
                    currentPage * pageLimit,
                    total
                  )} of ${total}`}</span>
                </div>
              )}
            </>
          </div> */}
        </aside>
      </div>
      <Footer />
    </div>
    </>
  );
}
