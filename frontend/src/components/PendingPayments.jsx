import {
Paper,
Typography,
Table,
TableBody,
TableCell,
TableHead,
TableRow
} from "@mui/material";

const data=[

{
tenant:"Rahul",
amount:"₹12000",
status:"Overdue"
},

{
tenant:"Akash",
amount:"₹8000",
status:"Today"
},

{
tenant:"Ravi",
amount:"₹15000",
status:"Tomorrow"
}

];

export default function PendingPayments(){

return(

<Paper sx={{p:3,borderRadius:4}}>

<Typography
variant="h6"
fontWeight="bold"
mb={2}
>
Pending Payments
</Typography>

<Table>

<TableHead>

<TableRow>

<TableCell>Tenant</TableCell>

<TableCell>Amount</TableCell>

<TableCell>Status</TableCell>

</TableRow>

</TableHead>

<TableBody>

{data.map((row,index)=>(

<TableRow key={index}>

<TableCell>{row.tenant}</TableCell>

<TableCell>{row.amount}</TableCell>

<TableCell>{row.status}</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</Paper>

)

}