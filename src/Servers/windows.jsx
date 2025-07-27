import {
    Box,
    Card,
    CardContent,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Grid,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const serverData = [
    { id: 1, server: "web-prod-01", uptime: "5d 4h", status: "Active", lastLogin: "2024-07-27 09:12" },
    { id: 2, server: "db-main-01", uptime: "NA", status: "Inactive", lastLogin: "2024-07-25 22:41" },
    { id: 3, server: "api-gateway-02", uptime: "2h 12m", status: "Active", lastLogin: "2024-07-27 10:01" },
    { id: 4, server: "auth-service-03", uptime: "36m", status: "Active", lastLogin: "2024-07-27 09:55" },
    { id: 5, server: "backup-node-01", uptime: "NA", status: "Inactive", lastLogin: "2024-07-24 18:20" },
    { id: 6, server: "cache-redis-01", uptime: "8d 17h", status: "Active", lastLogin: "2024-07-27 08:30" },
    { id: 7, server: "worker-node-07", uptime: "15h 23m", status: "Active", lastLogin: "2024-07-27 09:45" },
    { id: 8, server: "reporting-engine-02", uptime: "NA", status: "Inactive", lastLogin: "2024-07-23 16:10" },
];

export default function Windows() {
    const [search, setSearch] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState(null); // 'Active' or 'Inactive'
    const [uptimeFilter, setUptimeFilter] = useState(false);

    const handleResetFilters = () => {
        setStatusFilter(null);
        setUptimeFilter(false);
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedRow(null);
    };

    const getUptimeInHours = uptime => {
        if (uptime === "NA") return 0;
        const match = uptime.match(/(?:(\d+)d)?\s*(?:(\d+)h)?\s*(?:(\d+)m)?/);
        if (!match) return 0;
        const days = parseInt(match[1] || 0);
        const hours = parseInt(match[2] || 0);
        const minutes = parseInt(match[3] || 0);
        return days * 24 + hours + minutes / 60;
    };

    const filteredData = serverData
        .filter(row =>
            Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
        )
        .filter(row => (statusFilter ? row.status === statusFilter : true))
        .filter(row => (uptimeFilter ? getUptimeInHours(row.uptime) > 24 : true));

    const activeCount = serverData.filter(s => s.status === "Active").length;
    const inactiveCount = serverData.length - activeCount;
    const uptime24Count = serverData.filter(s => getUptimeInHours(s.uptime) > 24).length;

    const pieData = {
        labels: ["Active", "Inactive"],
        datasets: [
            {
                data: [activeCount, inactiveCount],
                backgroundColor: ["#4caf50", "#f44336"],
                hoverBackgroundColor: ["#66bb6a", "#ef5350"],
                borderWidth: 1,
            },
        ],
    };

    const handlePieClick = elements => {
        if (!elements.length) return;
        const index = elements[0].index;
        setStatusFilter(pieData.labels[index]);
        setUptimeFilter(false);
    };

    return (
        <>
            {/* Cards Row */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Card 1: Pie Chart */}
                <Grid item size={4} xs={12} md={4}>
                    <Card sx={{ position: "relative", height: "200px" }}>
                        <IconButton
                            onClick={handleResetFilters}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                            size="small"
                        >
                            <RefreshIcon style={{ color: 'white' }} fontSize="small" />
                        </IconButton>
                        <CardContent sx={{ textAlign: "center", height: "100%", p: 1 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                <Card style={{ backgroundColor: "rgb(51, 0, 51)", color: 'white' }}>Server Status</Card>
                            </Typography>

                            {/* Centered Pie Chart */}
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                                <Pie
                                    data={pieData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "bottom",
                                                labels: {
                                                    font: { size: 10 },
                                                    usePointStyle: true,
                                                },
                                            },
                                        },
                                        onClick: (_e, elements) => handlePieClick(elements),
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Uptime > 24h */}
                <Grid item size={3} xs={12} md={4}>
                    <Card sx={{ position: "relative", height: "200px", cursor: "pointer" }}>
                        <IconButton
                            onClick={handleResetFilters}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                            size="small"
                        >
                            <RefreshIcon style={{ color: 'white' }} fontSize="small" />
                        </IconButton>
                        <CardContent sx={{ textAlign: "center", height: "100%", p: 1 }}

                            onClick={() => {
                                setUptimeFilter(true);
                                setStatusFilter(null);
                            }}
                        >
                            <Typography variant="subtitle1" gutterBottom>

                                <Card style={{ backgroundColor: "rgb(51, 0, 51)", color: 'white' }}> Uptime &gt; 24h</Card>

                            </Typography>
                            <Typography variant="h4">{uptime24Count}</Typography>
                            <Typography variant="body2">servers</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3: Empty */}

            </Grid>

            {/* Search */}
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ mb: 1, fontSize: "0.75rem", "& .MuiInputBase-root": { fontSize: "0.75rem", py: 0.3 } }}
            />

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 1 }}>
                <Table
                    size="small"
                    sx={{
                        fontSize: "0.75rem",
                        "& th": {
                            background: "#f9f9f9",
                            fontSize: "0.75rem",
                            padding: "4px 8px",
                            fontWeight: 600,
                            borderBottom: "1px solid #ddd",
                        },
                        "& td": {
                            fontSize: "0.72rem",
                            padding: "4px 8px",
                            borderBottom: "1px solid #f0f0f0",
                        },
                        "& tr:hover": {
                            background: "#f5faff",
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Server</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Uptime</TableCell>
                            <TableCell align="center">Last Login</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map(row => (
                            <TableRow
                                key={row.id}
                                sx={row.status === "Inactive" ? { background: "#fff5f5", cursor: "pointer" } : { cursor: "pointer" }}
                                onClick={() => handleRowClick(row)}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, color: "#1976d2" }}>{row.server}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">{row.uptime}</TableCell>
                                <TableCell align="center">{row.lastLogin}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        disabled={row.status === "Active"}
                                        title={row.status === "Active" ? "Refresh not available" : "Refresh available"}
                                        sx={{
                                            color: row.status === "Active" ? "#bbb" : "green",
                                            padding: "2px"
                                        }}
                                        onClick={e => e.stopPropagation()} // prevent row click when clicking button
                                    >
                                        <RefreshIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Server Details</DialogTitle>
                <DialogContent dividers>
                    {selectedRow && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography><strong>ID:</strong> {selectedRow.id}</Typography>
                            <Typography><strong>Server:</strong> {selectedRow.server}</Typography>
                            <Typography><strong>Status:</strong> {selectedRow.status}</Typography>
                            <Typography><strong>Uptime:</strong> {selectedRow.uptime}</Typography>
                            <Typography><strong>Last Login:</strong> {selectedRow.lastLogin}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
