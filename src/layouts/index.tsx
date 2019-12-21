import React, { useEffect, useState } from 'react';
import Link from 'umi/link';
import { Spin, Skeleton, Layout, Menu } from 'antd';
import { AppContextProvider } from '../store';
import reducer from '../store/reducer';
import { getAllIssue } from '../api';

const { Header, Content, Footer } = Layout;

const BasicLayout: React.FC = ({ children }: any) => {
  const [state, setState] = useState({ loading: false, blogList: [], faqList: [] });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, loading: true });
      let [blogList, faqList]: any = await Promise.all([
        getAllIssue('blog'),
        getAllIssue('work-faq'),
      ]);
      localStorage.setItem('global_data_blog', JSON.stringify(blogList));
      localStorage.setItem('global_data_faq', JSON.stringify(faqList));
      setState({ ...state, faqList, blogList, loading: false });
    };
    getData();
  }, []);

  const renderContent = () => {
    return state.loading ? (
      <Spin size="large" tip="正在加载中...">
        <Skeleton active={true} />
        <Skeleton active={true} />
        <Skeleton active={true} />
        <Skeleton active={true} />
      </Spin>
    ) : (
      <AppContextProvider initValue={state} reducer={reducer}>
        {children}
      </AppContextProvider>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#FFF' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', textAlign: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="/">文章列表</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/faq">常见兼容问题</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px', marginTop: 64 }}>{renderContent()}</Content>
      <Footer style={{ textAlign: 'center', padding: '15px 50px' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
