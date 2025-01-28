

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
            const addTaskBtn = document.getElementById('open-btn');
            if (button.textContent === 'Today' || button.textContent === 'This Week') {
                addTaskBtn.style.display = 'none';
            } else {
                addTaskBtn.style.display = 'block';
            }
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

        if (this.activeProject === 'Today') {
            this.renderTodayTasks();
            console.log('Rendering Today Tasks');
        } else if (this.activeProject === 'This Week') {
            this.renderThisWeekTasks();
            console.log('Rendering This Week Tasks ')
        } else {
             // Re-render tasks for the active project
        this.renderTasks(this.activeProject);
        console.log(`Active project: ${this.activeProject}`);
        }

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
            this.cardContainer.textContent = `No damn tasks in ${projectName}`;
        } else {
            tasks.forEach((task, index) => this.createTaskCard(task, index));
        }
    }

    // Today
    renderTodayTasks() {
        this.cardContainer.textContent = '';
        const inboxTasks = this.taskService.getTasks('Inbox');
        if (inboxTasks.length === 0) {
            this.cardContainer.textContent = `No tasks due ${this.activeProject}`;
            return;
        }

        const todayTasks = this.taskService.getTodayTasks();
        if (todayTasks.length === 0) {
            this.cardContainer.textContent = `No tasks due ${this.activeProject}`;
        } else {
            this.taskService.addTasksForToday().forEach((task, index) => this.createTaskCard(task, index));
        }
    }

    renderThisWeekTasks() {
        this.cardContainer.textContent = '';
        const inboxTasks = this.taskService.getTasks('Inbox');
        if (inboxTasks.length === 0) {
            this.cardContainer.textContent = `No tasks due ${this.activeProject}`;
            return;
        }

        const thisWeekTasks = this.taskService.getThisWeekTasks();
        if (thisWeekTasks.length === 0) {
            this.cardContainer.textContent = `No tasks due ${this.activeProject}`;
        } else {
            this.taskService.addTasksForThisWeek().forEach((task, index) => this.createTaskCard(task, index));
        }
    }

    updateTaskDate(projectName, taskIndex, newDate) {
        const success = this.taskService.setTaskDate(projectName, taskIndex, newDate);
        if (success) {
            this.renderTodayTasks(); // Re-render the "Today" view to reflect changes
        } else {
            console.log('Failed to update task date');
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
        const dueDateSpan = this.createDateSpan(`Due: ${task.dueDate}`);
        const dueDateInput = this.createDueDateInput(index);

        cardDiv.appendChild(radioContainer);
        cardDiv.appendChild(taskContainer);
        radioContainer.appendChild(radioButton);
        taskContainer.appendChild(titleSpan);
        taskContainer.appendChild(dueDateSpan);
        taskContainer.appendChild(dueDateInput);

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

    createDateSpan(text) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = text;
        dateSpan.className = 'date-span';

        dateSpan.addEventListener('click', () => {
            dateSpan.style.display = 'none';
            console.log('click');

            const dateInput = dateSpan.nextElementSibling;
            if (dateInput) {
                dateInput.classList.add('active');
            }
        });
        return dateSpan;
    }

    createDueDateInput(index) {
        const dateInput = document.createElement('input');
        dateInput.className = 'date-input';
        dateInput.type = 'date';
        dateInput.id = 'date-input-id';

        dateInput.addEventListener('change', (e) => {
            const projectName = this.activeProject;
            const selectedDate = e.target.value;
            const splitDate = selectedDate.split('-');
            const month = splitDate[1];
            const day = splitDate[2];
            const year = splitDate[0];
            const formattedDate = `${month}/${day}/${year}`;

            this.taskService.setTaskDate(projectName, index, formattedDate);
            if (projectName === 'Today') {
            console.log(`Setting selected date ${formattedDate} from task service on project ${projectName}`);
            this.renderTodayTasks();
            } else if (projectName === 'This Week') {
                console.log(`Setting selected date ${formattedDate} from task service on project ${projectName}`)
                this.renderThisWeekTasks();
            } else {
                console.log(`Setting selected date ${formattedDate} from task service on project ${projectName}`);
                this.renderTasks();
            }

            dateInput.classList.remove('active');
            console.log(`Selected date: ${selectedDate}`);

            const dateSpan = dateInput.previousElementSibling;
            if (dateSpan) {
                dateSpan.style.display = 'block';
                dateSpan.textContent = `${selectedDate}`;
            }
        })
        return dateInput;
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
