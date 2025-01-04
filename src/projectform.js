import { Project } from "./project";

class ProjectForm {
    constructor(onSubmit) {
        this.titleInput = document.querySelector('#project-form-title');
        this.submitFormBtn = document.querySelector('#project-submit-form');

        this.submitFormBtn.addEventListener('click', () => onSubmit(this.getProjectFromForm()));
    }

    getProjectFromForm() {
        const title = this.titleInput.value;

        this.clearForm();
        return new Project(title);
    }

    clearForm() {
        this.titleInput.value = '';
    }
}

export { ProjectForm };