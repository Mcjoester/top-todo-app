// Task class representing a single to-do item 
class Task {
    constructor(title) {
        this.title = title;
        this.dueDate = '';
        this.completed = false;
    }

    getTitle() {
        return this.title;
    }

    getDueDate() {
        return this.dueDate;
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