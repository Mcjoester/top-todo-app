class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    clearTasks() {
        this.tasks = [];
    }

    completeTask(index) {
        const task = this.getTask(index);
        task.completeTask();
    }

    getTasks() {
        return this.tasks;
    }

    getTask(index) {
        return this.tasks[index];
    }

    getName() {
        return this.name;
    }

    getDate(index) {
        const task = this.getTask(index);
        task.getDueDate();
    }

    setDate(index, newDate) {
        const task = this.getTask(index);
        task.setDueDate(newDate);
    }
}

export { Project };