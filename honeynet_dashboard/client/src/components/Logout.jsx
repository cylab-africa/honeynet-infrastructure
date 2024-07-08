import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, message as Message } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL;

const Logout = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");

    const handleOnClick = () => {
        axios.get(apiUrl + `/logout/${userId}`, { withCredentials: true })
            .then(response => {
                const { status, message } = response.data;

                if (status === 200) {
                    localStorage.removeItem("id");
                    Message.success(message, 3);
                    navigate('/', { replace: true });
                }
            })
    };

    return (
        <Button
            onClick={handleOnClick}
            style={{ borderRadius: '1px' }}
        >
            Logout
        </Button>
    );
};

export default Logout;
