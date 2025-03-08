import { v4 as uuidv4 } from 'uuid';

// Task class representing a single to-do item 
class Task {
    constructor(title) {
        this.title = title;
        this.dueDate = '';
        this.completed = false;
        this.id = uuidv4();
    }

    toJSON() {
        return {
            title: this.title,
            id: this.id,
            dueDate: this.dueDate,
            completed: this.completed
        };
    }

   static fromJSON(json) {
        const task = new Task(json.title);
        task.id = json.id;
        task.dueDate = json.dueDate;
        task.completed = json.completed;
        return task;
    }

    getTitle() {
        return this.title;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getDueDate() {
        return this.dueDate;
    }

    getTaskID() {
        return this.id;
    }

    setDueDate(date) {
        this.dueDate = date;
    }

    isCompleted() {
        return this.completed;
    }

    completeTask() {
        this.completed = true;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

export { Task };