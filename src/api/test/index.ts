/**
 * 此文件用来存放所有的后端接口模拟数据，仅用来完成前端的开发，后期将用后端的接口代替
 */

/**
 * 博客分类
 */
export const postType = [
  {
    id: 1,
    name: '首页',
  },
  {
    id: 2,
    name: '我的项目',
  },
  {
    id: 3,
    name: '前端技术',
  },
  {
    id: 4,
    name: '经验分享',
  },
  {
    id: 5,
    name: '闲聊杂谈',
  },
  {
    id: 6,
    name: '佳作推荐',
  },
  {
    id: 7,
    name: '优质转载',
  },
  {
    id: 8,
    name: '网站公告',
  },
  {
    id: 9,
    name: '个人经历',
  },
  {
    id: 10,
    name: '其他',
  },
];

/**
 * 博客标签
 */
export const tags = [
  {
    id: 1,
    name: 'AfterEffects',
    amount: 11,
  },
  {
    id: 2,
    name: '开发',
    amount: 100,
  },
  {
    id: 3,
    name: 'Python',
    amount: 120,
  },
  {
    id: 4,
    name: 'Docker',
    amount: 67,
  },
  {
    id: 5,
    name: '干货',
    amount: 45,
  },
  {
    id: 6,
    name: '必看',
    amount: 35,
  },
  {
    id: 7,
    name: '热门',
    amount: 14,
  },
  {
    id: 8,
    name: '日常',
    amount: 167,
  },
  {
    id: 9,
    name: '软件',
    amount: 15,
  },
  {
    id: 10,
    name: '闲聊',
    amount: 255,
  },
  {
    id: 11,
    name: '音乐',
    amount: 134,
  },
  {
    id: 12,
    name: '更新日志',
    amount: 12,
  },
];

/**
 * 网站数据
 */
export const info = {
  postAmount: 100,
  wordAmount: 10,
  accessAmount: 4000,
  updatedTime: '4天前',
};

/**
 * 博客发表统计数量根据月份
 */
export const postAmount = [
  {
    date: '01',
    count: 10,
  },
  {
    date: '02',
    count: 30,
  },
  {
    date: '03',
    count: 20,
  },
  {
    date: '04',
    count: 15,
  },
  {
    date: '05',
    count: 12,
  },
  {
    date: '06',
    count: 9,
  },
  {
    date: '07',
    count: 16,
  },
  {
    date: '08',
    count: 15,
  },
  {
    date: '09',
    count: 14,
  },
  {
    date: '10',
    count: 18,
  },
  {
    date: '11',
    count: 14,
  },
  {
    date: '12',
    count: 12,
  },
];

// 博客信息接口
export const posts = [
  {
    id: 3,
    title: '独立开发个人博客',
    description:
      '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
    content: '<h1>hello,world!</h1>',
    wordAmount: '800',
    readTime: '10min',
    created: '2022-06-14 23:26:35',
    commentAmount: 10,
    accessAmount: 4000,
    types: [
      {
        id: 1,
        name: '前端技术',
      },
      {
        id: 2,
        name: '面经',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'JavaScript',
      },
      {
        id: 2,
        name: '开发',
      },
      {
        id: 3,
        name: '日常',
      },
    ],
  },
  {
    id: 2,
    title: '独立开发个人博客',
    description:
      '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
    content: '<h1>hello,world!</h1>',
    wordAmount: '800',
    readTime: '10min',
    created: '2022-06-14 23:26:35',
    commentAmount: 10,
    accessAmount: 4000,
    types: [
      {
        id: 1,
        name: '前端技术',
      },
      {
        id: 2,
        name: '面经',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'JavaScript',
      },
      {
        id: 2,
        name: '开发',
      },
      {
        id: 3,
        name: '日常',
      },
    ],
  },
  {
    id: 1,
    title: '独立开发个人博客',
    description:
      '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
    content: '<h1>hello,world!</h1>',
    wordAmount: '800',
    readTime: '10min',
    created: '2022-06-14 23:26:35',
    commentAmount: 10,
    accessAmount: 4000,
    types: [
      {
        id: 1,
        name: '前端技术',
      },
      {
        id: 2,
        name: '面经',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'JavaScript',
      },
      {
        id: 2,
        name: '开发',
      },
      {
        id: 3,
        name: '日常',
      },
    ],
  },
];

// 用户信息接口信息
export const users = {
  name: 'Mecci',
  description: '学习永无止境',
  blogAmount: 10,
  typeAmount: 4,
  tagAmount: 8,
  info: {
    github: 'https://www.github.com/mecci1999',
    qq: 'http://wpa.qq.com/msgrd?v=3&uin=664751829&site=qq&menu=yes',
    wechat: '',
  },
};
