// var http = require('http');
// var fs = require('fs')
// var event = require('events');
// var PriorityQueue = require('./PriorityQueueWithHeap');

// var pq = new PriorityQueue()
// var eventEmitter = new event.EventEmitter();

// eventEmitter.on("enqueue" , function(value , priority){
//     pq.enqueue(value,priority);
//     // console.log(pq)
// })

// eventEmitter.on("dequeue" ,()=>{
//     pq.dequeue();
//     // console.log(pq);
// })

// fs.readFile('Command.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     const operations = data.split('\n');
//     operations.forEach(operation => {
//         const [op, value, priority] = operation.split(' ');
//         if (op === "enqueue") {
//             eventEmitter.emit("enqueue", value,parseInt(priority))
//         } else if(op === "dequeue") { // Use else if to ensure only one dequeue operation is performed per line
//             eventEmitter.emit("dequeue");
//         }
//     });
//     console.log(pq);
// });

// http.createServer((req,res)=>{
//     if (req.url === '/size') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end(`Current size of the queue: ${pq.size()}`);
//     } else if(req.url=='/priorityqueue'){
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end(`Current size of the queue: ${pq.value}`);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not found');
//     }
// }).listen(8001);
const http = require("http");
const fs = require("fs");
const readline = require("readline");
const event = require("events");
const eventemitter = new event.EventEmitter();
var PriorityQueue = require('./PriorityQueueWithHeap');

var pq = new PriorityQueue()

const file = readline.createInterface({
    input: fs.createReadStream('Command.txt'),
    output: process.stdout,
    terminal: false
});


eventemitter.on('enqueue', (value,priority) => pq.enqueue(value , priority));
eventemitter.on('dequeue', () => pq.dequeue());


file.on('line', (line) => {
    const [op, value, priority] = line.split(' ');

    if (op === 'enqueue') {
        eventemitter.emit('enqueue',value , priority);
    }
    if (op === 'dequeue') {
        eventemitter.emit('dequeue');
    }

    console.log(pq);
})

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const url = req.url;

    if (url === '/size') {
        let size = pq.size();
        res.write(`Size of priority queue is ${size}`);
        res.end();
    }

}).listen(8001);