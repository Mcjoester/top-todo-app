// Single Responsibility Principlev(SRP): The TaskService class handles task-related operations.
import { Task } from "./task.js";
import { Project } from "./project.js";
import { ProjectService } from "./projectservice.js";

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

    setTaskDateFromAllProjects(task, newDate) {
        const projects = this.projectService.getProjects(); // Dynamically fetch all projects
        projects.forEach((project) => {
            const taskIndex = project.getTasks().indexOf(task); // Find the task in the current project
            if (taskIndex !== -1) {
                project.setDate(taskIndex, newDate); // Update the task's date
            }
        });
    }
    

    setTaskDate(projectName, index, newDate) {
        const project = this.projectService.getProject(projectName);
        if (project) {
            const task = project.getTask(index);
            if (task) {
                this.setTaskDateFromAllProjects(task, newDate);
                return true; // Signal success
            } else {
                console.log('Task not found');
                return false;
            }
        } else {
            console.log('Project not found');
            return false;
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

    getTodayTasks() {
        const tasks = this.getTasks('Inbox');
        if (tasks.length === 0) {
            console.log('No tasks due today');
            return;
        }

        // Get Today's Date as a string
        const today = new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });

        // Filter tasks due today
        const todayTasks = tasks.filter((task) => task.getDueDate() === today);
        return todayTasks;
    }

    addTasksForToday() {
        const todayProject = this.projectService.getProject('Today');
        let todaysTasks = [];
        if (todayProject) {
            todayProject.clearTasks();
            todaysTasks = this.getTodayTasks() || [];
            todaysTasks.forEach((task) => {
                console.log(`Iterating through ${task.getTitle()}`);
                todayProject.addTask(task);
            });
        } else {
            console.log(`${todayProject} does not exist.`);
        }
        return todaysTasks;
    }

    getThisWeekTasks() {
        const tasks = this.getTasks('Inbox');
        if (tasks.length === 0) {
            console.log('No tasks due today');
            return;
        }

        // Get today's date
        const today = new Date();

        // Calculate start and end of the current week (assuming week start on Sunday)
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);

        const formatDate = (date) => date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });

        const startOfWeekStr = formatDate(startOfWeek);
        const endOfWeekStr = formatDate(endOfWeek);

        // Filter tasks due this week
        const thisWeekTasks = tasks.filter((task) => {
            const dueDate = task.getDueDate();
            return dueDate >= startOfWeekStr && dueDate <= endOfWeekStr;
        });
        return thisWeekTasks;
    }

    addTasksForThisWeek() {
        // Add tasks to This Week Project
        const thisWeekProject = this.projectService.getProject('This Week');
        let thisWeekTasks = [];
        if (thisWeekProject) {
            thisWeekProject.clearTasks();
            thisWeekTasks = this.getThisWeekTasks() || [];
            thisWeekTasks.forEach((task) => {
                console.log(`Iterating through ${task.getTitle()}`);
                thisWeekProject.addTask(task);
            });
        } else {
            console.log(`${thisWeekProject} does not exist.`);
        }
        return thisWeekTasks;
    }




}

    export { TaskService };