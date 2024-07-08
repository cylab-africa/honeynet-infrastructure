import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input, Spin, Form, message as DropdownMessage } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './Onboard.css';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);

        await axios.post('http://localhost:5000/user/signup', { email: values.email, password: values.password })
            .then((response) => {
                setLoading(false);
                const { status, message } = response.data;

                try {
                    if (status == 200) {
                        // navigate('/signup-success', { replace: true });
                    } else {
                        DropdownMessage.error(message, 3)
                    };
                } catch (err) {
                    console.log(err);
                };
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        form.resetFields();
    };

    return (
        <Spin spinning={loading}>
            <div className='register-form'>
                <Form
                    form={form}
                    onFinish={onFinish}
                    name="register"
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
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button" >
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a className='link' href="/">Login</a>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};
