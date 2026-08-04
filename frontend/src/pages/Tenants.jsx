import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getTenants,
  addTenant,
  updateTenant,
  deleteTenant,
} from "../api/tenantApi";

import { getProperties } from "../api/propertyApi";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    aadhaarNumber: "",
    monthlyRent: "",
    securityDeposit: "",
    leaseStartDate: "",
    leaseEndDate: "",
    dueDate: "",
    paymentStatus: "",
    propertyId: "",
  });

  useEffect(() => {
    loadTenants();
    loadProperties();
  }, []);

  const loadTenants = async () => {
    try {
      const response = await getTenants();
      setTenants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProperties = async () => {
    try {
      const response = await getProperties();
      setProperties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      phoneNumber: "",
      email: "",
      aadhaarNumber: "",
      monthlyRent: "",
      securityDeposit: "",
      leaseStartDate: "",
      leaseEndDate: "",
      dueDate: "",
      paymentStatus: "",
      propertyId: "",
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateTenant(editingId, form);
      } else {
        await addTenant(form);
      }

      setOpen(false);
      setEditingId(null);
      resetForm();
      loadTenants();
    } catch (error) {
      console.error(error);
      alert("Failed to save tenant");
    }
  };

  const handleEdit = (tenant) => {
    setEditingId(tenant.id);

    setForm({
      fullName: tenant.fullName,
      phoneNumber: tenant.phoneNumber,
      email: tenant.email,
      aadhaarNumber: tenant.aadhaarNumber,
      monthlyRent: tenant.monthlyRent,
      securityDeposit: tenant.securityDeposit,
      leaseStartDate: tenant.leaseStartDate,
      leaseEndDate: tenant.leaseEndDate,
      dueDate: tenant.dueDate,
      paymentStatus: tenant.paymentStatus,
      propertyId: tenant.property?.id || "",
    });

    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tenant?")) return;

    try {
      await deleteTenant(id);
      loadTenants();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Tenant Name",
      flex: 1.4,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.4,
    },
    {
      field: "monthlyRent",
      headerName: "Rent",
      flex: 1,
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "propertyName",
      headerName: "Property",
      flex: 1.4,
      valueGetter: (value, row) =>
        row.property?.propertyName || "",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
    return (
    <Box sx={{ p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Tenant Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditingId(null);
            resetForm();
            setOpen(true);
          }}
        >
          Add Tenant
        </Button>
      </Box>

      <Paper elevation={3}>
        <DataGrid
          rows={tenants}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Paper>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingId(null);
          resetForm();
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingId ? "Edit Tenant" : "Add Tenant"}
        </DialogTitle>

        <DialogContent>

          <TextField
            margin="dense"
            label="Full Name"
            name="fullName"
            fullWidth
            value={form.fullName}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={form.phoneNumber}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Aadhaar Number"
            name="aadhaarNumber"
            fullWidth
            value={form.aadhaarNumber}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Monthly Rent"
            name="monthlyRent"
            type="number"
            fullWidth
            value={form.monthlyRent}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Security Deposit"
            name="securityDeposit"
            type="number"
            fullWidth
            value={form.securityDeposit}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Lease Start Date"
            name="leaseStartDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.leaseStartDate}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Lease End Date"
            name="leaseEndDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.leaseEndDate}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.dueDate}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Payment Status"
            name="paymentStatus"
            select
            fullWidth
            value={form.paymentStatus}
            onChange={handleChange}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>

          <TextField
            margin="dense"
            label="Property"
            name="propertyId"
            select
            fullWidth
            value={form.propertyId}
            onChange={handleChange}
          >
            {properties.map((property) => (
              <MenuItem key={property.id} value={property.id}>
                {property.propertyName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setEditingId(null);
              resetForm();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {editingId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}