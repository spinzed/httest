import { MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { FullPackageNoID } from "../types";
import { StatusValues } from "../utils/status";
import Cell from "./Cell";

interface Column {
  name: string;
  type: string;
  //type: "string" | "date" | "number" | "status"
}

interface RowEditorProps {
  columns: Column[];
  data?: FullPackageNoID;
  onChange: (p: FullPackageNoID) => void;
}

function RowEditor(props: RowEditorProps) {
  const d = props.data;
  const [dataArray, setDataArray] = useState(() => {
    if (!d) {
      return ["", new Date(), "", "", "", 0, ""];
    }
    return [d.trackingCode, d.initiatedAt, d.buyerName, d.carrierName, d.deliveryAddress, d.weight, d.status]
  });

  const onChange = useCallback((val: any, i: number) => {
    dataArray[i] = val;
    setDataArray([...dataArray]);
    props.onChange({
      trackingCode: dataArray[0],
      initiatedAt: dataArray[1],
      buyerName: dataArray[2],
      carrierName: dataArray[3],
      deliveryAddress: dataArray[4],
      weight: dataArray[5],
      status: dataArray[6],
    });
  }, [dataArray]);

  return (
    <Box display="flex" flexDirection="column" width="100%" boxShadow="0 0 5px 1px rgba(0, 0, 0, 0.2)">
      <Box display="flex" flexDirection="row" flex="1" bgcolor="rgb(20, 94, 168)" color="white">
        {props.columns.map(val => (
          <Cell key={val.name}>{val.name}</Cell>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flex="1"
      >
        {dataArray.map((item, i) => {
          let r;
          if (props.columns[i].type == "date") {
            r = <DatePicker onChange={val => onChange(val, i)} value={dayjs(item)} />;
          } else if (props.columns[i].type == "number") {
            r = <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={e => onChange(e.target.value, i)} value={item} />;
          } else if (props.columns[i].type == "status") {
            r = <Select value={item} onChange={e => onChange(e.target.value, i)} fullWidth>
              {StatusValues.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>;
          } else {
            r = <TextField value={item} onChange={e => onChange(e.target.value, i)} />
          }
          return (
            <Box
              key={i}
              display="flex"
              flexDirection="row"
              flex="1"
            >
              {r}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default RowEditor;