export interface RootState {
  user: UserState;
  tasklists: TasklistsState;
  tasklistCreateForm: TasklistCreateFormState;
  tasklistEditForm: TasklistEditFormState;
  tasks: TasksState;
  taskCreateForm: TaskCreateFormState;
  message: MessageState;
}

export interface UserState {
  initialized: boolean;
  signedIn: boolean;
  name: string;
  imageUrl: string;
}

export interface TasklistState {
  id: number;
  title: string;
  taskIds: number[];
  taskCount: number;
  taskLoaded: boolean; // このfield は model に持たせたい
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
  isSubmitted: boolean;
  isSubmitting: boolean;
  title: string;
  id: number;
}

export interface TasksState {
  isFetching: boolean;
  isUpdating: boolean;
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
