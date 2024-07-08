import { Layout } from 'antd';
import Signup from '../components/Onboard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const SignupPage = () => {
    return (
        <Layout style={{height:'100vh'}}>
            <Header title = { "Onboarding" }/>
            <Content>
                <Signup />
            </Content>
            <Footer />
        </Layout>
    );
};

export default SignupPage;
