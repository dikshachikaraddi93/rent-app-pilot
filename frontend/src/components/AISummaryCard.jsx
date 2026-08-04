import { Card, CardContent, Typography } from "@mui/material";

export default function AISummaryCard() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        backgroundColor: "#f8f9fa",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          🤖 AI Assistant Today's Summary
        </Typography>

        <Typography>• 3 Tenants haven't paid</Typography>

        <Typography sx={{ mt: 1 }}>
          • Estimated Collection Today: ₹1.2 Lakh
        </Typography>

        <Typography sx={{ mt: 1 }}>
          • Best Time to Send Reminder: 6:30 PM
        </Typography>
      </CardContent>
    </Card>
  );
}