export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  PEER_REVIEW = 'peerReview',
  DONE = 'done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface KanbanState {
  readonly tasks: Task[];
  readonly searchQuery: string;
}