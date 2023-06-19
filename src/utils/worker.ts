/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

interface Data {
  task: "upload-img" | "calc-total";
  payload: unknown;
}

const tasks = {};

self.onmessage = onMessage;

function onMessage(evt: MessageEvent<Data>): void {
  const { data } = evt;

  if (data.task in tasks) {
    console.log(data.task, data.payload);
  }
}
