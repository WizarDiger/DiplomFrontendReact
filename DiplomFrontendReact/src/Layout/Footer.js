import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Box, color } from "@mui/system";
import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
export default function Footer() {
    return <footer>
        <Typography variant="subtitle1" gutterBottom component="div">

            <Box  px={{xs: 3, sm:10}} py={{xs: 5,sm:2}} bgcolor={'GrayText'} color={'white'}>
                <Container maxWidth="lg">
                    <Grid container spacint={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none' , color: 'inherit'}}>
                                    Contacts
                                </Link>
                            </Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit'}}>
                                    Support
                                </Link>
                            </Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit'}}>
                                    Privacy
                                </Link>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Account</Box>

                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Login
                                </Link>
                            </Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Register
                                </Link>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Utilities</Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    My messages
                                </Link>
                            </Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    My page
                                </Link>
                            </Box>
                            <Box>
                                <Link to={'/MainPage'} style={{ textDecoration: 'none' , color: 'inherit'}}>
                                    Exit
                                </Link>
                            </Box>

                        </Grid>
                    </Grid>
                    <Box textAlign={'center'} pt={{xs:5, sm:5}} pb={{xs:5, sm:0}}>
                        DSTU Diplom Project &reg; {new Date().getFullYear()}
                    </Box>
                </Container>
            </Box>
        </Typography>
    </footer>
}