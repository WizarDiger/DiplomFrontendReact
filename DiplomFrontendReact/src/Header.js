import { AppBar, Toolbar, Typography, IconButton} from "@mui/material"
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
function Header() {
    return (
        <AppBar>
            <Toolbar>
               <Typography variant="h5">
                   
                Social Network "Yarik"

                 </Typography> 
                 <IconButton>
                    
                     <LocalPizzaIcon />
                 </IconButton>
            </Toolbar>
        </AppBar>)
}
export default Header