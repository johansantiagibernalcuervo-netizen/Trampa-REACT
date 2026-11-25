import { useEffect, useState } from "react";
import FormularioReserva from "./components/FormularioReserva";
import TarjetaReserva from "./components/TarjetaReserva";

const STORAGE_KEY = "misReservasCine";

export default function App() {
  const [reservas, setReservas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(STORAGE_KEY);
      return guardadas ? JSON.parse(guardadas) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  }, [reservas]);

  const agregarReserva = (nueva) => {
    setReservas((prev) => [nueva, ...prev]);
  };

  const registrarPago = (id) => {
    setReservas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, pagado: !item.pagado } : item
      )
    );
  };

  const eliminarReserva = (id) => {
    setReservas((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPagadas = reservas.filter((r) => r.pagado).length;
  const totalPendientes = reservas.length - totalPagadas;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Sala de Cine</h1>
            <p className="text-slate-500 text-sm">
              Sistema de reservas y control de pagos
            </p>
          </div>
          <div className="flex gap-3 text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="text-slate-600">Total: {reservas.length}</span>
            <span className="text-emerald-600">Pagadas: {totalPagadas}</span>
            <span className="text-amber-600">Pendientes: {totalPendientes}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 w-full flex-1 space-y-8">
        <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Nueva Reserva
          </h2>
          <FormularioReserva onAgregarReserva={agregarReserva} />
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Reservas Registradas
          </h2>

          {reservas.length === 0 ? (
            <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center shadow-sm">
              <p className="text-slate-500 font-medium">
                No hay reservas todavía.
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Completa el formulario de arriba para agregar una función.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reservas.map((reserva) => (
                <TarjetaReserva
                  key={reserva.id}
                  reserva={reserva}
                  onRegistrarPago={registrarPago}
                  onEliminar={eliminarReserva}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Sala de Cine. Todos los derechos reservados.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-slate-600">
            <p>
              Correo:{" "}
              <span className="text-indigo-600 font-medium">
                soporte@saladecine.com
              </span>
            </p>
            <p>
              Contacto:{" "}
              <span className="text-indigo-600 font-medium">
                +57 300 123 4567
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}