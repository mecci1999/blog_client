/**
 * 获取当前时间
 */
export const getCurrnetTime = (): string => {
  // 获取当前时间
  const date = new Date();

  // 当前小时
  const hour = date.getHours();
  const currentHour = hour < 10 ? '0' + hour : `${hour}`;

  // 当前分钟
  const minute = date.getMinutes();
  const currentMinute = minute < 10 ? '0' + minute : `${minute}`;

  // 当前秒
  const second = date.getSeconds();
  const currentSecond = second < 10 ? '0' + second : `${second}`;

  return currentHour + ':' + currentMinute + ':' + currentSecond;
};

/**
 * 随着时间更换壁纸方法
 */
export const changeBackgroundImageByTime = (date: string): any => {
  // 返回URL
  let imgUrl;
  const hour = parseInt(date, 10);
  if (6 <= hour && hour < 8) {
    imgUrl = 'image_4_6';
  } else if (8 <= hour && hour < 10) {
    imgUrl = 'image_6_8';
  } else if (10 <= hour && hour < 16) {
    imgUrl = 'image_8_16';
  } else if (16 <= hour && hour < 18) {
    imgUrl = 'image_16_18';
  } else if (18 <= hour && hour < 20) {
    imgUrl = 'image_18_20';
  } else if (20 <= hour && hour < 24) {
    imgUrl = 'image_20_24';
  } else if (0 <= hour && hour < 6) {
    imgUrl = 'image_24_4';
  } else {
    imgUrl = 'image_8_16';
  }

  return imgUrl;
};
