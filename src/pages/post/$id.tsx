import React, { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import { Tag, BackTop, Icon, Card, Avatar, Tooltip } from 'antd';
import marked from 'marked';
import dayjs from 'dayjs';
import find from 'lodash/find';
import { useAppState } from '@/store';
import { getComments } from '@/api';
import styles from './post.less';

let prevLocation: any = null;

export default withRouter(({ match, location }) => {
  const { params } = match;
  const [state]: any = useAppState();
  const [comments, setComments]: any = useState([]);

  useEffect(() => {
    // 切换文章滚动到顶部
    if (location !== prevLocation) {
      window.scrollTo(0, 0);
      prevLocation = location;
    }

    const getData = async () => {
      let data = await getComments(params.id);
      setComments(data);
    };

    getData();
  }, [params.id]);

  let data = find(state.list, { number: Number(params.id) });

  let editUrl: any = data.url.replace('api.github', 'github').replace('repos/', '');

  const jsx = {
    renderArticle: (info: any, key?: string | number) => {
      return (
        <Card
          size="small"
          type="inner"
          className={styles.card}
          key={key}
          title={jsx.renderCardTitle(info.user)}
          extra={jsx.renderCardExtra(info)}
        >
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(info.body) }} />
        </Card>
      );
    },
    renderCardTitle: (user: any) => {
      return (
        <>
          <Avatar src={user.avatar_url} style={{ marginRight: 5 }} />
          <span>{user.login}</span>
        </>
      );
    },
    renderCardExtra: (info: any) => {
      return (
        <>
          <span>{dayjs(info.updated_at).format('YYYY-MM-DD hh:mm:ss')}</span>
          <Tooltip title="点击编辑">
            <a href={editUrl} target="_blank">
              <Icon style={{ marginLeft: 10 }} type="edit" />
            </a>
          </Tooltip>
        </>
      );
    },
  };

  return (
    <div className={styles.post}>
      <BackTop />
      <h1>{data.title}</h1>

      {jsx.renderArticle(data)}

      {comments.map((item: any, i: number) => jsx.renderArticle(item, i))}
    </div>
  );
});
