import React, { useState } from 'react';
import Link from 'umi/link';
import { Tag, Typography, Empty, Input, Card, BackTop } from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import styles from './index.less';
import { useAppState } from '@/store';

export default () => {
  const [state]: any = useAppState();
  const [data, setData] = useState({ searchVal: '', list: state.faqList });

  const onSearch = (val: string) => {
    let newList = state.faqList.filter((item: any) => {
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

  const renderContent = () => {
    return data.list && data.list.length > 0 ? (
      data.list.map((item: any, i: number) => {
        return (
          <div key={i} className={styles.article}>
            <Link to={`/work-faq/${item.number}`}>
              <Typography.Paragraph ellipsis={true}>{item.title}</Typography.Paragraph>
            </Link>
            <Tag color="blue">{dayjs(item.updated_at).format('YYYY-MM-DD hh:mm')}</Tag>
          </div>
        );
      })
    ) : (
      <Empty />
    );
  };

  return (
    <Card
      title="文章列表"
      style={{ width: 800, margin: '0 auto' }}
      extra={`共 ${data.list.length} 篇文章`}
    >
      <BackTop />
      <Input.Search
        size="large"
        placeholder="根据文章标题、或者文章ID 回车进行搜索"
        onChange={onChange}
        onSearch={onSearch}
        enterButton="搜索"
      />
      {renderContent()}
    </Card>
  );
};
