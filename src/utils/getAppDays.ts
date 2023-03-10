/**
 *
 * @param day 当前时间
 */
export const getAppDays = (day: string) => {
  const createdTime = Date.parse('2022-10-24');

  const nowTime = Date.parse(day);

  if (nowTime - createdTime < 0) return 0;

  if (nowTime - createdTime === 0) return 1;

  const days = (nowTime - createdTime) / (1 * 24 * 60 * 60 * 1000);

  return days;
};

/**
 * 获取当前日期
 */
export const getCurrentDays = () => {
  const date = new Date();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  const currDate =
    date.getFullYear() +
    '-' +
    (mon < 10 ? '0' + mon : mon) +
    '-' +
    (day < 10 ? '0' + day : day);

  return currDate;
};

/**
 * 时间的显示方法
 */
export const dateTransferShow = (date: string) => {
  const curDay = parseInt(getCurrentDays().split('-')[2], 10);

  const day = parseInt(date.split('-')[2], 10);

  let text: string;

  switch (day - curDay) {
    case 0:
      text = '今天';
      break;
    case 1:
      text = '昨天';
      break;
    default:
      text = date;
  }

  return text;
};
