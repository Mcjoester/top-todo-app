import { Project } from "./project";

class ProjectService {
    constructor() {
        this.projects = {};
        this.defaultProject = ["Inbox", "Today", "This Week"];
        this.defaultProject.forEach(projectName => {
            this.projects[projectName] = new Project(projectName);
        })
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
            delete this.project[projectName];
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