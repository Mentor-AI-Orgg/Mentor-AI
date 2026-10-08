// Apel sincron către firul MySQL. Atomics.wait blochează firul principal,
// iar răspunsul vine pe un MessagePort, nu prin bucla de evenimente.

const { Worker, MessageChannel, receiveMessageOnPort } = require("worker_threads");
const path = require("path");
const { mysqlConfig, lockWaitSeconds, mysqlConfigError } = require("../storeMode");

let worker = null;

function pull(port) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const wrapped = receiveMessageOnPort(port);
    if (wrapped) return wrapped.message;
    const pause = new Int32Array(new SharedArrayBuffer(4));
    Atomics.wait(pause, 0, 0, 10);
  }
  return null;
}

function ensureWorker() {
  if (worker) return worker;
  const config = mysqlConfig();
  if (!config) throw new Error(mysqlConfigError());
  worker = new Worker(path.join(__dirname, "worker.js"), {
    workerData: { config, lockWaitSeconds: lockWaitSeconds() }
  });
  worker.on("error", () => { /* răspunsul ajunge pe port; firul e repornit la eroare */ });
  return worker;
}

function call(op, payload, timeoutMs = 30000) {
  const current = ensureWorker();
  const { port1, port2 } = new MessageChannel();
  const sab = new SharedArrayBuffer(4);
  const flag = new Int32Array(sab);
  current.postMessage({ op, payload: payload || {}, sab, port: port2 }, [port2]);
  const waited = Atomics.wait(flag, 0, 0, timeoutMs);
  if (waited === "timed-out") {
    const dead = worker;
    worker = null;
    if (dead) dead.terminate();
    throw new Error("MySQL nu a răspuns la timp.");
  }
  const message = pull(port1);
  port1.close();
  if (!message) throw new Error("MySQL nu a trimis un răspuns.");
  if (message.error) {
    const error = new Error(message.error);
    error.code = message.code || "";
    throw error;
  }
  return message.result;
}

function close() {
  if (!worker) return;
  try {
    call("close", {}, 5000);
  } catch {
    /* închidem firul oricum */
  }
  const current = worker;
  worker = null;
  if (current) current.terminate();
}

module.exports = { call, close };
