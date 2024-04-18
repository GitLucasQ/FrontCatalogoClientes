import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <>
            <React.Fragment>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#2a9ef7',
                    paddingX: 10
                }}>
                    {/* <Typography sx={{ minWidth: 100, color: 'white' }}>
                        Clientes
                    </Typography> */}
                    <Button
                        sx={{ color: 'white' }}
                        onClick={() => navigate('/')}
                    >
                        
                        Catálogo de Clientes
                    </Button>
                </Box>
            </React.Fragment>
        </>
    )
}

export default Navbar;