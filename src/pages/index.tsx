import React, { useState } from 'react';
import Link from 'umi/link';
import { Tag, Typography, Empty, Input, Divider, BackTop } from 'antd';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import styles from './index.less';
import { useAppState } from '@/store';

export default () => {
  const [state]: any = useAppState();
  const [data, setData] = useState({ searchVal: '', list: state.list });

  const onSearch = (val: string) => {
    let newList = state.list.filter((item: any) => {
      return (
        item.title.toLocaleLowerCase().indexOf(val) !== -1 ||
        String(item.number).indexOf(val) !== -1
      );
    });
    setData({ ...data, list: newList });
  };

  // 使用函数防抖进行过滤
  const debounceSearch = debounce(onSearch, 300);
  const onChange = (e: any) => {
    e.persist();
    let val = e.target.value;
    debounceSearch(val);
  };

  return (
    <div>
      <BackTop />
      <Input.Search
        size="large"
        placeholder="根据文章标题、或者文章ID 回车进行搜索"
        onChange={onChange}
        onSearch={onSearch}
        enterButton="搜索"
      />
      {data.list && data.list.length > 0 ? (
        data.list.map((item: any, i: number) => {
          return (
            <div key={i} className={styles.article}>
              <Link to={`/post/${item.number}`}>
                <Typography.Paragraph ellipsis={true}>{item.title}</Typography.Paragraph>
              </Link>
              <Tag color="blue">{dayjs(item.updated_at).format('YYYY-MM-DD hh:mm')}</Tag>
            </div>
          );
        })
      ) : (
        <Empty />
      )}
    </div>
  );
};
