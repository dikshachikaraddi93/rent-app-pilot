import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function SummaryCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        background: color,
        color: "#fff",
        boxShadow: 4,
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              fontSize={16}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={1}
            >
              {value}
            </Typography>

          </Box>

          <Typography
            sx={{
              fontSize: 45,
            }}
          >
            {icon}
          </Typography>

        </Box>

      </CardContent>
    </Card>
  );
}