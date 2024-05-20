import React, { useState,Fragment,useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Styles from "./DetailedReport.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";
const DetailedReport = () => {
  const [fromdate, setFromdate] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!fromdate) {
      // Check if both fromdatedetail and todatedetail have valid values
      return;
    }
    setSummaryLoading(true);
    try {
      const data = await AxiosInstance.get(`/summaryReport?date=${fromdate}`);
      console.log(data);
      const output = data?.data;

      if (output) {
        const response = await AxiosInstance.get(`/report/${output}`, {
          responseType: "blob", // Set responseType to 'blob' to handle binary data
        });

        // Create a URL for the blob data received from the server
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create an anchor element and set its attributes
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", output); // Set the desired file name

        // Trigger the click event on the anchor element to initiate download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object to release resources
        window.URL.revokeObjectURL(url);
        toast.success("Summary report file downloaded!", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      toast.error("Summary report file not downloaded!", {
        autoClose: 1000,
      });
    }
    setSummaryLoading(false);
    setFromdate("");
  };

  //   detailed report
  const [fromdatedetail, setFromdatedetail] = useState("");
  const [todatedetail, setTodatedetail] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const [allTrack, setTrack] = React.useState([]);
  let [laneId, setLaneId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const handleFormSubmitDetail = async (event) => {
    event.preventDefault();

    if (!fromdatedetail || !todatedetail ) {
      // Check if both fromdatedetail and todatedetail have valid values
      return;
    }
    setDetailLoading(true);
    try {
      const data = await AxiosInstance.get(
        `/detailedReport?from_date=${fromdatedetail}&to_date=${todatedetail}&track_ids=${searchValue !== '' ? Number(searchValue) : ''}`
      );
      if (data?.data?.message === "FAILED TO GENERATE REPORT") {
        toast.error("Detailed report file not downloaded!", {
          autoClose: 1000,
        });
      }
      const output = data?.data?.file_name;

      if (output) {
        const response = await AxiosInstance.get(`/report/${output}`, {
          responseType: "blob", // Set responseType to 'blob' to handle binary data
        });

        // Create a URL for the blob data received from the server
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create an anchor element and set its attributes
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", output); // Set the desired file name

        // Trigger the click event on the anchor element to initiate download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object to release resources
        window.URL.revokeObjectURL(url);
        toast.success("Detailed report file downloaded!", {
          autoClose: 1000,
        });
        setFromdatedetail("");
        setTodatedetail("");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      toast.error("Detailed report file not downloaded!", {
        autoClose: 1000,
      });
    }
    setDetailLoading(false);
    setFromdatedetail("");
    setTodatedetail("");
  };
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
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setTodatedetail(formattedDate);
    if (todatedetail && formattedDate > todatedetail) {
      setTodatedetail(null);
    }
  };
  const handleFromDateDetail = (date) => {
    const formattedDate = formatDate(date);
    setFromdatedetail(formattedDate);
  };

  const handleFromDate = (date) => {
    const formattedDate = formatDate(date);
    setFromdate(formattedDate);
  };
  const toDateMinDate = fromdatedetail ? new Date(fromdatedetail) : null;
  if (toDateMinDate) {
    toDateMinDate.setDate(toDateMinDate.getDate()); // Add one day to the "from date"
  }
  const today = new Date();
  return (
    <span>
      <div>
        <Header />
      </div>
      <div
        className="header1"
        style={{ minHeight: " calc(100vh - (88px + 60px))" }}
      >
        <section className={Styles.reportmain}>
          <article>
            <div className={Styles.headereport}>
              <h3>Summary Report</h3>
            </div>
            <div>
              <form onSubmit={handleFormSubmit} className={Styles.formControl}>
                <div>
                  <div className="form-group">
                    <label
                      htmlFor="fromdate"
                      style={{
                        fontWeight: 400,
                        padding: "2px",
                        fontSize: "0.9rem",
                      }}
                    >
                      Select date
                    </label>
                    <div style={{ position: "relative", zIndex: "5" }}>
                      <DatePicker
                        selected={fromdate ? new Date(fromdate) : null}
                        onChange={handleFromDate}
                        className="form-control"
                        required
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Select date"
                        maxDate={today}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  {/* Show loader while loading */}
                  {summaryLoading ? (
                    <button
                      type="submit"
                      className={Styles.loadingColor}
                      disabled={summaryLoading}
                    >
                      Downloading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-outline-danger btn-large rounded-lg w-100 font-weight-bold"
                      disabled={summaryLoading}
                    >
                      Download Summary Report
                    </button>
                  )}
                </div>
              </form>
            </div>
          </article>
        </section>
        <br />
        <section className={Styles.reportmain} style={{ marginTop: "10px" }}>
  <article>
    <div className={Styles.headereport}>
      <h3>Detailed Report</h3>
    </div>
    <div>
      <form onSubmit={handleFormSubmitDetail} className={Styles.formControl}>
        <div>
          {/* From Date */}
          <div className="col-md-4 mb-3">
            <label
              htmlFor="fromdate"
              style={{
                fontWeight: 400,
                padding: "2px",
                fontSize: "0.9rem",
              }}
            >
              From date
            </label>
            <div
              style={{
                position: "relative",
              }}
            >
              <DatePicker
                selected={fromdatedetail ? new Date(fromdatedetail) : null}
                onChange={handleFromDateDetail}
                className="form-control"
                required
                dateFormat="dd-MM-yyyy"
                placeholderText="Select from date"
                maxDate={today}
              />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <label
              htmlFor="todate"
              style={{
                fontWeight: 400,
                padding: "2px",
                fontSize: "0.9rem",
              }}
            >
              To date
            </label>
            <div style={{ position: "relative" }}>
              <DatePicker
                selected={todatedetail ? new Date(todatedetail) : null}
                onChange={handleDateChange}
                className="form-control"
                required
                dateFormat="dd-MM-yyyy"
                placeholderText="Select to date"
                minDate={toDateMinDate}
                maxDate={today}
              />
            </div>
          </div>

          <div className="col-md-4 mb-3 col-2">
  <label
    htmlFor="tracks"
    style={{
      fontWeight: 400,
      padding: "2px",
      fontSize: "0.9rem",
      display: "block",
    }}
  >
    Tracks
  </label>
  <div className={Styles.fullWidthSelect}>
    <select
      className="custom-select-dropdown "
      style={{ width: "100%" }}
      onChange={(e) => {
        handleChange(e);
        setSearchValue(e.target.value);
      }}
      onFocus={(e) => {
        if (e.target) {
          e.target.style.boxShadow = "0px 0px 2px 2px rgb(40, 181, 250)";
        }
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "none";
      }}
    >
      {allTrack?.length > 0 ? (
        <option value="0">All Tracks </option>
      ) : (
        <option value="0">Select Track </option>
      )}
      {allTrack?.length > 0 &&
        allTrack.map((list) => {
          return <option value={list.lane_id}>{list.lane_name}</option>;
        })}
    </select>
  </div>
</div>
 </div>
        <div className="text-center">
          {/* Show loader while loading */}
          {detailLoading ? (
            <button
              type="submit"
              className={Styles.loadingColor}
              disabled={detailLoading}
            >
              Downloading ....
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-outline-danger btn-large rounded-lg w-100 font-weight-bold"
              disabled={detailLoading}
            >
              Download Detailed Report
            </button>
          )}
        </div>
      </form>
    </div>
  </article>
</section>

      </div>
      <div>
        <Footer />
      </div>
    </span>
  );
};

export default DetailedReport;
