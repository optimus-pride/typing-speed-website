import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center'
    }
}));

const AccountIcon = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(null);
    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const classes = useStyles();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/current_user');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleValueChange = (e, v) => {
        setValue(v);
    };

    const handleOpen = () => {
        if (user) {
            navigate('/user');
        } else {
            setOpen(true);
        }
    };

    const logout = async () => {
        try {
            await axios.get('/api/logout');
            setUser(null);
            setAlert({
                open: true,
                type: 'success',
                message: 'Logged out'
            });
        } catch (error) {
            console.error('Error logging out:', error);
            setAlert({
                open: true,
                type: 'error',
                message: 'Not able to logout'
            });
        }
    };

    const signInWithGoogle = () => {
        window.location.href = '/auth/google';
    };

    return (
        <div>
            <AccountCircleIcon onClick={handleOpen} />
            {user && <LogoutIcon onClick={logout} />}

            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className={classes.box}>
                    <AppBar position='static' style={{ backgroundColor: 'transparent' }}>
                        <Tabs
                            value={value}
                            onChange={handleValueChange}
                            variant='fullWidth'
                        >
                            <Tab label='Login' style={{ color: theme.title }} />
                            <Tab label='Signup' style={{ color: theme.title }} />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm handleClose={handleClose} />}
                    {value === 1 && <SignupForm handleClose={handleClose} />}

                    <Box>
                        <span>OR</span>
                        <GoogleButton
                            style={{ width: '100%', marginTop: '8px' }}
                            onClick={signInWithGoogle}
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    );
};

export default AccountIcon;