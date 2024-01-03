import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  div,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { toast } from "react-toastify";

const UserTable = () => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("loginuser"));
  const [anchorEl, setAnchorEl] = React.useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const openFilter = Boolean(anchorEl);
  const id = openFilter ? "simple-popover" : undefined;

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [person, setPerson] = useState({
    _id: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPerson({ ...person, [name]: value });
  };
  console.log(person);
  const getData = () => {
    axios
      .get("http://localhost:8080/get-all/asc")
      .then((res) => setUserData(res.data))
      .catch((e) => console.log(e));
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (!loginUser) {
      navigate("/login");
    }
  }, [token]);

  const handleDelete = (idx) => {
    axios
      .delete(`http://localhost:8080/message/${idx}`)
      .then((res) => {
        getData();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(userData);

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (id) => {
    setOpen(true);
    setPerson(userData?.find((item) => item?._id === id));
  };
  const handleSort = (e) => {
    if (e.target.innerText === "SORT BY ASCENDING") {
      axios
        .get("http://localhost:8080/get-all/asc")
        .then((res) => {
          setUserData(res.data);
          handleCloseFilter();
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get("http://localhost:8080/get-all/desc")
        .then((res) => {
          setUserData(res.data);
          handleCloseFilter();
        })
        .catch((e) => console.log(e));
    }
  };
  const handleOk = () => {
    axios
      .put(`http://localhost:8080/message/${person?._id}`, person)
      .then((res) => {
        getData();
        toast("User updated successfully");
        setOpen(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Sort Data
        </Button>
        <Popover
          id={id}
          open={openFilter}
          anchorEl={anchorEl}
          onClose={handleCloseFilter}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="flex flex-col">
            <Button
              onClick={(e) => {
                handleSort(e);
              }}
            >
              Sort by Ascending
            </Button>
            <Button
              onClick={(e) => {
                handleSort(e);
              }}
            >
              Sort by Descending
            </Button>
          </div>
        </Popover>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="!font-bold">username</TableCell>
            <TableCell className="!font-bold">Role</TableCell>
            <TableCell className="!font-bold">Department</TableCell>
            <TableCell className="!font-bold">Email</TableCell>
            <TableCell className="!font-bold">Delete</TableCell>
            <TableCell className="!font-bold">edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData?.map((item, index) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>

              <TableCell>{item.role}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleEdit(item?._id);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Employee</DialogTitle>

        <div className="p-[20px] flex flex-col gap-[20px]">
          <TextField
            onChange={(e) => handleChange(e)}
            value={person.name}
            name="name"
            required
            label="Employee name"
          />
          <div>
            <TextField
              fullWidth
              onChange={(e) => handleChange(e)}
              value={person.password}
              name="password"
              required
              label="password"
            />
          </div>{" "}
          <div>
            <TextField
              fullWidth
              onChange={(e) => handleChange(e)}
              value={person.email}
              name="email"
              required
              label="email"
            />
          </div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              disabled={loginUser?.role !== "manager"}
              value={person?.department}
              name="department"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="frontend development">
                Frontend Development
              </MenuItem>
              <MenuItem value="backend development">
                Backend Development
              </MenuItem>
              <MenuItem value="full-stack development">
                Full-stack Development
              </MenuItem>
              <MenuItem value="UI-UX designing">UI-UX designing</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
            <Select
              value={person?.role}
              name="role"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
        </div>

        <DialogActions>
          <Button
            className="button-85 !bg-[#2a4f96] !text-white !font-bold !w-full !rounded-20px]"
            onClick={handleOk}
          >
            Save
          </Button>
          <Button
            className="button-85 !bg-red-700 !text-white !font-bold !w-full !rounded-20px]"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
