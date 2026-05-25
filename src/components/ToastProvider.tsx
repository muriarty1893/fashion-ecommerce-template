import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, PanInfo, motion } from "framer-motion";
import { X } from "lucide-react";

export type ToastType = {
  id: string;
  title: string;
  subtitle?: string;
  autodismiss?: boolean;
  leading: () => ReactNode;
  key?: string;
};

type ToastInput = Omit<ToastType, "id"> & {
  id?: string;
};

type ToastContextValue = {
  showToast: (toast: ToastInput) => string;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const createToastId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback((toast: ToastInput) => {
    const id = toast.key || toast.id || createToastId();
    const nextToast: ToastType = {
      ...toast,
      id,
      autodismiss: toast.autodismiss ?? true,
    };

    setToasts((currentToasts) => [
      nextToast,
      ...currentToasts.filter((currentToast) => currentToast.id !== id),
    ].slice(0, 4));

    return id;
  }, []);

  const value = useMemo(
    () => ({ showToast, removeToast }),
    [removeToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <ToastCard
              key={toast.id}
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};

const ToastCard = ({
  toast,
  onRemove,
}: {
  toast: ToastType;
  onRemove: () => void;
}) => {
  useEffect(() => {
    if (!toast.autodismiss) return;

    const timer = window.setTimeout(onRemove, 4200);
    return () => window.clearTimeout(timer);
  }, [onRemove, toast.autodismiss]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) {
      onRemove();
    }
  };

  return (
    <motion.div
      layout
      drag="x"
      dragElastic={0.16}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, x: 28, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 360, damping: 30 }}
      className="pointer-events-auto flex cursor-grab items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-stone-950 shadow-[0_18px_60px_rgba(28,25,23,0.18)] active:cursor-grabbing"
      role="status"
      aria-live="polite"
    >
      <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone-950 text-white">
        {toast.leading()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black">{toast.title}</p>
        {toast.subtitle && (
          <p className="mt-1 text-sm leading-5 text-stone-600">{toast.subtitle}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};
