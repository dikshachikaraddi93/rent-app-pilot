<Grid container spacing={3} sx={{ mb: 4 }}>
  {cards.map((card, index) => (
    <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
      <Paper
        elevation={0}
        sx={{
          background: card.gradient,
          color: "#fff",
          borderRadius: 5,
          p: 3,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: card.shadow,
          transition: "all .35s ease",
          "&:hover": {
            transform: "translateY(-10px) scale(1.02)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -30,
            top: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.15)",
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              sx={{
                opacity: 0.9,
                fontWeight: 500,
              }}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
              mt={1}
            >
              {card.value}
            </Typography>

            <Chip
              label="+12% this month"
              sx={{
                mt: 2,
                bgcolor: "rgba(255,255,255,.18)",
                color: "#fff",
                fontWeight: 600,
              }}
            />
          </Box>

          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,.20)",
              width: 72,
              height: 72,
            }}
          >
            {card.icon}
          </Avatar>
        </Box>
      </Paper>
    </Grid>
  ))}
</Grid>