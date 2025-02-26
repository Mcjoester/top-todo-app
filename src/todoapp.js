import { Task } from "./task";
import { StorageService } from "./storagservice";
import { TaskService } from "./taskservice";
import { Project } from "./project";
import { ProjectService } from "./projectservice";
import { ProjectForm } from "./projectform";
import { TaskForm } from "./taskform";
import { ToDoUI } from "./todo-ui";

class ToDoApp {
    constructor() {
        // Initialize the storage service
        this.storageService = new StorageService();

        // Initialize project and task services
        this.projectService = new ProjectService(this.storageService); // Pass the storage service here

        this.taskService = new TaskService(this.projectService);
        this.projectService.setTaskService(this.taskService)
        this.todoUI = new ToDoUI(this.taskService, this.projectService, '#list-container', '#project-container', '#default-btn-container');
        this.taskForm = new TaskForm(task => this.handleTaskFormSubmit(task));
        this.projectForm = new ProjectForm(project => this.handleProjectSubmitForm(project));
        this.activeProject = this.todoUI.getActiveProject();

        this.setupEventListener();
        this.todoUI.renderDefaultProjects();
        this.todoUI.renderProjects();
        this.todoUI.renderTasks(this.activeProject);
    }

    setupEventListener() {
        const openButton = document.querySelector('#open-btn');
        const modal = document.querySelector('#modal');
        const taskForm = document.querySelector('.task-form');
        const taskTitle = document.querySelector('#form-title');

        const projectOpenBtn = document.querySelector('#add-project-btn');
        const projectModal = document.querySelector('#project-modal');
        const projectForm = document.querySelector('.project-form');
        const projectTitle = document.querySelector('#project-form-title');

        openButton.addEventListener('click', () => {
            openButton.style.display = 'none';
            taskForm.style.display = 'block';
            taskTitle.focus();
        });

        projectOpenBtn.addEventListener('click', () => {
            projectOpenBtn.style.display = 'none';
            projectOpenBtn.parentElement.style.marginBottom = '0px';
            projectForm.style.display = 'block';
            projectTitle.focus();

            
        });
    }

    handleProjectSubmitForm(project) {
        console.log(`Adding new project: ${project.name}`);
        this.projectService.addProject(project.name);
        this.todoUI.renderProjects();
    }

    handleTaskFormSubmit(task) {
        console.log(`Adding new task: ${task.title} to project ${this.todoUI.getActiveProject()}`);
        this.taskService.addNewTask(task.title, this.todoUI.getActiveProject());
        this.todoUI.renderTasks(this.todoUI.getActiveProject());
    }
}


export { ToDoApp };