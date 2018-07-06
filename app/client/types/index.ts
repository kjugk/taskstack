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
  isFetching: boolean;
  selectedId: number;
}
