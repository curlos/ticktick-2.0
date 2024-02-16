export interface TaskObjProps {
    id: string,
    title: string,
    completed: boolean,
    directSubtasks: Array<string>,
    uppermostTask?: boolean,
    completedPomodoros: number,
    timeTaken: number,
    estimatedDuration: number;
    deadline?: string;
    description?: string;
}

export interface Tasks {
    [key: string]: TaskObjProps;
}