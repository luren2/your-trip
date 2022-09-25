import myRequest from '../request';

export function getDetailById(houseId) {
  return myRequest.get({
    url: '/detail/infos',
    params: {
      houseId,
    },
  });
}
