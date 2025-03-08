import { Task } from "./task";

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    toJSON() {
        return {
            name: this.name,
            tasks: this.tasks.map(task => task.toJSON())
        };
    }

    static fromJSON(json) {
        const project = new Project(json.name);
        project.tasks = json.tasks.map(taskJson => Task.fromJSON(taskJson));
        return project;
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

    getTitle(index) {
        const task = this.getTask(index);
        task.getTitle();
    }

    getDate(index) {
        const task = this.getTask(index);
        task.getDueDate();
    }

    setTitle(index, newTitle) {
        const task = this.getTask(index);
        task.setTitle(newTitle);
    }

    setDate(index, newDate) {
        const task = this.getTask(index);
        task.setDueDate(newDate);
    }
}

export { Project };