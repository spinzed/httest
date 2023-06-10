import { Box, Typography, TextField, Button, Backdrop } from "@mui/material";
import { useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddPackage from "../components/AddPackage";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { FullPackage, ReducedPackage } from "../types";
import { getDetailsByID } from "../utils/api";

interface HomeProps {
  onPackageChange: (p: FullPackage) => void;
}

function Home(props: HomeProps) {
  const [data, setData] = useState<ReducedPackage[]>();
  const [ID, setID] = useState<string>("");
  const [addingNew, setAddingNew] = useState(false);
  const fetchController = useRef<AbortController>(); // used to abort fetching data on unmount
  const navigate = useNavigate();

  const tableData = useMemo(() => {
    return data?.map((val) => {
      return [val.id, val.trackingCode, val.initiatedAt.toDateString(), val.status];
    });
  }, [data]);

  const onSubmitID = useCallback((id: string) => {
    if (isNaN(Number.parseInt(id))) {
      console.error("nije broj!");
      return;
    }
    if (fetchController.current) return;
    fetchController.current = new AbortController();

    getDetailsByID(Number.parseInt(id), fetchController.current.signal)
      .then(p => { props.onPackageChange(p); navigate("/" + p.id) })
      .catch(() => console.error("cannot get details"))
      .finally(() => fetchController.current = undefined)
  }, [ID]);

  return (
    <>
      <Box width="100%" margin="2em">
        <Typography>Enter ID to view package directly:</Typography>
        <Box display="flex">
          <Box flex="1"></Box>
          <Box flex="1" minWidth="20em">
            <TextField fullWidth onChange={e => setID(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSubmitID(ID) } />
          </Box>
          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
            <Button variant="outlined" onClick={() => setAddingNew(true)}>Add New</Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flex="1" width="80%" margin="2em" gap="2em">
        <Sidebar onDataChange={setData} />
        <Box className="row" flex="1">
          {tableData && <Table columns={["ID", "Tracking Code", "Initiated At", "Status"]} data={tableData} onRowClick={(data) => onSubmitID(data[0] as string)} /> }
        </Box>
      </Box>
      <Backdrop open={addingNew}>
        <AddPackage onPackageChange={p => { props.onPackageChange(p); navigate("/" + p.id) }} />
      </Backdrop>
    </>
  );
}

export default Home;