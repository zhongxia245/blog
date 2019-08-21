import React from 'react';
import { withRouter } from 'umi';
import { Divider, Tag, BackTop, Icon } from 'antd';
import marked from 'marked';
import dayjs from 'dayjs';
import find from 'lodash/find';
import { useAppState } from '@/store';
import styles from './post.less';

export default withRouter(({ match }) => {
  const { params } = match;
  const [state]: any = useAppState();
  let data = find(state.list, { number: Number(params.id) });

  let editUrl: any = data.url.replace('api.github', 'github').replace('repos/', '');

  return (
    <div className={styles.post}>
      <BackTop />
      <h1>{data.title}</h1>
      <div>
        <Tag color="blue">作者：{data.user.login}</Tag>
        <Tag color="green">最后更新时间：{dayjs(data.updated_at).format('YYYY-MM-DD hh:mm')}</Tag>
        <Tag color="#108ee9" style={{ cursor: 'pointer' }}>
          <a href={editUrl} target="_blank">
            编辑
            <Icon style={{ marginLeft: 5 }} type="edit" />
          </a>
        </Tag>
      </div>
      <Divider />
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(data.body) }} />
    </div>
  );
});
