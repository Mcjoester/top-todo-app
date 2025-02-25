


class ToDoUI {
    constructor(taskService, projectService, cardContainerSelector, buttonContainerSelector, defaultContainerSelector) {
        this.taskService = taskService;
        this.projectService = projectService;
        this.titleContainer = document.querySelector('#title-main-container');
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
       // button.textContent = `${project.name}`;

       //Create an icon element
       const icon = document.createElement('span');
       icon.className = 'material-icons';

       // Assign icon based on project name
       if (project.name === 'Inbox') {
        icon.textContent = 'inbox';
        icon.classList.add('inbox-icon');
       } else if (project.name === 'Today') {
        icon.textContent = 'today';
        icon.classList.add('today-icon');
       } else if (project.name === 'This Week') {
        icon.textContent = 'date_range';
        icon.classList.add('week-icon');
       } else {
        icon.textContent = 'folder';
       }

       button.appendChild(icon);
       button.appendChild(document.createTextNode(` ${project.name}`));

        button.addEventListener('click', () => {
            const addTaskBtn = document.getElementById('open-btn');
            const taskForm = document.querySelector('.task-form');
            if (project.name === 'Today' || project.name === 'This Week') {
                addTaskBtn.style.display = 'none';
                taskForm.style.display = 'none';
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
        //button.textContent = `# ${project.name}`;
        const leftBtnPanel = document.createElement('div');
        leftBtnPanel.className = 'left-btn-panel';
        //const btnSpan = document.createElement('span');
        //btnSpan.textContent = `# ${project.name}`;
        const icon = document.createElement('span');
        icon.className = 'material-icons';
        icon.textContent = 'tag';
        icon.classList.add('tag-icon');


        const rightBtnPanel = document.createElement('div');
        rightBtnPanel.className = 'right-btn-panel';
        const closeIcon = document.createElement('span');
        closeIcon.classList.add('material-icons', 'close-icon');
        closeIcon.textContent = 'close';

        // Add event listener to the close icon
    closeIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the button click event from firing
        if (project.name === this.activeProject) {
        this.projectService.removeProject(project.name); // Call removeProject method
        this.renderProjects();
        const getInboxProject = this.projectService.getProject('Inbox');
        this.setActiveProject(getInboxProject);
        } else {
            this.projectService.removeProject(project.name);
            this.renderProjects();
        }
    });

        

        button.addEventListener('click', () => {
            const addTaskBtn = document.getElementById('open-btn');
            if (addTaskBtn.style.display === 'none') {
                addTaskBtn.style.display = 'block';
            }
            this.setActiveProject(project);
        });

        leftBtnPanel.appendChild(icon);
        leftBtnPanel.appendChild(document.createTextNode(` ${project.name}`));
        rightBtnPanel.appendChild(closeIcon);
        button.appendChild(leftBtnPanel);
        button.appendChild(rightBtnPanel);
        li.appendChild(button);
        this.buttonContainer.appendChild(li);
    }


    // Tasks
    renderTasks(projectName) {
        this.cardContainer.textContent = '';
        projectName = this.activeProject;
        const tasks = this.taskService.getSortedTasks(projectName);
        this.titleContainer.textContent = `${projectName}`;
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
        const projectName = this.activeProject;
        this.titleContainer.textContent = `${projectName}`;
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

    // This Week
    renderThisWeekTasks() {
        this.cardContainer.textContent = '';
        const inboxTasks = this.taskService.getTasks('Inbox');
        const projectName = this.activeProject;
        this.titleContainer.textContent = `${projectName}`;
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



    createTaskCard(task) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-task-id', task.id);

        const radioContainer = this.createRadioContainer();
        const taskContainer = this.createTaskContainer();
        const radioButton = this.createRadioButton(task.id);

        const titleSpan = this.createSpan(task.title);
        const dueDateSpan = this.createDateSpan(`Due: ${task.dueDate}`);
        const dueDateInput = this.createDueDateInput(task.id);

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

    createDueDateInput(taskId) {
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

            // Find the task index using the task ID
            const tasks = this.taskService.getTasks(projectName);
            const taskIndex = tasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                this.taskService.setTaskDate(projectName, taskIndex, formattedDate);
                if (projectName === 'Today') {
                    this.renderTodayTasks();
                } else if (projectName === 'This Week') {
                    this.renderThisWeekTasks();
                } else {
                    this.renderTasks();
                }
            }

            dateInput.classList.remove('active');
            console.log(`Selected date: ${selectedDate}`);

            const dateSpan = dateInput.previousElementSibling;
            if (dateSpan) {
                dateSpan.style.display = 'block';
                dateSpan.textContent = `Due: ${formattedDate}`;
            }
        });
        return dateInput;
    }

    createRadioButton(taskId) {
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'complete-task';

        radioButton.addEventListener('change', () => {
            const projectName = this.activeProject;

            // Find the task index using the task ID
            const tasks = this.taskService.getTasks(projectName);
            const taskIndex = tasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                this.taskService.removeTask(projectName, taskIndex);
                this.renderTasks();
            }
        });
        return radioButton;
    }
}

export { ToDoUI };
