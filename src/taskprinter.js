// Open/Closed Principle (OCP): The TaskPrinter class is open for extension (e.g., different output formats)
// but closed for modification.



class TaskPrinter {
    constructor(projectService) {
        this.projectService = projectService;
    }

    printTask(projectName) {
        const project = this.projectService.getProject(projectName);
        if (project) {
            const tasks = project.getTaks();
            console.log(`Tasks for project: ${project.getName()}`);
            if (tasks.length === 0) {
                console.log('No tasks in this project');
            } else {
                tasks.forEach((task, index) => {
                    const status = task.isComplete() ? '[x]' : '[ ]';
                    console.log(`${index + 1}. ${status} ${task.getTitle()} | due: ${task.getDueDate()}`);
                });
            }
        } else {
            console.log('Project not found');
        }
    }

    printAllProjects() {
        const projects = this.projectService.getProjects();
        console.log('Projects');
        projects.forEach((project) => {
            console.log(`- ${project.getName()}`);
        });
    }
}

    export { TaskPrinter };
    

    