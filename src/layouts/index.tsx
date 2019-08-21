import React, { useEffect, useState } from 'react';
import { Spin, Skeleton } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AppContextProvider } from '../store';
import reducer from '../store/reducer';
import { getAllIssue } from '../api';

const BasicLayout: React.FC = ({ location, children }: any) => {
  const [state, setState] = useState({ loading: false, list: [] });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, loading: true });
      let list: any = await getAllIssue();
      window.globalData = list;
      setState({ ...state, list, loading: false });
    };
    getData();
  }, []);

  return state.loading ? (
    <Spin size="large" tip="正在加载中...">
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Spin>
  ) : (
    <AppContextProvider initValue={state} reducer={reducer}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          {children}
        </CSSTransition>
      </TransitionGroup>
    </AppContextProvider>
  );
};

export default BasicLayout;
