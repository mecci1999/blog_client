/**
 * 处理列表过滤器
 */
export const filterProcess = (filterObject: { [name: string]: string }) => {
  const allowedFilterNames = ['tagId', 'typeId', 'action', 'post'];

  Object.keys(filterObject).forEach((filterName) => {
    const allowed = allowedFilterNames.some(
      (allowedFilterName) => allowedFilterName === filterName,
    );

    if (!allowed) {
      delete filterObject[filterName];
    }
  });

  return filterObject;
};
