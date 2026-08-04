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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../api/propertyApi";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    propertyName: "",
    propertyType: "",
    address: "",
    monthlyRent: "",
    totalUnits: "",
    occupiedUnits: "",
  });

  useEffect(() => {
    loadProperties();
  }, []);

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

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateProperty(editingId, form);
      } else {
        await addProperty(form);
      }

      setOpen(false);
      setEditingId(null);

      setForm({
        propertyName: "",
        propertyType: "",
        address: "",
        monthlyRent: "",
        totalUnits: "",
        occupiedUnits: "",
      });

      loadProperties();
    } catch (error) {
      console.error(error);
      alert("Failed to save property");
    }
  };

  const handleEdit = (property) => {
    setEditingId(property.id);

    setForm({
      propertyName: property.propertyName,
      propertyType: property.propertyType,
      address: property.address,
      monthlyRent: property.monthlyRent,
      totalUnits: property.totalUnits,
      occupiedUnits: property.occupiedUnits,
    });

    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await deleteProperty(id);
      loadProperties();
    } catch (error) {
      console.error(error);
      alert("Failed to delete property");
    }
  };

  const columns = [
    {
      field: "propertyName",
      headerName: "Property Name",
      flex: 1,
    },
    {
      field: "propertyType",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
    },
    {
      field: "monthlyRent",
      headerName: "Rent",
      flex: 1,
    },
    {
      field: "occupiedUnits",
      headerName: "Occupied",
      flex: 1,
    },
    {
      field: "totalUnits",
      headerName: "Total Units",
      flex: 1,
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
          Property Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditingId(null);

            setForm({
              propertyName: "",
              propertyType: "",
              address: "",
              monthlyRent: "",
              totalUnits: "",
              occupiedUnits: "",
            });

            setOpen(true);
          }}
        >
          Add Property
        </Button>
      </Box>

      <Paper elevation={3}>
        <DataGrid
          rows={properties}
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
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingId ? "Edit Property" : "Add Property"}
        </DialogTitle>

        <DialogContent>
                  <TextField
            margin="dense"
            label="Property Name"
            name="propertyName"
            fullWidth
            value={form.propertyName}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Property Type"
            name="propertyType"
            fullWidth
            value={form.propertyType}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            value={form.address}
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
            label="Total Units"
            name="totalUnits"
            type="number"
            fullWidth
            value={form.totalUnits}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Occupied Units"
            name="occupiedUnits"
            type="number"
            fullWidth
            value={form.occupiedUnits}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setEditingId(null);

              setForm({
                propertyName: "",
                propertyType: "",
                address: "",
                monthlyRent: "",
                totalUnits: "",
                occupiedUnits: "",
              });
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