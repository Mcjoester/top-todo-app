import { Task } from "./task";
import { TaskService } from "./taskservice";
import { Project } from "./project";
import { ProjectService } from "./projectservice";
import { ProjectForm } from "./projectform";
import { TaskForm } from "./taskform";
import { ToDoUI } from "./todo-ui";

class ToDoApp {
    constructor() {
        this.projectService = new ProjectService();
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

        const projectOpenBtn = document.querySelector('#add-project-btn');
        const projectModal = document.querySelector('#project-modal');

        openButton.addEventListener('click', () => {
            console.log('Modal is being opened');
            modal.showModal();
        });

        projectOpenBtn.addEventListener('click', () => {
            console.log('Project modal is being opened');
            projectModal.showModal();
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