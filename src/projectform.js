import { Project } from "./project";

class ProjectForm {
    constructor(onSubmit) {
        this.projectForm = document.querySelector('.project-form');
        this.addProjectBtn = document.querySelector('#add-project-btn');
        this.titleInput = document.querySelector('#project-form-title');
        this.submitFormBtn = document.querySelector('#project-submit-form');
        this.cancelFormBtn = document.querySelector('#project-cancel-form');

        this.cancelFormBtn.addEventListener('click', () => this.cancelForm());
        this.submitFormBtn.addEventListener('click', () => onSubmit(this.getProjectFromForm()));
    }

    getProjectFromForm() {
        const title = this.titleInput.value;

        this.clearForm();
        this.hideForm();
        return new Project(title);
    }

    clearForm() {
        this.titleInput.value = '';
    }

    hideForm() {
    this.projectForm.style.display = 'none';
    this.addProjectBtn.style.display = 'block';
    }

    cancelForm() {
        this.clearForm();
        this.hideForm();
    }
}

export { ProjectForm };