export interface RootState {
  tasklistList: TasklistListState,
  tasklistCreateForm: TasklistCreateFormState,
  tasklistEditForm: TasklistEditFormState,
  message: MessageState
}

export interface TasklistState {
  id: number;
  title: string;
}

export interface TasklistListState {
  tasklistsById: {
    [index: number]: TasklistState
  };
  ids: number[];
  isInitialized: boolean;
  isFetching: boolean;
  selectedId: number;
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

export interface MessageState {
  message: string;
}