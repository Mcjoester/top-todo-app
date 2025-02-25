import { Task } from "./task";

class TaskForm {
    constructor(onSubmit) {
        this.addTaskBtn = document.querySelector('#open-btn');
        this.taskForm = document.querySelector('.task-form');
        this.titleInput = document.querySelector('#form-title');
        this.submitFormBtn = document.querySelector('#submit-form');
        this.cancelFormBtn = document.querySelector('#cancel-form');

        this.cancelFormBtn.addEventListener('click', () => this.cancelForm())
        this.submitFormBtn.addEventListener('click', () => onSubmit(this.getTaskFromForm()));
    }

    getTaskFromForm() {
        const title = this.titleInput.value;
         
        this.clearForm();
        this.hideForm();
        return new Task(title)
    }

    clearForm() {
        this.titleInput.value = '';
    }

    hideForm() {
        this.taskForm.style.display = 'none';
        this.addTaskBtn.style.display = 'block';
    }

    cancelForm() {
        this.clearForm();
        this.hideForm();
    }
}

export { TaskForm };