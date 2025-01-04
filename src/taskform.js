import { Task } from "./task";

class TaskForm {
    constructor(onSubmit) {
        this.titleInput = document.querySelector('#form-title');
        this.submitFormBtn = document.querySelector('#submit-form');

        this.submitFormBtn.addEventListener('click', () => onSubmit(this.getTaskFromForm()));
    }

    getTaskFromForm() {
        const title = this.titleInput.value;

        this.clearForm();
        return new Task(title);
    }

    clearForm() {
        this.titleInput.value = '';
    }
}

export { TaskForm };