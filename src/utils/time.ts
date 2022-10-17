/**
 * 相对时间显示的方法
 * @param time 时间YYYY-MM-DD HH-mm-ss字符串
 * @return {string} 相对时间
 *  过去时间：
 *  刚刚
 *  1-59分钟前
 *  1-24小时前
 *  1-7天前
 *  YYYY-MM-DD
 * 未来的时间：
 *  1-59分钟后
 *  1-24小时后
 *  1-7天前后
 *  YYYY-MM-DD
 */
import dayjs from 'dayjs';

export const time = (time: string): string => {
  // 现在时间
  const nowTime = new Date().getTime();

  // 将时间转化成时间戳
  const inTime = dayjs(time).valueOf();

  let gapTime = Math.ceil((nowTime - inTime) / 1e3);

  let result: string = '';

  if (gapTime >= 0) {
    // 过去的时间
    if (gapTime < 60) {
      result = '刚刚';
    } else if (gapTime >= 60 && gapTime < 60 * 60) {
      result = `${Math.floor(gapTime / 60)}分钟前`;
    } else if (gapTime > 60 * 60 && gapTime < 60 * 60 * 24) {
      result = `${Math.floor(gapTime / 60 / 60)}小时前`;
    } else if (gapTime > 60 * 60 * 24 && gapTime < 60 * 60 * 24 * 7) {
      result = `${Math.floor(gapTime / 60 / 60 / 24)}天前`;
    } else {
      result = time.split(' ')[0];
    }
  } else {
    // 未来的时间
    gapTime = Math.abs(gapTime);
    if (gapTime < 60) {
      result = '马上';
    } else if (gapTime >= 60 && gapTime < 60 * 60) {
      result = `${Math.floor(gapTime / 60)}分钟后`;
    } else if (gapTime > 60 * 60 && gapTime < 60 * 60 * 24) {
      result = `${Math.floor(gapTime / 60 / 60)}小时后`;
    } else if (gapTime > 60 * 60 * 24 && gapTime < 60 * 60 * 24 * 7) {
      result = `${Math.floor(gapTime / 60 / 60 / 24)}天后`;
    } else {
      result = time.split(' ')[0];
    }
  }

  return result;
};
