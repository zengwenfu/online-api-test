import {} from 'utils/constants';
let rela;
let websocket;
let processData;
const TYPE_RELA = 'rela';
const TYPE_PROCESS = 'process';
const TYPE_BEFORE_REQUEST = 'breq';
const TYPE_AFTER_REQUEST = 'areq';
import actions from 'store/actions';
let dispatch;

function buildMsg(data, type) {
  return JSON.stringify({
    type: type,
    rela,
    data
  });
}

function buildDefaultCb(message) {
  return () => {
    console.log(message);
  };
}

function receiveMsg(evt) {
  try {
    const data = JSON.parse(evt.data);
    if (data.type === TYPE_RELA) {
      rela = data.data.rela;
      if (processData) {
        websocket.send(buildMsg(processData, TYPE_PROCESS));
      }
    } else if (data.type === TYPE_BEFORE_REQUEST) {
      dispatch(actions.setRequestOptions(data.data));
    } else if (data.type === TYPE_AFTER_REQUEST) {
      dispatch(actions.setRequestResult(data.data));
    }
  } catch (e) {
    console.log(e);
    console.log('msg parse error');
  }
}

export function conn({onOpen, onClose, onMessage, onError}) {
  const domain = window.location.host;
  const wsServer = 'ws://' + domain;
  websocket = new WebSocket(wsServer);
  websocket.binaryType = 'arraybuffer';
  websocket.onopen = onOpen || buildDefaultCb('onOpen');
  websocket.onclose = onClose || buildDefaultCb('onClose');
  websocket.onmessage = onMessage || receiveMsg;
  websocket.onerror = onError || buildDefaultCb('onError');
}

export function sendProcess(data, disp) {
  dispatch = disp;
  processData = data;
  if (!websocket) {
    conn({});
  } else {
    websocket.send(buildMsg(processData, TYPE_PROCESS));
  }
}
