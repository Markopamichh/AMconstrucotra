"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { generarLinkWhatsApp, type VisitaFormData } from "@/lib/utils/whatsapp";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const HORARIOS = ["Mañana (8-12)", "Tarde (12-17)", "Noche (17-20)"];

interface Props {
  open: boolean;
  onClose: () => void;
}

const emptyForm = (): VisitaFormData => ({
  nombre: "",
  telefono: "",
  localidad: "",
  descripcion: "",
  dias: [],
  horarios: [],
});

export default function VisitaTecnicaModal({ open, onClose }: Props) {
  const [form, setForm] = useState<VisitaFormData>(emptyForm());
  const [errors, setErrors] = useState<Partial<Record<keyof VisitaFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setForm(emptyForm());
      setErrors({});
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const toggleCheck = (
    field: "dias" | "horarios",
    value: string
  ) => {
    setForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!form.nombre.trim()) errs.nombre = "Requerido";
    if (!form.telefono.trim()) errs.telefono = "Requerido";
    if (!form.localidad.trim()) errs.localidad = "Requerido";
    if (!form.descripcion.trim()) errs.descripcion = "Requerido";
    if (form.dias.length === 0) errs.dias = "Seleccioná al menos un día";
    if (form.horarios.length === 0) errs.horarios = "Seleccioná al menos un horario";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const jeni = process.env.NEXT_PUBLIC_WHATSAPP_JENI ?? "5492994226380";
  const silvia = process.env.NEXT_PUBLIC_WHATSAPP_SILVIA ?? "5492995230772";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-am-primary">
              Pedí tu visita técnica
            </h2>
            <p className="text-am-muted text-sm mt-1">
              Completá los datos y te contactamos para coordinar una visita
              gratuita al terreno.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 text-am-muted" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-am-text mb-1">
              Nombre y apellido
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Juan García"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-am-text mb-1">
              Número de contacto
            </label>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: +54 9 299 123-4567"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
            )}
          </div>

          {/* Localidad */}
          <div>
            <label className="block text-sm font-medium text-am-text mb-1">
              Localidad de obra
            </label>
            <input
              type="text"
              value={form.localidad}
              onChange={(e) => setForm({ ...form, localidad: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary ${
                errors.localidad ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Neuquén Capital, Plottier"
            />
            {errors.localidad && (
              <p className="text-red-500 text-xs mt-1">{errors.localidad}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-am-text mb-1">
              Descripción del proyecto a cotizar
            </label>
            <textarea
              rows={3}
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary resize-none ${
                errors.descripcion ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Quiero construir una casa de 80m², 3 ambientes, en un terreno de 300m² en Neuquén Capital."
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
            )}
          </div>

          {/* Días */}
          <div>
            <label className="block text-sm font-medium text-am-text mb-2">
              Días disponibles
            </label>
            <div className="flex flex-wrap gap-2">
              {DIAS.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => toggleCheck("dias", dia)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    form.dias.includes(dia)
                      ? "bg-am-primary text-white border-am-primary"
                      : "bg-white text-am-text border-gray-300 hover:border-am-secondary"
                  }`}
                >
                  {dia}
                </button>
              ))}
            </div>
            {errors.dias && (
              <p className="text-red-500 text-xs mt-1">{errors.dias}</p>
            )}
          </div>

          {/* Horarios */}
          <div>
            <label className="block text-sm font-medium text-am-text mb-2">
              Horarios disponibles
            </label>
            <div className="flex flex-wrap gap-2">
              {HORARIOS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => toggleCheck("horarios", h)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    form.horarios.includes(h)
                      ? "bg-am-primary text-white border-am-primary"
                      : "bg-white text-am-text border-gray-300 hover:border-am-secondary"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
            {errors.horarios && (
              <p className="text-red-500 text-xs mt-1">{errors.horarios}</p>
            )}
          </div>

          {/* Submit */}
          {!submitted ? (
            <button
              type="submit"
              className="w-full bg-am-primary text-white font-semibold rounded-lg py-3 hover:bg-am-secondary transition-colors"
            >
              Confirmar datos
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              <p className="text-sm text-am-muted text-center">
                ¡Listo! Ahora elegí a quién enviarle el mensaje:
              </p>
              <a
                href={generarLinkWhatsApp(jeni, form)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-am-whatsapp text-white font-semibold rounded-lg py-3 hover:brightness-90 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.534 5.86L0 24l6.34-1.508A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.775-.523-5.35-1.437L2 22l1.47-4.535A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Enviar a Jeni 💬
              </a>
              <a
                href={generarLinkWhatsApp(silvia, form)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-am-whatsapp text-white font-semibold rounded-lg py-3 hover:brightness-90 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.534 5.86L0 24l6.34-1.508A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.775-.523-5.35-1.437L2 22l1.47-4.535A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Enviar a Silvia 💬
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="w-full text-am-muted text-sm hover:underline"
              >
                Editar datos
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
