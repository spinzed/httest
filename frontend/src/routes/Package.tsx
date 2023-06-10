import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RowEditor from "../components/RowEditor";
import Table from "../components/Table";
import { FullPackage, FullPackageNoID } from "../types";
import { getDetailsByID, remove, update } from "../utils/api";

const tableColumns = ["Tracking Code", "Initiated At", "Buyer Name", "Carrier Name", "Delivery Address", "Weight", "Status"];
const rowColumns = [
  { name: "Tracking Code", type: "string" },
  { name: "Initiated At", type: "date" },
  { name: "Buyer Name", type: "string" },
  { name: "Carrier Name", type: "string" },
  { name: "Delivery Address", type: "string" },
  { name: "Weight", type: "number" },
  { name: "Status", type: "status" },
];

interface PackageProps {
  data?: FullPackage;
  onPackageChange: (p: FullPackage) => void;
}

function Package(props: PackageProps) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const fetchController = useRef<AbortController>(); // used to abort fetching data on unmount
  const [overlay, setOverlay] = useState(false);
  const [editingRow, setEditingRow] = useState(false);
  const [temporaryValue, setTemporaryValue] = useState<FullPackageNoID>();

  useEffect(() => {
    if (props.data) return;

    // if data wasn't passed by the props (page reload), fetch it using id from url
    if (fetchController.current) return;
    fetchController.current = new AbortController();
    getDetailsByID(Number.parseInt(id as string), fetchController.current.signal)
      .then(p => props.onPackageChange(p))
      .catch(() => navigate("/"))
      .finally(() => fetchController.current = undefined)
  }, []);

  const onDelete = useCallback(() => {
    if (fetchController.current) return;
    fetchController.current = new AbortController();
    remove(Number.parseInt(id as string), fetchController.current.signal)
      .then(() => navigate("/"))
      .catch(() => console.error("cant delete"))
      .finally(() => fetchController.current = undefined)
    
  }, []);

  const sendUpdate = useCallback(() => {
    if (!temporaryValue) return;

    setEditingRow(false);
    const newPackage: FullPackage = Object.assign({ id }, temporaryValue);

    if (fetchController.current) return;
    fetchController.current = new AbortController();
    update(newPackage, fetchController.current.signal)
      .then(() => props.onPackageChange(newPackage))
      .catch(() => console.error("cant update"))
      .finally(() => fetchController.current = undefined)
    
  }, [editingRow, temporaryValue]);

  if (!props.data) return <></>;

  const p = props.data;

  return (
    <Box margin="3em" width="80%" display="flex" flexDirection="column" gap="2em">
      <Typography variant="h4">Showing data for package ID {props.data.id}:</Typography>
      {editingRow ? (
        <RowEditor data={p} columns={rowColumns} onChange={v => setTemporaryValue(v)}></RowEditor>
      ) : (
        <Table
          columns={tableColumns}
          data={[[p.trackingCode, p.initiatedAt.toDateString(), p.buyerName, p.carrierName, p.deliveryAddress, p.weight, p.status]]}
        />
      )}
      <Box display="flex" gap="2em" justifyContent="center">
        {editingRow ? <>
          <Button variant="outlined" color="error" onClick={() => setEditingRow(false)}>Cancel</Button>
          <Button variant="contained" onClick={sendUpdate}>Save</Button>
        </> : <>
          <Button variant="contained" onClick={() => setEditingRow(true)}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => setOverlay(true)}>Delete</Button>
        </>
        }
      </Box>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={overlay}
      >
        <Box display="flex" flexDirection="column" gap="2em" bgcolor="#dddddd" padding="3em" borderRadius="10px" boxShadow="0 0 5px 1px rgba(0, 0, 0, 0.2)">
          <Typography variant="h6" color="black">Do you really wish to delete it?</Typography>
            <Box display="flex" gap="2em" justifyContent="center">
              <Button variant="outlined" onClick={() => { setOverlay(false); setTemporaryValue(undefined) }}>Cancel</Button>
              <Button variant="contained" onClick={onDelete} color="error">Delete</Button>
            </Box>
        </Box>
      </Backdrop>
    </Box>
  );
}

export default Package;