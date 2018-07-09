export interface RootState {
  tasklistList: TasklistListState,
  tasklistCreateForm: TasklistCreateFormState,
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

export interface MessageState {
  message: string;
}