class ConsoleToDoApp {
    constructor(taskService, taskPrinter) {
        this.taskService = taskService;
        this.taskPrinter = taskPrinter;
    }

    addTask(title, projectName = "Inbox") {
        console.log(`Adding new task ${title} to project ${projectName}.`);
        this.taskService.addNewTask(title, projectName);
        this.taskPrinter.printTasks(projectName);
    }

    removeTask(projectName, index) {
        console.log(`Removing task ${index} from project ${projectName}.`);
        this.taskService.removeTask(projectName, index - 1);
        this.taskPrinter.printTasks(projectName);
    }

    completeTask(projectName, index) {
        console.log(`Completing task ${index} from project ${projectName}`);
        this.taskService.completeTask(projectName, index - 1);
        this.taskPrinter.printTasks(projectName);
    }

    createProject(projectName) {
        console.log(`Deleting project ${projectName}.`);
        this.taskService.projectService.removeProject(projectName);
        this.taskPrinter.printAllProjects();
    }

    listProjects() {
        this.taskPrinter.printAllProjects();
    }

    printTasks(projectName) {
        this.taskPrinter.printTasks(projectName);
    }
}

export { ConsoleToDoApp };