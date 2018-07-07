import {getHost} from './common';
import {
  PROCESS_TYPE_SERIAL,
  PROCESS_TYPE_PARALLEL,
  PROCESS_FORMAT_URLENCODE,
  PROCESS_FORMAT_JSON
} from 'utils/constants';

export function getDomain() {
  const host = getHost();
  const domain = `http://${host}`;
  return domain;
}

export function getMockProcess() {
  return [
    {
      url: `/testFApi/login`,
      method: 'POST',
      name: 'login',
      json: JSON.stringify({
        name: 'facemagic',
        pass: 'facemagic888'
      }),
      type: PROCESS_TYPE_SERIAL,
      formatType: PROCESS_FORMAT_JSON,
      params: [{}]
    },
    {
      url: `/testFApi/getList`,
      method: 'GET',
      name: 'list',
      type: PROCESS_TYPE_SERIAL,
      formatType: PROCESS_FORMAT_URLENCODE,
      params: [{}]
    },
    {
      url: `/testFApi/getDetail/$data$.data[0].id`,
      method: 'GET',
      name: 'detail1',
      type: PROCESS_TYPE_SERIAL,
      formatType: PROCESS_FORMAT_URLENCODE,
      params: [{}]
    },
    {
      url: `/testFApi/getDetailById`,
      method: 'GET',
      name: 'detail2',
      params: [
        {
          key: 'id',
          value: '$data$.data[1].id'
        }
      ],
      type: PROCESS_TYPE_PARALLEL,
      formatType: PROCESS_FORMAT_URLENCODE
    }
  ];
}
