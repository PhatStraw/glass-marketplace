import { UserProfile } from "@clerk/nextjs";
import { Box } from "@mui/material";


export default function Userprofile(){
    return(
        <Box sx={{pt: 7}}>          
            <UserProfile />
        </Box>
    )
}