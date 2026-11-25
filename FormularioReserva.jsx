import { useState } from "react";

const PELICULAS = [
  "Avatar: El Camino del Agua",
  "Avengers: Endgame",
  "Interestelar",
  "Spider-Man: Across the Spider-Verse",
  "El Señor de los Anillos: La Comunidad del Anillo",
];

const PRECIO_BOLETA = 15000;

export default function FormularioReserva({ onAgregarReserva }) {
  const [pelicula, setPelicula] = useState(PELICULAS[0]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [boletas, setBoletas] = useState(1);

  const cantidad = Math.max(1, Number(boletas) || 1);
  const total = cantidad * PRECIO_BOLETA;

  const enviar = (e) => {
    e.preventDefault();
    if (!nombreCliente.trim() || !fecha || !hora) return;

    onAgregarReserva({
      id: Date.now(),
      pelicula,
      nombreCliente: nombreCliente.trim(),
      fecha,
      hora,
      boletas: cantidad,
      total,
      pagado: false,
    });

    setNombreCliente("");
    setFecha("");
    setHora("");
    setBoletas(1);
    setPelicula(PELICULAS[0]);
  };

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Película
        </label>
        <select
          value={pelicula}
          onChange={(e) => setPelicula(e.target.value)}
          className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
        >
          {PELICULAS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Nombre del Cliente
          </label>
          <input
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            placeholder="Ejemplo: Johan Bernal"
            required
            className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Cantidad de Boletas
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={boletas}
            onChange={(e) => setBoletas(e.target.value)}
            className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Fecha
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Hora
          </label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm">
        <span className="text-slate-600">Total a pagar:</span>
        <span className="font-bold text-indigo-600">
          ${total.toLocaleString("es-CO")}
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold p-3 rounded-xl transition-colors shadow-sm"
      >
        Reservar Entrada
      </button>
    </form>
  );
}