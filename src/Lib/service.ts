import request from "./request";

function get(url: string) {
  return request({
    method: "GET",
    url,
  });
}

function post<T = any>({ url, data }: { url?: string; data: T }) {
  return request({
    method: "POST",
    url,
    data,
  });
}

function update(url: any, data: any, ) {
  return request({
    method: "PUT",
    url,
    data,
  });
}

function remove(url: any, data: any) {
  return request({
    method: "DELETE",
    url,
    data,
  });
}
const Service = {
  get,
  post,
  update,
  remove,
};
export default Service;
