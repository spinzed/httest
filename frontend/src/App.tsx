import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box } from "@mui/material";
import Header from "./components/Header";
import Home from "./routes/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Package from "./routes/Package";
import { useState } from "react";
import { FullPackage } from "./types";

function App() {
  const [data, setData] = useState<FullPackage>();

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" flexDirection="column" width="100%" height="100%">
          <Header />
          <Box display="flex" flexDirection="column" alignItems="center" flex="1" padding="1em" boxSizing="border-box">
            <Routes>
              <Route path="/" element={<Home onPackageChange={setData} />} />
              <Route path="/:id" element={<Package data={data} onPackageChange={setData} />} />
            </Routes>
          </Box>
        </Box>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
