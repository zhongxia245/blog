/**
 * Github API 可以参考文档
 * 接口文档：https://developer.github.com/v3/
 * 接口教程：https://developer.github.com/v3/guides/getting-started/
 *
 * 也可以看这篇文章：https://segmentfault.com/a/1190000015144126#articleHeader3
 */

import Axios from 'axios';
import CONFIG, { baseApiPath } from '../config';

let axios = Axios.create();
axios.interceptors.response.use(resp => {
  return resp.data;
});

/**
 * 获取用户信息
 */
export const getUserInfo = async () => {
  let useInfo = await axios.get(`https://api.github.com/users/${CONFIG.owner}`);
  return useInfo;
};

/**
 * 默认获取 Open 的 Issue
 */
const _getOpenIssue = async (repo: string) => {
  let data = await axios.get(
    `${baseApiPath}/${repo}/issues?creator=${
      CONFIG.owner
    }&per_page=200&access_token=${CONFIG.token.join('')}`,
  );
  return data;
};

/**
 * 获取已经关闭的 Issue
 */
const _getClosedIssue = async (repo: string) => {
  let data = await axios.get(
    `${baseApiPath}/${repo}/issues?creator=${
      CONFIG.owner
    }&state=closed&per_page=200&access_token=${CONFIG.token.join('')}`,
  );
  return data;
};

/**
 * 根据仓库名称，获取所有 issue
 */
export const getAllIssue = async (resp: string = 'blog') => {
  let [openIssues = [], closedIssues = []]: any = await Promise.all([
    _getOpenIssue(resp),
    _getClosedIssue(resp),
  ]);
  let allIssues = [...openIssues, ...closedIssues];
  return allIssues;
};

/**
 * 获取标签列表
 */
export const getTags = async (repo: string) => {
  let tags = await axios.get(`https://api.github.com/repos/${CONFIG.owner}/${repo}/labels`);
  return tags;
};

/**
 * 根据 Issue id 获取评论
 * @param id
 */
export const getComments = async (repo: string, id: string | number) => {
  let data = await axios.get(
    `https://api.github.com/repos/${
      CONFIG.owner
    }/${repo}/issues/${id}/comments?access_token=${CONFIG.token.join('')}`,
  );
  return data;
};
