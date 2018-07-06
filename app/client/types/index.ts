export interface RootState {
  tasklistList: TasklistListState
}

export interface TasklistState {
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
