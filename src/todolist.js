// Interface Segregation Principle (ISP) is applied by creating separate classes for task operations.
// The ToDoList class is only responsible for managing the list of tasks.
class ToDoList {
    constructor() {
        this.todoList = [];
    }

    addTask(title) {
        this.todoList.push(title);
    }

    removeTask(index) {
        this.todoList.splice(index, 1);
    }

    getTask(index) {
        return this.todoList[index];
    }

    getTasks() {
        return this.todoList;
    }
}

export { ToDoList }