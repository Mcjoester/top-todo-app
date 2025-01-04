

class ToDoUI {
    constructor(taskService, projectService, cardContainerSelector, buttonContainerSelector, defaultContainerSelector) {
        this.taskService = taskService;
        this.projectService = projectService;
        this.cardContainer = document.querySelector('#list-container');
        this.defaultBtnContainer = document.querySelector('#default-btns-container');
        this.buttonContainer = document.querySelector('#projects-container');
        this.activeProject = 'Inbox';
    }

    //Default Project
    renderDefaultProjects() {
        this.defaultBtnContainer.textContent = '';
        this.projectService.getProjects().forEach((project, index) => {
            if (index <= 2) {
                const projectElement = this.createDefaultProjectElement(project, index);
            } else {
                return;
            }
        });
    }

    createDefaultProjectElement(project, index) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.setAttribute('data-index', index);
        button.className = 'default-btn';
        button.textContent = `${project.name}`;

        button.addEventListener('click', () => {
            this.setActiveProject(project);
        });

        li.appendChild(button);
        this.defaultBtnContainer.appendChild(li);
    }

    // New Projects
    renderProjects() {
        this.buttonContainer.textContent = '';
        this.projectService.getProjects().forEach((project, index) => {
            if (index > 2) {
                const projectElement = this.createProjectElement(project, index);
                console.log(`logging ${project.name}`);
            } else {
                return;
            }
        });
    }

    setActiveProject(project) {
        // Update the active project
        this.activeProject = project.name;
        console.log(`Setting active project to: ${this.activeProject}`);

        // Re-render tasks for the active project
        this.renderTasks(this.activeProject);
        console.log(`Active project: ${this.activeProject}`);
    }

    getActiveProject() {
        console.log(`Getting active project: ${this.activeProject}`);
        return this.activeProject;
    }

    createProjectElement(project, index) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.setAttribute('data-index', index);
        button.className = 'project-btn';
        button.textContent = `# ${project.name}`;

        button.addEventListener('click', () => {
            this.setActiveProject(project);
        });

        li.appendChild(button);
        this.buttonContainer.appendChild(li);
    }


    // Tasks
    renderTasks(projectName) {
        this.cardContainer.textContent = '';
        projectName = this.activeProject;
        const tasks = this.taskService.getTasks(projectName);
        if (tasks.length === 0) {
            this.cardContainer.textContent = `No tasks in ${projectName}`;
        } else {
            tasks.forEach((task, index) => this.createTaskCard(task, index));
        }
    }

    createTaskCard(task, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-index', index);

        const radioContainer = this.createRadioContainer();
        const taskContainer = this.createTaskContainer();
        const radioButton = this.createRadioButton(index);
        const titleSpan = this.createSpan(task.title);
        const dueDateSpan = this.createSpan(`Due: ${task.dueDate}`);

        cardDiv.appendChild(radioContainer);
        cardDiv.appendChild(taskContainer);
        radioContainer.appendChild(radioButton);
        taskContainer.appendChild(titleSpan);
        taskContainer.appendChild(dueDateSpan);

        this.cardContainer.appendChild(cardDiv);
    }

    createRadioContainer() {
        const radioDiv = document.createElement('div');
        radioDiv.className = 'radio-container';
        return radioDiv;
    }

    createTaskContainer() {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-container';
        return taskDiv;
    }

    createSpan(text, className = '') {
        const span = document.createElement('span');
        span.textContent = text;
        if (className) span.className = className;
        return span;
    }

    createRadioButton(index) {
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'complete-task';

        radioButton.addEventListener('change', () => {
            const projectName = this.activeProject;
            this.taskService.removeTask(projectName, index);
            this.renderTasks();
        });
        return radioButton;
    }
}

export { ToDoUI };
