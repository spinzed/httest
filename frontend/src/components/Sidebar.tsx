import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReducedPackage } from "../types";
import { getByDate, getRecent } from "../utils/api";

interface SidebarProps {
  onDataChange: (data: ReducedPackage[]) => void;
}

function Sidebar(props: SidebarProps) {
  const [firstDate, setFirstDate] = useState<dayjs.Dayjs>();
  const [secondDate, setSecondDate] = useState<dayjs.Dayjs>();

  const fetchController = useRef<AbortController>(); // used to abort fetching data on unmount
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
    return () => {
      if (fetchController.current) fetchController.current.abort();
    }
  }, []);

  const handleRecent = useCallback(() => {
    if (fetchController.current) return; // don't interrupt fetch in progress
    fetchController.current = new AbortController();
    getRecent(fetchController.current.signal)
      .then(val => props.onDataChange(val))
      .catch(() => console.error("error fetching recent data"))
      .finally(() => fetchController.current = undefined);
  }, []);

  const handleDate = useCallback(() => {
    if (!firstDate || !secondDate) return;
    fetchController.current = new AbortController();
    getByDate(firstDate.toDate(), secondDate.toDate(), fetchController.current.signal)
      .then(val => props.onDataChange(val))
      .catch(() => console.error("error fetching data by date range"))
      .finally(() => fetchController.current = undefined);
  }, [firstDate, secondDate]);

  return (
    <Box width="15em" boxShadow="0 0 5px 1px rgba(0, 0, 0, 0.2)" padding="2em 1em" boxSizing="border-box">
      <Button variant="contained" onClick={handleRecent}>Recent</Button>
      <hr />
      <Typography>From:</Typography>
      <DatePicker format="DD/MM/YYYY" onChange={date => setFirstDate(date as dayjs.Dayjs)} />
      <Typography>To:</Typography>
      <DatePicker format="DD/MM/YYYY" onChange={date => setSecondDate(date as dayjs.Dayjs)} />
      <Box margin="1em">
        <Button variant="contained" onClick={handleDate}>Find</Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
