// Single Responsibility Principlev(SRP): The TaskService class handles task-related operations.
import { Task } from "./task.js";

class TaskService {
    constructor(projectService) {
        this.projectService = projectService;
    }

    addNewTask(title, projectName) {
        const task = new Task(title);

        const project = this.projectService.getProject(projectName);
        if (project) {
            project.addTask(task);
        } else {
            console.log(`${projectName} does not exist`);
            return;
        }

        if (projectName !== 'Inbox') {
            const inbox = this.projectService.getProject('Inbox');
            if (inbox) {
                inbox.addTask(task);
            }
        }
    }

    completeTaskFromAllProjects(task) {
        const projects = this.projectService.getProjects();
        projects.forEach((project) => {
            const taskIndex = project.getTasks().indexOf(task);
            if (taskIndex !== -1) {
                project.completeTask(taskIndex);
            }
        })
    }

    completeTask(projectName, index) {
        const project = this.projectService.getProject(projectName);
        if (project) {
            const task = project.getTask(index);
            if (task) {
                // Complete task from all projects
                this.completeTaskFromAllProjects(task);
            } else {
                console.log('Task not found.');
            }
        } else {
            console.log('Project not found.');
        }
    }

    removeTaskFromAllProjects(task) {
        const projects = this.projectService.getProjects();
        projects.forEach((project) => {
            const taskIndex = project.getTasks().indexOf(task);
            if (taskIndex !== -1) {
                project.removeTask(taskIndex);
            }
        });
    }

    removeTask(projectName, taskIndex) {
        const project = this.projectService.getProject(projectName);
        if (project) {
            const task = project.getTasks()[taskIndex];
            if (task) {
                // Remove task from all projects
                this.removeTaskFromAllProjects(task);
            } else {
                console.log('Task not found.');
            }
        } else {
            console.log('Project not found');
        }
    }

    getTasks(projectName) {
        const project = this.projectService.getProject(projectName);
        return project ? project.getTasks() : [];
    }
}

    export { TaskService };