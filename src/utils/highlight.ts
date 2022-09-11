/**
 * 高亮
 */
export const highLight = (text: string, keyword: string): string => {
  const reg = new RegExp(keyword, 'ig');

  return text.replaceAll(reg, (value) => `<b>${value}</b>`);
};
