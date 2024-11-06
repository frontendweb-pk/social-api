import { Worker, isMainThread, parentPort, workerData, } from "worker_threads";


if (isMainThread) {

} else {
    let count = 0;
    for (let i = 0; i <= 2_000_000_000; i++) {
        count++
    }
    console.log(`count: ${count} worker`);
}