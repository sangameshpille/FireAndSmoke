import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// import Styles from "../../components/cards/Card.module.css"
// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

export default function CustomPaginationActionsTable({
  rakeId,
  setTotalStatus1,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  function createData(WagonNo, EntryLoadStatus, SideViewImage, TopViewImage) {
    return { WagonNo, EntryLoadStatus, SideViewImage, TopViewImage };
  }

  // image modal
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const handleOpenModal = (imageURL) => {
    setModalImage(imageURL);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  // wagon details

  let [rows, setRows] = useState([]);
  let [totalStatus, setTotalStatus] = useState([]);
  // wagonrakeDetails api binding

  React.useEffect(() => {
    let fetchData = async () => {
      try {
        let data = await AxiosInstance.get(`/getRakedetails?rake_id=${rakeId}`);
        setRows(data.data.data?.wagon_data);
        setTotalStatus(data.data.data?.total);
        setTotalStatus1(data.data.data?.total);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [rakeId]);

  // const rows = [
  //   createData('RW-001', "Covered", Image3),
  //   createData('RW-002', "Empty",  Image6),
  //   createData('RW-003', "Covered", Image5),

  // ].sort((a, b) => (a.WagonNo < b.WagonNo ? -1 : 1));
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 600 }} stickyHeader aria-label="sticky table">
        {rows?.length > 0 && (
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bolder", textAlign: "center" }}>
                Wagon No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Wagon Load Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Wagon Side View Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Wagon Top View Image
              </TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" align="center">
                  {row.wagon_number}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row.wagon_status === 1
                    ? "Covered"
                    : row.wagon_status === 2
                    ? "Loaded"
                    : row.wagon_status === 3
                    ? "Empty"
                    : ""}
                </TableCell>

                <TableCell style={{ width: 200 }} align="right">
                  {row?.side_view_image ? (
                    <img
                      src={`${AxiosInstance.defaults.baseURL}/img/${row?.side_view_image}`}
                      alt="side_view_image"
                      style={{
                        width: "90%",
                        height: "6vh",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleOpenModal(
                          `${AxiosInstance.defaults.baseURL}/img/${row?.side_view_image}`
                        )
                      }
                    />
                  ) : (
                    <p style={{ textAlign: "center" }}>No Image</p>
                  )}
                </TableCell>
                <TableCell style={{ width: 200 }} align="right">
                  {row?.top_view_image ? (
                    <img
                      src={`${AxiosInstance.defaults.baseURL}/img/${row?.top_view_image}`}
                      alt="top_view_image"
                      style={{
                        width: "90%",
                        height: "6vh",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleOpenModal(
                          `${AxiosInstance.defaults.baseURL}/img/${row?.top_view_image}`
                        )
                      }
                    />
                  ) : (
                    <p style={{ textAlign: "center" }}>No Image</p>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <p style={{ textAlign: "center" }}>No Data Found</p>
                {/* Render the "No data found" message here */}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter> */}
        {/* {totalStatus?.length > 0 &&
          totalStatus.map((item, index) => {
            return (
              <tfoot key={index}>
                <tr style={{ height: "9vh" }}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    Total
                  </th>
                  <td
                    align="center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    &nbsp;
                    <div>Covered : {item[1]}</div>
                    &nbsp;
                    <div>Loaded : {item[2]}</div>
                    &nbsp;
                    <div>Empty : {item[3]}</div>
                  </td>

                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
              </tfoot>
            );
          })} */}
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: -40,
                right: -40,
                color: "white",
                background: "black",
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={modalImage}
              alt="modal_image"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Modal>
      </Table>
    </TableContainer>
  );
}
