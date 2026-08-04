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
  getPayments,
  addPayment,
  updatePayment,
  deletePayment,
} from "../api/paymentApi";

import { getTenants } from "../api/tenantApi";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    tenantId: "",
    amount: "",
    paymentDate: "",
    paymentMode: "",
    paymentStatus: "",
    remarks: "",
  });

  useEffect(() => {
    loadPayments();
    loadTenants();
  }, []);

  const loadPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTenants = async () => {
    try {
      const response = await getTenants();
      setTenants(response.data);
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
      tenantId: "",
      amount: "",
      paymentDate: "",
      paymentMode: "",
      paymentStatus: "",
      remarks: "",
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updatePayment(editingId, form);
      } else {
        await addPayment(form);
      }

      setOpen(false);
      setEditingId(null);
      resetForm();
      loadPayments();
    } catch (error) {
      console.error(error);
      alert("Failed to save payment");
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment.id);

    setForm({
      tenantId: payment.tenant?.id || "",
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      paymentMode: payment.paymentMode,
      paymentStatus: payment.paymentStatus,
      remarks: payment.remarks || "",
    });

    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await deletePayment(id);
      loadPayments();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const columns = [
    {
      field: "tenant",
      headerName: "Tenant",
      flex: 1.5,
      valueGetter: (value, row) =>
        row.tenant?.fullName || "",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      flex: 1,
    },
    {
      field: "paymentMode",
      headerName: "Mode",
      flex: 1,
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1.5,
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
          Payment Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditingId(null);
            resetForm();
            setOpen(true);
          }}
        >
          Add Payment
        </Button>
      </Box>

      <Paper elevation={3}>
        <DataGrid
          rows={payments}
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
        maxWidth="sm"
      >
        <DialogTitle>
          {editingId ? "Edit Payment" : "Add Payment"}
        </DialogTitle>

        <DialogContent>
                  <TextField
            margin="dense"
            label="Tenant"
            name="tenantId"
            select
            fullWidth
            value={form.tenantId}
            onChange={handleChange}
          >
            {tenants.map((tenant) => (
              <MenuItem key={tenant.id} value={tenant.id}>
                {tenant.fullName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            value={form.amount}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Payment Date"
            name="paymentDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.paymentDate}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Payment Mode"
            name="paymentMode"
            select
            fullWidth
            value={form.paymentMode}
            onChange={handleChange}
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          </TextField>

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
            <MenuItem value="Failed">Failed</MenuItem>
          </TextField>

          <TextField
            margin="dense"
            label="Remarks"
            name="remarks"
            fullWidth
            multiline
            rows={3}
            value={form.remarks}
            onChange={handleChange}
          />
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