const config = {
  owner: 'zhongxia245',
  repo: 'blog',
  title: 'zhongxia - Stay Hungry, Stay Foolish.',
  titleLoad: 'zhongxia - loading...',
  baiduAnaly: '',
  token: ['5a21e6d39cdc8d9fa00', 'd1ea080c2b3d9e0ded027'], // 需拆开
};

export const baseApiPath = `https://api.github.com/repos/${config.owner}/${config.repo}/issues`;
export const issuePath = `https://github.com/${config.owner}/${config.repo}/issues`;

export default config;
