import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map((t, i) => (
        <div
          key={i}
          className="bg-black text-white p-4 rounded-lg shadow-lg mb-2"
        >
          {t.title && <div className="font-bold">{t.title}</div>}
          {t.description && <div>{t.description}</div>}
        </div>
      ))}
    </div>
  )
}
