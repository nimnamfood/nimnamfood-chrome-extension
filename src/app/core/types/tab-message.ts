export type TabMessage<TCode extends string, TData = unknown> = {
  code: TCode;
  input?: TData;
};
