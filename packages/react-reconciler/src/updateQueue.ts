import { Action } from "shared/ReactTypes";

export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}
export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return {
    action,
  };
};
// this.setState({xx: 1})
// this.setState(({xx: 1}) => ({xx: 2}))

export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<Action>;
};

export const enqueueUpdate = <Action>(
  updateQueue: UpdateQueue<Action>,
  update: Update<Action>,
) => {
  updateQueue.shared.pending = update;
};

export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null,
): { memorizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue> = {
    memorizedState: baseState,
  };
  if (pendingUpdate !== null) {
    // baseState 1 update 2 -> memorizedState 2
    // baseState 1 update (x) => 4x -> memorizedState 4
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memorizedState = action(baseState);
    } else {
      result.memorizedState = action;
    }
  }
  return result as { memorizedState: State };
};
