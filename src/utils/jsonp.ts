/**
 * 封装jsonp方法
 */

export const jsonp = (setting: any) => {
  setting.data = setting.data || {};
  setting.key = setting.key || 'callback';
  setting.callback = setting.callback || function () {};
  setting.data[setting.key] = '__onGetData__';

  (window as any).__onGetData__ = function (data: any) {
    setting.callback(data);
  };
  var script = document.createElement('script');
  var query = [];
  for (var key in setting.data) {
    query.push(key + '=' + encodeURIComponent(setting.data[key]));
  }
  script.src = setting.url + '?' + query.join('&');
  document.head.appendChild(script);
  document.head.removeChild(script);
};

export const jsonp2 = (setting: any) => {
  setting.data = setting.data || {};
  setting.key = setting.key || 'callback';
  setting.callback = setting.callback || function () {};
  setting.data[setting.key] = '__onGetData__';

  (window as any).__onGetData__ = (data: any) => {
    setting.callback(data);
  };
  (window as any).__onGetData__();
  var script = document.createElement('script');
  var query = [];
  for (var key in setting.data) {
    query.push(key + '=' + encodeURIComponent(setting.data[key]));
  }
  script.src = setting.url + query.join('&');
  document.head.appendChild(script);
  document.head.removeChild(script);
};
