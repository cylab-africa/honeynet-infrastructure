import React from 'react';
import axios from 'axios';
import { Tabs, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';
import { ArgumentAxis, ValueAxis, Chart, BarSeries, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, Animation } from '@devexpress/dx-react-chart';
import LogoutLink from '../components/Logout';
import formatDate from '../utils/FormatDate';
import Logo from '../images/Upanzi_logo_1.jpg';
import './HomePage.css';

const { Content, Header, Footer } = Layout;
const pageSize = 7;
const apiUrl = process.env.REACT_APP_API_URL;

const columns = [
    {
        title: 'Rasperry Pi',
        dataIndex: 'pi_id',
        key: 'pi_id',
        width: '15%',
        align: 'center',
        render: (pi_id, record) => (
            <Link to={`/pi-details/${pi_id}`} state={{ ip: record.pi_ip, piId: pi_id, status: record.status }}>
                {pi_id}
            </Link>
        )
    },
    {
        title: 'IP Address',
        dataIndex: 'pi_ip',
        key: 'pi_ip',
        width: '15%',
        align: 'center'
    },
    {
        title: 'GSM Status',
        key: 'status',
        dataIndex: 'status',
        width: '15%',
        align: 'center',
        render: (_, { status }) => (
            <>
                {
                    status.map((tag) => {
                        let color = tag === 'Online' ? 'green' : 'volcano';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })
                }
            </>
        ),
    },
    {
        title: 'Online Modems',
        dataIndex: 'modems',
        key: 'modems',
        width: '10%',
        align: 'center'
    },
    {
        title: 'Last Online',
        dataIndex: 'last_online',
        key: 'last_online',
        width: '20%',
        // align: 'center'
    }
];

const msgColumns = [
    {
        title: 'Raspberry Pi',
        dataIndex: 'pi_id',
        key: 'pi_id',
        width: '30%',
        align: 'center'
    },
    {
        title: 'Last Message Received',
        dataIndex: 'last_msg_date',
        key: 'last_msg_date',
        width: '70%',
    }
];

const heading = (
    <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} style={{ marginRight: '10px', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <span>Dashboard</span>
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
    fontSize: 23,
    fontFamily: 'Garamond',
    color: '#fff'
};

const { TabPane } = Tabs;

export default class Home extends React.Component {
    state = { msgData: [], onlineData: [], lastMsgData: [] };

    componentDidMount() {
        const userId = localStorage.getItem("id");

        axios.get(apiUrl + `/activity/details/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true 
        })
            .then(res => {
                const msgData = []; const onlineData = []; const lastMsgData = [];

                /* Message Statistics */
                res.data.payload[0].msgCountData.forEach(element => {
                    if (element.pi_id) {
                        msgData.push({
                            argument: element.pi_id,
                            value: element.message_count
                        });

                        lastMsgData.push({
                            key: '1',
                            pi_id: element.pi_id,
                            last_msg_date: formatDate(element.last_msg_date)
                        });
                    };
                });

                /* Online Data */
                const tempOnlineData = res.data.payload[0].onlineStatusData;

                tempOnlineData.sort((a, b) => {
                    if (a.pi_id < b.pi_id) {
                        return -1;
                    }
                    if (a.pi_id > b.pi_id) {
                        return 1;
                    }
                    return 0;
                });

                tempOnlineData.forEach(function (element, index) {
                    const formattedDate = formatDate(element.time);

                    if (element.status === "OFF") {
                        onlineData.push({
                            key: index,
                            pi_id: element.pi_id,
                            pi_ip: element.pi_ip,
                            status: ['Offline'],
                            modems: element.available_modems + " out of " + element.num_of_modems,
                            last_online: formattedDate
                        });
                    } else {
                        onlineData.push({
                            key: index,
                            pi_id: element.pi_id,
                            pi_ip: element.pi_ip,
                            modems: element.available_modems + " out of " + element.num_of_modems,
                            status: ['Online'],
                            last_online: formattedDate
                        });
                    };
                });

                this.setState({ msgData });
                this.setState({ onlineData });
                this.setState({ lastMsgData })
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <Layout style={{ height: '100vh', maxWidth: '100%' }}>
                <Header style={headerStyle}>
                    {heading}
                </Header>

                <Content style={{ maxWidth: '100%' }}>
                    <Tabs tabPosition="left">
                        <TabPane tab="Raspberry PIs" key="1" style={{ maxWidth: '100%', paddingRight: '2%', paddingTop: '2%' }}>
                            <Table
                                columns={columns}
                                dataSource={this.state.onlineData}
                                pagination={{ pageSize }}
                            />
                        </TabPane>

                        <TabPane tab="Statistics" key="2" style={{ maxWidth: '100%', paddingTop: '2%' }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', maxWidth: '100%' }}>
                                <Box sx={{
                                    width: '60%',
                                    marginRight: 3
                                }}>
                                    <Paper elevation={0} style={{ paddingRight: '40px' }}>
                                        <Chart data={this.state.msgData} rotated>
                                            <ArgumentAxis />
                                            <ValueAxis />
                                            <BarSeries valueField="value" argumentField="argument" />
                                            <EventTracker />
                                            <HoverState />
                                            <Tooltip />
                                            <Animation />
                                        </Chart>
                                    </Paper>
                                </Box>

                                <Box sx={{
                                    width: '35%'
                                }}>
                                    <Table
                                        columns={msgColumns}
                                        dataSource={this.state.lastMsgData}
                                        pagination={{ pageSize }}
                                    />
                                </Box>
                            </Box>
                        </TabPane>
                    </Tabs>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Smishing Dashboard ©2023
                </Footer>
            </Layout>
        );
    };
};
