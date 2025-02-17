import { Project } from "./project";
import { TaskService } from "./taskservice";

class ProjectService {
    constructor() {
        this.projects = {};
        this.defaultProject = ["Inbox", "Today", "This Week"];
        this.defaultProject.forEach(projectName => {
            this.projects[projectName] = new Project(projectName);
        })
    }

    setTaskService(taskService) {
        this.taskService = taskService;
    }

    addProject(projectName) {
        if (!this.projects[projectName]) {
            this.projects[projectName] = new Project(projectName);
        } else {
            console.log('Project already exists');
        }
    }

    removeProject(projectName) {
        if (!this.defaultProject.includes(projectName) && this.projects[projectName]) {
            this.taskService.removeAllTasksFromProject(projectName);
            delete this.projects[projectName];
            console.log(`Project: ${projectName} has been removed`);
        } else {
            console.log('Cannot remove the default project or a non-existing project.');
        }
    }

    getProjects() {
        return Object.values(this.projects);
    }

    getProject(projectName) {
        return this.projects[projectName] || null;
    }
}

export { ProjectService };