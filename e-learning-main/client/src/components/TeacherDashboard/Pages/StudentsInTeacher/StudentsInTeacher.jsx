import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Card from "@mui/material/Card";
import axios from "axios";

function StudentsInTeacher() {
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/all");
        // Filter users to get only students
        const students = response.data.filter(
          (user) => user.role === "STUDENT"
        );
        setStudents(students);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
      {" "}
      {/* Add maxHeight and overflowY */}
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  hover
                  key={student.email}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Avatar
                      alt={`${student.firstName} ${student.lastName}`}
                      src={student.avatar}
                    />
                  </TableCell>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.isActivee ? "Actif" : "Inactif"}
                      color={student.isActivee ? "success" : "error"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default StudentsInTeacher;
