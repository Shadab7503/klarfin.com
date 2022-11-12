import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CreditHistoryData } from "../../dummy_data/data";
const CreditHistory = (props: { data: CreditHistoryData }) => {
  return (
    <Grid item xs={12} mt={5}>
      <Grid container>
        <TableContainer className="custom-scrollbar">
          <Table
            sx={{
              borderCollapse: "separate",
            }}
          >
            <TableHead>
              <TableRow className="receivables-header">
                {props.data.columns.map((column) => {
                  return (
                    <TableCell
                      key={column.headerName}
                      align="center"
                      className="receivables-column-header"
                    >
                      {column.headerName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.rows?.map((row, index: number) => (
                <TableRow key={`${index}_row`}>
                  {props.data.columns?.map((column, colIndex: number) => (
                    <TableCell
                      key={`${index}_${colIndex}_col`}
                      className="receivables-row-value"
                      align="center"
                    >
                      {typeof row[column.field] === "number"
                        ? Number(row[column.field]) === 0
                          ? "-"
                          : Math.abs(Number(row[column.field])).toLocaleString(
                              "en-IN"
                            )
                        : row[column.field]}
                      {column.field === "rate" && row[column.field] !== 0
                        ? "%"
                        : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default CreditHistory;
