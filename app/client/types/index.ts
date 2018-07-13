export interface RootState {
  tasklistList: TasklistListState,
  tasklistCreateForm: TasklistCreateFormState,
  tasklistEditForm: TasklistEditFormState,
  tasks: TasksState;
  taskCreateForm: TaskCreateFormState;
  message: MessageState
}

export interface TasklistState {
  id: number;
  title: string;
}

export interface TasklistListState {
  ids: number[];
  isInitialized: boolean;
  isFetching: boolean;
  selectingId: number | undefined;
  tasklistsById: {
    [index: number]: TasklistState
  };
}

export interface TasklistCreateFormState {
  active: boolean;
  isSubmitting: boolean;
  title: string;
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
    [index: number]: TaskState
  }
}

export interface TaskState {
  title: string,
  memo: string
}

export interface TaskCreateFormState {
  title: string;
  isSubmitting: boolean;
}

export interface MessageState {
  message: string;
}