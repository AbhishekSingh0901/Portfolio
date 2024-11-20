import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 10000; // Reduced for usability in examples.

enum ActionTypes {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

interface Toast {
  id: string;
  open: boolean;
  message: string;
  onOpenChange?: (open: boolean) => void;
  action?: React.ReactNode;
}

interface State {
  toasts: Toast[];
}

type Action =
  | { type: ActionTypes.ADD_TOAST; toast: Toast }
  | { type: ActionTypes.UPDATE_TOAST; toast: Toast }
  | { type: ActionTypes.DISMISS_TOAST; toastId?: string }
  | { type: ActionTypes.REMOVE_TOAST; toastId?: string };

const toastTimeouts = new Map<string, NodeJS.Timeout>();
let count = 0;

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: ActionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ActionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case ActionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case ActionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
};

const listeners: React.Dispatch<React.SetStateAction<State>>[] = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function toast(props: Omit<Toast, "id" | "open">) {
  const id = genId();

  const update = (updateProps: Partial<Toast>) =>
    dispatch({ type: ActionTypes.UPDATE_TOAST, toast: { ...updateProps, id } });

  const dismiss = () =>
    dispatch({ type: ActionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: ActionTypes.ADD_TOAST,
    toast: {
      id,
      open: true,
      ...props,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: ActionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };
