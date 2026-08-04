import {
Paper,
Typography,
List,
ListItem,
ListItemText
} from "@mui/material";

export default function NotificationCard(){

return(

<Paper sx={{p:3,borderRadius:4}}>

<Typography
variant="h6"
fontWeight="bold"
mb={2}
>
Notifications
</Typography>

<List>

<ListItem>

<ListItemText
primary="3 Rent Payments Due Today"
/>

</ListItem>

<ListItem>

<ListItemText
primary="2 New Tenants Added"
/>

</ListItem>

<ListItem>

<ListItemText
primary="Monthly Report Ready"
/>

</ListItem>

</List>

</Paper>

)

}