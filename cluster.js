const cluster = require('cluster');
const os = require('os');
const numCpus = os.cpus().length;

const process = require('process');

console.log('numcpus', numCpus);

const workers = {};
if (cluster.isMaster) {
    // 主进程
    cluster.on('death', function (worker) {
        worker = cluster.fork();
        workers[worker.pid] = worker;
    })
    for (let i = 0; i < numCpus; i++) {
        var worker = cluster.fork();
        workers[worker.pid] = worker;
    }
} else {
    // 工作进程ß
    const app = require('./app');
    app.use(async (ctx,next) => {
        console.log('worker'+ cluster.worker.id+',PID:'+ process.pid)
    })
    app.listen(3000);
}
process.on('SIGTERM', function(){
    for(var pid in workers){
        process.kill(pid)
    }
    process.exit(0)
})
require('./test')