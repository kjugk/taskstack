export interface RootState {
  tasklistList: TasklistListState,
  tasklistCreateForm: TasklistCreateFormState
}

export interface TasklistState {
  id: number;
  title: string;
}

export interface TasklistListState {
  tasklistsById: {
    [index: number]: TasklistState
  };
  isInitialized: boolean;
  isFetching: boolean;
  selectedId: number;
}

export interface TasklistCreateFormState {
  active: boolean;
  title: string;
}
