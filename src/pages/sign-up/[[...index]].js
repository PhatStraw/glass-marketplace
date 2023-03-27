import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/material";


export default function Signup(){
    return(
        <Box sx={{pt: 7}}>          
            <SignUp path="/sign-up" routing="path" signInUrl="/SignIn" />
        </Box>
    )
}