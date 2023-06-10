import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useRef, useState } from "react";
import { FullPackage, FullPackageNoID } from "../types";
import { add } from "../utils/api";
import RowEditor from "./RowEditor";

const columns = [
  { name: "Tracking Code", type: "string" },
  { name: "Initiated At", type: "date" },
  { name: "Buyer Name", type: "string" },
  { name: "Carrier Name", type: "string" },
  { name: "Delivery Address", type: "string" },
  { name: "Weight", type: "number" },
  { name: "Status", type: "status" },
];

interface AddPackageProps {
  onPackageChange: (p: FullPackage) => void;
}

function AddPackage(props: AddPackageProps) {
  const [temporaryValue, setTemporaryValue] = useState<FullPackageNoID>();
  const fetchController = useRef<AbortController>(); // used to abort fetching data on unmount
  
  const addPackage = useCallback(() => {
    if (!temporaryValue) return;

    if (fetchController.current) return;
    fetchController.current = new AbortController();
    add(temporaryValue, fetchController.current.signal)
      .then(p => props.onPackageChange(p))
      .catch(() => console.error("cant add"))
      .finally(() => fetchController.current = undefined)
  }, [temporaryValue]);

  return (
    <Box bgcolor="white" padding="5em" margin="5em" borderRadius="10px">
      <RowEditor columns={columns} onChange={v => setTemporaryValue(v)}></RowEditor>
      <Box marginTop="2em">
        <Button variant="contained" onClick={addPackage}>Save</Button>
      </Box>
    </Box>
  );
}

export default AddPackage;