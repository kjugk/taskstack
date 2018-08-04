export interface RootState {
  tasklists: TasklistsState;
  tasklistCreateForm: TasklistCreateFormState;
  tasklistEditForm: TasklistEditFormState;
  tasks: TasksState;
  taskCreateForm: TaskCreateFormState;
  message: MessageState;
}

export interface TasklistState {
  id: number;
  title: string;
  taskIds: number[];
  taskCount: number;
  taskLoaded: boolean;
}

export interface TasklistsState {
  ids: number[];
  isInitialized: boolean;
  isFetching: boolean;
  selectingId: number | undefined;
  tasklistsById: {
    [index: number]: TasklistState;
  };
}

export interface TasklistCreateFormState {
  isSubmitting: boolean;
  title: string;
  isSubmitted: boolean;
}

export interface TasklistEditFormState {
  active: boolean;
  isSubmitting: boolean;
  title: string;
  id: number;
}

export interface TasksState {
  isFetching: boolean;
  tasksById: {
    [index: number]: TaskState;
  };
}

export interface TaskState {
  id: number;
  title: string;
  memo: string;
  completed: boolean;
}

export interface TaskCreateFormState {
  title: string;
  isSubmitting: boolean;
}

export interface MessageState {
  message: string;
}
