import type { DeliveryPlace } from "../types";

/** Delivery places confirmed by the client ("Respuestas preguntas", question 4). */
export const MOCK_DELIVERY_PLACES: DeliveryPlace[] = [
  { id: "bros", name: "Local Bros, Magdalena", active: true },
  { id: "meliton", name: "IEE Melitón Carvajal, Lince", active: true },
  { id: "villa", name: "Villa Panamericana, VES", active: true },
  { id: "videna", name: "Sede competencia – Videna, San Luis", active: true },
  { id: "ricardo-palma", name: "Sede competencia – IE Ricardo Palma, Surquillo", active: true },
  { id: "luisa-fuentes", name: "Sede competencia – Polideportivo Luisa Fuentes, VES", active: true },
  { id: "avelino", name: "Sede competencia – Complejo Andrés Avelino Cáceres, VMT", active: true },
  { id: "panamericano", name: "Sede competencia – Complejo Panamericano, San Miguel", active: true },
  { id: "car", name: "Sede competencia – CAR, Punta Rocas", active: true },
  { id: "ulima", name: "Sede competencia – Universidad de Lima, Ate", active: true },
  { id: "fia", name: "Sede competencia – Coliseo FIA, La Molina", active: true },
];
