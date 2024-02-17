// priority queue with heap

class Node{
    constructor(value , priority){
        this.value =value;
        this.priority=priority;
    }
}

class PriorityQueue{
    constructor(){
        this.value = [];
    }

    enqueue(val,priority){
        let newNode = new Node(val,priority);
        this.value.push(newNode);

        let index = this.value.length -1;
        let current =this.value[index];

        while ( index > 0 ){
            let parentIndex = Math.floor((index-1)/2);
            let parentValue = this.value[parentIndex];

            if(parentValue.priority <= newNode.priority){ // as per priority up higher priority element
                this.value[parentIndex] = current;
                this.value[index] = parentValue;
                index = parentIndex;
            }else break;
        }
    }

    dequeue(){
        var max = this.value[0];
        var end = this.value.pop();
        this.value[0]=end;

        var index = 0;
        var length = this.value.length;
        var current = this.value[0];
        while(true){
            var leftchildIndex = ((index*2)+1);
            var rightchildIndex = ((index*2)+2);
            var leftchild,rightchild;
            var swap = null;

            if(leftchildIndex < length){
                leftchild = this.value[leftchildIndex];
                if(leftchild.priority > current.priority){
                    swap = leftchildIndex;
                }
            }
            if(rightchildIndex < length){
                rightchild = this.value[rightchildIndex];
                if(swap === null && rightchild.priority > current.priority || swap!== null && rightchild.priority > this.value[swap].priority ){    
                swap = rightchildIndex;
                }
            }

            if(swap===null) {
                break;
            }
            this.value[index] =this.value[swap];
            this.value[swap]= current;
            index = swap;

        }
        return max;
    }
    peek(){
        let top = this.value[0];
        return top;
    }
    size(){
        let size = this.value.length;
        return size;
    }
}
module.exports = PriorityQueue;
const pq= new PriorityQueue();
// pq.enqueue(10,5);
// pq.enqueue(0,8);
// pq.enqueue(10,10);
// pq.enqueue(1,4);
// pq.dequeue();
// console.log(pq.peek())
// console.log(pq.dequeue());
// console.log(pq.size());
// console.log(pq)

