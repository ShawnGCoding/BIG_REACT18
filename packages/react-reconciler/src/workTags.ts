export type WorkTag =
  | typeof FunctionComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText;

export const FunctionComponent = 0;
// ReactDOM.render()
export const HostRoot = 3;
// <div>
export const HostComponent = 5;
export const HostText = 6;
