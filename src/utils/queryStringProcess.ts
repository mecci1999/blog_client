import queryString, { StringifiableRecord } from 'query-string';

/**
 * 处理地址查询符
 */
export const queryStringProcess = (queryStringObject: StringifiableRecord) => {
  Object.keys(queryStringObject).forEach((key) => {
    if (
      queryStringObject[key] === undefined ||
      queryStringObject[key] === '' ||
      (key === 'typeId' && queryStringObject[key] === '0')
    ) {
      delete queryStringObject[key];
    }
  });
  return queryString.stringify(queryStringObject);
};
