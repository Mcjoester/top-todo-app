import { Project } from "./project";
import { StorageService } from "./storagservice";
import { TaskService } from "./taskservice";

class ProjectService {
    constructor(storageService) {
        this.storageService = storageService;
        this.projects = {};
        this.defaultProject = ["Inbox", "Today", "This Week"];
        this.loadProjects();
    }

    loadProjects() {
        const todoListData = this.storageService.load('todolist');
        if (todoListData) {
            for (const projectJson of todoListData.projects) {
                this.projects[projectJson.name] = Project.fromJSON(projectJson);
                console.log(`Loading ${projectJson.name}`);
            }
        } else {
            // Initialize default projects if no data is found
            this.defaultProject.forEach(projectName => {
                this.projects[projectName] = new Project(projectName);
                console.log('Else path for loadProjects()');
            });
            this.saveProjects(); // Save default projects to localStorage
        }
    }

    saveProjects() {
        const todoListData = {
            projects: this.getProjects().map(project => project.toJSON())
        };
        this.storageService.save('todolist', todoListData);
    }

    setTaskService(taskService) {
        this.taskService = taskService;
    }

    addProject(projectName) {
        if (!this.projects[projectName] && projectName !== '') {
            this.projects[projectName] = new Project(projectName);
            this.saveProjects(); // Save to localStorage after adding a project
        } else {
            console.log('Project already exists');
        }
    }

    removeProject(projectName) {
        if (!this.defaultProject.includes(projectName) && this.projects[projectName]) {
            this.taskService.removeAllTasksFromProject(projectName);
            delete this.projects[projectName];
            this.saveProjects(); // Save to localStorage after removing a project
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