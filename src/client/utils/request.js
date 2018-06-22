export function request(options) {
  return new Promise((resolve) => {
    window.axios(options).then((data) => {
      if (data.status === 200) {
        resolve(data.data);
      } else {
        resolve();
      }
    });
  });
}
