import { Box } from "@mui/system";
import Cell from "./Cell";

interface TableProps {
  columns: string[];
  data: (string | number)[][];
  onRowClick?: (row: (string | number)[]) => void;
}

function Table(props: TableProps) {
  const styleHover = {
    transition: "200ms",
    ":hover": {
      bgcolor: "#EEEEEE",
      cursor: "pointer"
    }
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" boxShadow="0 0 5px 1px rgba(0, 0, 0, 0.2)">
      <Box display="flex" flexDirection="row" flex="1" bgcolor="rgb(20, 94, 168)" color="white">
        {props.columns.map(val => (
          <Cell key={val}>{val}</Cell>
        ))}
      </Box>
      {props.data.map((item, i) => (
        <Box
          key={i}
          onClick={() => props.onRowClick && props.onRowClick(item)}
          display="flex"
          flexDirection="row"
          flex="1"
          sx={props.onRowClick ? styleHover : {}}>
          {item.map((val, j) => (
            <Cell key={j}>{val}</Cell>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default Table;
