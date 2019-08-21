/**
 * Github API 可以参考文档
 * 接口文档：https://developer.github.com/v3/
 * 接口教程：https://developer.github.com/v3/guides/getting-started/
 *
 * 也可以看这篇文章：https://segmentfault.com/a/1190000015144126#articleHeader3
 */

import axios from 'axios';
import CONFIG, { baseApiPath } from '../config';

axios.interceptors.response.use(resp => {
  return resp.data;
});

export const getUserInfo = async () => {
  let useInfo = await axios.get(`https://api.github.com/users/${CONFIG.owner}`);
  return useInfo;
};

// 默认获取 Open 的 Issue
const _getOpenIssue = async () => {
  let data = await axios.get(
    `${baseApiPath}?creator=${CONFIG.owner}&per_page=1000&access_token=${CONFIG.token.join('')}`,
  );
  return data;
};

// 获取已经关闭的 Issue
const _getClosedIssue = async () => {
  let data = await axios.get(
    `${baseApiPath}?creator=${
      CONFIG.owner
    }&state=closed&per_page=1000&access_token=${CONFIG.token.join('')}`,
  );
  return data;
};

export const getAllIssue = async () => {
  let [openIssues, closedIssues]: any = await Promise.all([_getOpenIssue(), _getClosedIssue()]);
  let allIssues = [...openIssues, ...closedIssues];
  localStorage.setItem('blog_all_issues', JSON.stringify(allIssues));
  return allIssues;
};

export const getTags = async () => {
  let tags = await axios.get(`https://api.github.com/repos/${CONFIG.owner}/blog/labels`);
  return tags;
};

export const getComments = async (id: string | number) => {
  let data = await axios.get(
    `https://api.github.com/repos/${
      CONFIG.owner
    }/blog/issues/${id}/comments?access_token=${CONFIG.token.join('')}`,
  );
  return data;
};
