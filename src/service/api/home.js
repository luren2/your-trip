import myRequest from '../request';

export function getHotSuggests() {
  return myRequest.get({
    url: '/home/hotSuggests',
  });
}

export function getCategories() {
  return myRequest.get({
    url: '/home/categories',
  });
}

// get请求传参params(?拼接) post请求传参data
export function getHouseList(num) {
  return myRequest.get({
    url: '/home/houselist',
    params: {
      page: num,
    },
  });
}
