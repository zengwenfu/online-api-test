module.exports = {
  list: [
    {
      id: '1',
      submary: 'hello'
    },
    {
      id: '2',
      submary: 'world'
    }
  ],
  detail: {
    '1': {
      content: 'what the fucking life'
    },
    '2': {
      content: '这操蛋的人生！！！'
    }
  },
  processes: [
    {
      url: 'http://127.0.0.1:3000/testFApi/login',
      method: 'POST',
      name: 'login',
      json: {
        name: 'facemagic',
        pass: 'facemagic888'
      }
    },
    {
      url: 'http://127.0.0.1:3000/testFApi/getList',
      method: 'GET',
      name: 'list'
    },
    [
      {
        url: 'http://127.0.0.1:3000/testFApi/getDetail/$data$.data[0].id',
        method: 'GET',
        name: 'detail1'
      },
      {
        url: 'http://127.0.0.1:3000/testFApi/getDetailById',
        method: 'GET',
        name: 'detail2',
        params: {
          id: '$data$.data[1].id'
        }
      }
    ]
  ]
};
