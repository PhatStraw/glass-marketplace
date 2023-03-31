import { SignIn } from "@clerk/nextjs";
import { Box } from "@mui/material";


export default function Signin(){
    return(
        <Box sx={{pt: 7}}>          
            <SignIn path="/sign-in" routing="path" />
        </Box>
    )
}