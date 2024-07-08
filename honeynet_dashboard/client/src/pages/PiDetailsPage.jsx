import React from "react";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { Layout, Badge } from 'antd';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { SecureLink } from "react-secure-link";
import LogoutLink from '../components/Logout';
import Logo from '../images/Upanzi_logo_1.jpg';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
}));

const elevation = 2;
const lightTheme = createTheme({ palette: { mode: 'light' } });
const { Content, Header, Footer } = Layout;

const useStyles = makeStyles((theme) => ({
    underline: {
        textDecoration: 'underline',
    },
}));

export default function PiDetailsPage() {
    const location = useLocation();
    const ip = location.state.ip;
    const piId = location.state.piId;
    const status = location.state.status;
    const rpiMonitorLink = `http://` + ip + `:8888`;
    const raspismsLink = `http://` + ip + `/raspisms`;
    const classes = useStyles();
    let symbol;

    if (status[0] === 'Online') {
        symbol = <Badge status="success" text="Online" />
    } else {
        symbol = <Badge status="error" text="Offline" />
    };

    const heading = (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo} style={{ marginRight: '10px', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <span>{piId} ({ip}) {symbol}</span>
            <div style={{ marginLeft: 'auto' }}>
                <LogoutLink />
            </div>
        </>
    );

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        padding: '0 16px',
        backgroundColor: '#B8B8B8',
        fontSize: 20,
        fontFamily: 'Garamond',
        color: '#fff'
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={headerStyle}>
                {heading}
            </Header>

            <Content>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Box sx={{
                        width: '35rem',
                        color: '#4a4541',
                        padding: 5
                    }}>
                        <Grid container spacing={2}>
                            {[lightTheme].map((theme, index) => (
                                <Grid item xs={12} key={index}>
                                    <ThemeProvider theme={theme}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                // bgcolor: 'background.default',
                                                display: 'grid',
                                                gridTemplateColumns: { md: '1fr 1fr' },
                                                gap: 4,
                                            }}
                                        >
                                            <SecureLink href={rpiMonitorLink}>
                                                <Item
                                                    key={elevation}
                                                    elevation={elevation}
                                                    className={classes.underline}
                                                >
                                                    RPi Monitor
                                                </Item>
                                            </SecureLink>

                                            <SecureLink href={raspismsLink}>
                                                <Item
                                                    key={elevation}
                                                    elevation={elevation}
                                                    className={classes.underline}
                                                >
                                                    Raspisms
                                                </Item>
                                            </SecureLink>
                                        </Box>
                                    </ThemeProvider>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Smishing Dashboard ©2023
            </Footer>
        </Layout>
    );
};