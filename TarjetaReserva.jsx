export default function TarjetaReserva({ reserva, onRegistrarPago, onEliminar }) {
  const numBoletas = reserva.boletas || 1;
  const valorTotal = reserva.total ?? numBoletas * 15000;

  return (
    <article className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-bold text-slate-800">
            {reserva.pelicula}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              reserva.pagado
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {reserva.pagado ? "Pagado" : "Pendiente"}
          </span>
        </div>

        <div className="mt-3 text-xs text-slate-600 space-y-1">
          <p>
            <span className="font-semibold text-slate-700">Cliente:</span>{" "}
            {reserva.nombreCliente}
          </p>
          <p>
            <span className="font-semibold text-slate-700">Fecha:</span>{" "}
            {reserva.fecha}
          </p>
          <p>
            <span className="font-semibold text-slate-700">Hora:</span>{" "}
            {reserva.hora}
          </p>
          <p>
            <span className="font-semibold text-slate-700">Boletas:</span>{" "}
            {numBoletas} —{" "}
            <span className="font-semibold text-indigo-600">
              ${valorTotal.toLocaleString("es-CO")}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-5 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onRegistrarPago(reserva.id)}
          className={`flex-1 text-xs font-semibold py-2 px-3 rounded-xl transition-colors ${
            reserva.pagado
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {reserva.pagado ? "Pago Registrado ✓" : "Registrar el pago"}
        </button>

        <button
          type="button"
          onClick={() => onEliminar(reserva.id)}
          className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold py-2 px-3 rounded-xl transition-colors"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}