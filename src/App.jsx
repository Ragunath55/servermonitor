import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper
} from "@mui/material";
import Windows from "./Servers/windows";
import Linux from "./Servers/linux";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: 24 }}>
      {value === index && <Typography component="div">{children}</Typography>}
    </div>
  );
}

function App() {
  const [tab, setTab] = useState(0);

  // Set the background on mount
  useEffect(() => {
    document.body.style.backgroundColor = "#330033";
    document.body.style.backgroundImage =
      "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27347%27 height=%27347%27 viewBox=%270 0 800 800%27%3E%3Cg fill=%27none%27 stroke=%27%23404%27 stroke-width=%271%27%3E%3Cpath d=%27M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63%27/%3E%3Cpath d=%27M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764%27/%3E%3Cpath d=%27M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880%27/%3E%3Cpath d=%27M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382%27/%3E%3Cpath d=%27M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269%27/%3E%3C/g%3E%3Cg fill=%27%23505%27%3E%3Ccircle cx=%27769%27 cy=%27229%27 r=%275%27/%3E%3Ccircle cx=%27539%27 cy=%27269%27 r=%275%27/%3E%3Ccircle cx=%27603%27 cy=%27493%27 r=%275%27/%3E%3Ccircle cx=%27731%27 cy=%27737%27 r=%275%27/%3E%3Ccircle cx=%27520%27 cy=%27660%27 r=%275%27/%3E%3Ccircle cx=%27309%27 cy=%27538%27 r=%275%27/%3E%3Ccircle cx=%27295%27 cy=%27764%27 r=%275%27/%3E%3Ccircle cx=%2740%27 cy=%27599%27 r=%275%27/%3E%3Ccircle cx=%27102%27 cy=%27382%27 r=%275%27/%3E%3Ccircle cx=%27127%27 cy=%2780%27 r=%275%27/%3E%3Ccircle cx=%27370%27 cy=%27105%27 r=%275%27/%3E%3Ccircle cx=%27578%27 cy=%2742%27 r=%275%27/%3E%3Ccircle cx=%27237%27 cy=%27261%27 r=%275%27/%3E%3Ccircle cx=%27390%27 cy=%27382%27 r=%275%27/%3E%3C/g%3E%3C/svg%3E')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          mx: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: '#fff' }}>
          Server Summary
        </Typography>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          Welcome, User
        </Typography>
      </Box>
      <Box sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
      }}>
        <Paper elevation={6} sx={{ mt: 2, minWidth: 400, width: '98%', borderRadius: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Windows" />
            <Tab label="Linux" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            {Windows()}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {Linux()}
          </TabPanel>
        </Paper>
      </Box>
    </>
  );
}

export default App;
