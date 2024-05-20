import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import "./vehiclelog.css";
import "./../cards/Card.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AxiosInstance from "../api/AxiosInstance";
import Styles from "./../cards/Card.module.css";
import { BiCalendar, BiSolidTimeFive } from "react-icons/bi";
import Grid from '@mui/material/Grid';

import Footer from "../footer/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VehicleLog = () => {
  let mybutton = document.getElementById("myBtn1");
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
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  var modal = document.getElementById("id01");
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const [laneId, setLaneId] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [lanes, setLanes] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [pageLimit, setPageLimit] = useState(12);
  const [formdate1, setFormdate1] = useState("");
  const [todate1, setToDate1] = useState("");
  const [laneId1, setLaneId1] = useState(0);
  const [direction1, setDirection1] = useState(-1);
  const [pageno1, setPageno1] = useState(1);
  const [pageLimit1, setPageLimit1] = useState(12);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleFromDateChange = (date) => {
    const formattedDate = formatDate(date);
    setFromDate(formattedDate);
  };
  const handleToDateChange = (date) => {
    const formattedDate = formatDate(date);
    setToDate(formattedDate);
    if (todate && formattedDate < todate) {
      setToDate(null);
    }
  };

  const handleOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      try {
        let data = await AxiosInstance.get("/DropDown");
        console.log(data);
        setLanes(data?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, []);
  const handleLaneIdChange = (event) => {
    setLaneId(event.target.value);
  };
  const handleSearchClick = () => {
    setLaneId1(laneId);
    // setPageno1(pageno);
    setPageLimit1(pageLimit);
    setFormdate1(fromdate);
    setToDate1(todate);
    setDirection1(direction);
    setCurrentPage(1);
    setPageno(1);
    setPageno1(1);
  };
  let [totalStatus, setTotalStatus] = useState([]);
  const handleResetClick = () => {
    setLaneId1(0);
    setPageno1(1);
    setPageLimit1(12);
    setFormdate1("");
    setToDate1("");
    setDirection1(-1);
    setLaneId(0);
    setPageno(1);
    setPageLimit(12);
    setFromDate("");
    setToDate("");
    setDirection(-1);
    setCurrentPage(1);
  };
  //   pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageLimit);
  let [total, setTotal] = useState(0);
  const changePageLimit = (event) => {
    setPageLimit(event.target.value);
    setPageLimit1(event.target.value);
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
  };
  const handleNextPage = () => {
    setCurrentPage((prevCurrentPage) => {
      setPageno(prevCurrentPage + 1);
      setPageno1(prevCurrentPage + 1);
      return prevCurrentPage + 1;
    });
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevCurrentPage) => {
      setPageno(prevCurrentPage - 1);
      setPageno1(prevCurrentPage - 1);
      return prevCurrentPage - 1;
    });
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageno(1);
    setPageno1(1);
  };
  const handleLastPage = () => {
    const totalPages = Math.ceil(total / pageSize);
    setCurrentPage(totalPages);
    setPageno(totalPages);
    setPageno1(totalPages);
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageno(page);
    setPageno1(page);
  };
  //   serach api data state
  let [searchData, setSearchData] = useState([]);
  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      try {
        // Construct the base URL
        let url = `/Logs?page_no=${pageno1}&page_limit=${pageLimit1}`;

        // Check if fromdate1 is selected
        if (formdate1) {
          url += `&from_date=${new Date(formdate1).toISOString().split('T')[0]}`;
        }

        // Check if todate1 is selected
        if (todate1) {
          url += `&to_date=${new Date(todate1).toISOString().split('T')[0]}`;
        }

        // Check if laneId1 is selected
        if (laneId1 !== 0) {
          url += `&camera_id=${laneId1}`;
        }

        // Make the API call with the constructed URL
        let data = await AxiosInstance.get(url);
        console.log(data?.data.data);
        setSearchData(data?.data.data);
        setTotal(data?.data.total_logs);

        console.log(data.data.total_logs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSearchData();
  }, [laneId1, pageno1, pageLimit1, formdate1, todate1, direction1]);
  const toDateMinDate = fromdate ? new Date(fromdate) : null;
  if (toDateMinDate) {
    toDateMinDate.setDate(toDateMinDate.getDate()); // Add one day to the "from date"
  }
  const today = new Date();
  return (
    <>
      <button onClick={topFunction} id="myBtn1" title="Go to top">Top</button>
      <section>
        <article>
          <div>
            <Header />
          </div>
          {/* search vehicle inputs started*/}
          <>
            <div className="card p-0 mb-5 card-shadow">
              <div className="card-body py-2 px-4">
                <div className="row">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className="my-3 text-left">
                        <label className="custom-label">From date</label>
                        <DatePicker
                          selected={fromdate ? new Date(fromdate) : null}
                          onChange={handleFromDateChange}
                          className="fromdate"
                          required
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Select from date"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className="my-3 text-left">
                        <label className="custom-label">To date</label>
                        <DatePicker
                          selected={todate ? new Date(todate) : null}
                          onChange={handleToDateChange}
                          className="fromdate"
                          required
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Select to date"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className="my-3 text-left">
                        <label className="custom-label">Camera Id</label>
                        <select
                          className="browser-default custom-select-dropdown w-100 fromdate"
                          value={laneId}
                          onChange={handleLaneIdChange}
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
                    </Grid>
                  </Grid>

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
          </>

          {/* table started */}

          <>
            <section className={`${Styles.appBar} `}>
              <div className={`${Styles.childAppBar}`}>
                <div className={Styles.cardContainerBody}>
                  <div className={`${Styles.dropdownvalue}  `}>
                    <span style={{ marginRight: "2px" }}>Entries</span>
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
                  <h3>Fire And Smoke Detection Logs</h3>
                </div>
                {/* <div style={{display:"flex",alignItems:"center",flexBasis:"13%"}}><span>Today Logs  </span><span className={Styles.todayLogsValue} style={{color:"black",background:"white"}}>{todayLogs}</span></div> */}
              </div>
            </section>
          </>
          <div
            className={Styles.container}
            style={{ minHeight: " calc(100vh - (88px + 283px))" }}
          >

            <aside className={Styles.cardSection} style={{ padding: "0" }}>
              <div
                style={{
                  width: "90vw",
                  background: "white",
                  margin: "15px auto 6px",
                  padding: "10px 15px",
                  position: "relative",
                  borderRadius: "10px 10px 0px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: loading ? "40vh" : "auto",
                  flexDirection: "column",
                }}
              >
                <div className="loader-container">
                  {loading && (
                    <div className="loader">
                      <CircularProgress />
                    </div>
                  )}
                </div>
                <div style={{ flexGrow: 1 }}>
                  {(searchData.length) > 0 && (
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
                          key={page}
                          onClick={() => handlePageChange(page)}
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
                      <span className={Styles.paginationDataBar}>{` ${(currentPage - 1) * pageLimit + 1
                        } - ${Math.min(
                          currentPage * pageLimit,
                          total
                        )} of ${total}`}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* table data started  */}

              {(searchData.length && !loading) > 0 ? (
                <>
                  <div className={Styles.cardParentContent}>

                    {searchData.map((list) => {
                      return (
                        <React.Fragment key={list.id}>
                          <Card
                            key={list.id}
                            variant="outlined"
                            sx={{
                              flex: "1 0 24%", // Set flex basis to 25% to display 4 cards in a row
                              minWidth: "280px", // Set a minimum width to prevent shrinking
                              maxWidth: "25%", // Set a maximum width to limit card width
                              margin: "10px 10px 50px 10px",
                              boxShadow:
                                "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.16)",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                listStyleType: "none",
                                padding: "0",
                                cursor:"pointer"
                              }}
                            >
                              <CardOverflow onClick={() => handleOpen(list.id)}>
                                <AspectRatio ratio="2">
                                  <img
                                    src={`${AxiosInstance.defaults.baseURL}/img/${list?.image}`}
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
                                    {list.camera_name ? (
                                      <tr>
                                        <th className={Styles.trackProperties}>
                                          Camera name
                                        </th>
                                        :
                                        <td
                                          className={Styles.datalists}
                                          style={{ textAlign: "start" }}
                                        >
                                          {list.camera_name}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {list?.camera_id ? (
                                      <tr>
                                        <th className={Styles.trackProperties}>
                                          Camera id
                                        </th>
                                        :
                                        <td
                                          className={Styles.datalists}
                                          style={{ textAlign: "start" }}
                                        >
                                          {list.camera_id}
                                        </td>
                                      </tr>
                                    ) : null}

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
                              {list.timestamp ? (
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
                                        list.timestamp
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
                    open={open === list.id}
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
                        p: 5,
                        boxShadow: "lg",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "auto",
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
                    
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <CardOverflow
                          
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "300px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={`${AxiosInstance.defaults.baseURL}/img/${list?.image}`}
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
                       
                      </div>
                    
                    </Sheet>
                  </Modal>
                        </React.Fragment>
                      );
                    })}

                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "96%",
                    padding: "10px 0px 50px 0px",
                  }}
                >
                  {!loading && <h1 style={{ fontWeight: 300 }}>No Data Found</h1>}
                </div>
              )}
              {/* table data ended  */}
            </aside>
          </div>
          <Footer />
        </article>
      </section>
    </>
  );
};

export default VehicleLog;
