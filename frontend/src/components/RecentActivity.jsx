import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

const activity = [

{
name:"Rahul",
action:"Paid ₹12000",
time:"10 mins ago"
},

{
name:"Receipt",
action:"Receipt Sent",
time:"20 mins ago"
},

{
name:"Reminder",
action:"Reminder Sent",
time:"1 hour ago"
}

];

export default function RecentActivity(){

return(

<Paper sx={{p:3,borderRadius:4}}>

<Typography
variant="h6"
mb={2}
fontWeight="bold"
>
Recent Activity
</Typography>

<List>

{activity.map((item,index)=>(

<ListItem key={index}>

<ListItemAvatar>

<Avatar>
{item.name[0]}
</Avatar>

</ListItemAvatar>

<ListItemText
primary={item.action}
secondary={item.time}
/>

</ListItem>

))}

</List>

</Paper>

)

}