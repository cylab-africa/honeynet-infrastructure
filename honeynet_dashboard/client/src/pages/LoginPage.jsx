import { Layout } from 'antd';
import Login from '../components/Login';
import Logo from '../images/Upanzi_logo_1.jpg';

const { Header, Content, Footer } = Layout;

const LoginPage = () => {
    const heading = (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo} style={{ marginRight: '10px', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
                Login
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

    return (
        <Layout style={{height:'100vh'}}>
            <Header style={headerStyle}>
                {heading}
            </Header>
            <Content>
                <Login />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Smishing Dashboard ©2023
            </Footer>
        </Layout>
    );
};

export default LoginPage;
