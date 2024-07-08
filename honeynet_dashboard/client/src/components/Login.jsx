import React, { useState } from 'react';
import axios from 'axios';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Spin, Input, message as Message } from 'antd';
import "./Login.css";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);

        await axios.post(apiUrl + `/auth/user/set-cookie`, values, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true 
        })
            .then(response => {
                setLoading(false);

                if (response.status === 200) {
                    return axios.post(apiUrl + `/auth/user/get-user-details`, { email: values.email }, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true 
                    })
                        .then(res => {
                            localStorage.setItem("id", res.data);
                            window.location.replace(`/details/${res.data}`);
                        })
                        .catch(error => {
                            console.error('Id not sent!', error);
                            setLoading(false);
                        })
                } else {
                    Message.error("Incorrect password entered", 3)
                };
            })
            .catch(error => {
                console.error('Cookie not set!', error);
                setLoading(false);
            });
    };

    return (
        <Spin spinning={loading}>
            <div className="login-form">
                <Form
                    form={form}
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 100,
                    }}
                    style={{
                        minWidth: 280,
                    }}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not a valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input style={{ borderRadius: '5px' }} prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{ borderRadius: '5px' }} prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ background: '#918f8f', borderRadius: '5px' }}
                            disabled={loading}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};
