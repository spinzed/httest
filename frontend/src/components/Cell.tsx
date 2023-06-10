import { Box } from "@mui/material";

interface CellProps {
  children: any;
}

function Cell(props: CellProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex="1" height="3em">
      {props.children}
    </Box>
  );
}

export default Cell;