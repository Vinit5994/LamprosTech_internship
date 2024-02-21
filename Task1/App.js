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
