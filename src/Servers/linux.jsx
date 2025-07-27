import {
    Tabs,
    Tab,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const serverData = [
    {
        id: 1,
        server: "linux-web-01",
        uptime: "5d 4h",
        status: "Active",
        lastLogin: "2024-07-27 09:12",
    },
    {
        id: 2,
        server: "linux-db-01",
        uptime: "NA",
        status: "Inactive",
        lastLogin: "2024-07-25 22:41",
    },
    {
        id: 3,
        server: "linux-api-02",
        uptime: "2h 12m",
        status: "Active",
        lastLogin: "2024-07-27 10:01",
    },
    {
        id: 4,
        server: "linux-auth-03",
        uptime: "36m",
        status: "Active",
        lastLogin: "2024-07-27 09:55",
    },
    {
        id: 5,
        server: "linux-backup-01",
        uptime: "NA",
        status: "Inactive",
        lastLogin: "2024-07-24 18:20",
    },
    {
        id: 6,
        server: "linux-cache-01",
        uptime: "8d 17h",
        status: "Active",
        lastLogin: "2024-07-27 08:30",
    },
    {
        id: 7,
        server: "linux-worker-07",
        uptime: "15h 23m",
        status: "Active",
        lastLogin: "2024-07-27 09:45",
    },
    {
        id: 8,
        server: "linux-report-02",
        uptime: "NA",
        status: "Inactive",
        lastLogin: "2024-07-23 16:10",
    },
    {
        id: 9,
        server: "linux-monitor-01",
        uptime: "3d 11h",
        status: "Active",
        lastLogin: "2024-07-26 12:45",
    },
    {
        id: 10,
        server: "linux-mail-01",
        uptime: "1d 2h",
        status: "Active",
        lastLogin: "2024-07-27 07:58",
    },
];

export default function Linux() {
    return (
        <>   <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table size="small" sx={{
                minWidth: 400,
                fontSize: "0.85rem",
                "& th": {
                    background: "#f5f5fa",
                    color: "#333",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: 0.5,
                    borderBottom: "2px solid #e0e0e0"
                },
                "& td": {
                    fontSize: "0.85rem",
                    borderBottom: "1px solid #f0f0f0"
                },
                "& tr:hover": {
                    background: "#f0f7ff"
                }
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Server</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Uptime</TableCell>
                        <TableCell>Last Login</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serverData.map(row => (
                        <TableRow key={row.id} sx={row.status === "Inactive" ? { background: "#ffe4ea" } : {}}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell sx={{ fontWeight: 500, color: "#1976d2" }}>{row.server}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.uptime}</TableCell>
                            <TableCell>{row.lastLogin}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></>
    )
}