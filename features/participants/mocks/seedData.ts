import type { MacroId } from "../types";

export const FIRST_NAMES = [
  "Mateo", "Valentina", "Santiago", "Camila", "Thiago", "Luciana", "Sebastián", "Mariana",
  "Diego", "Ximena", "Adrián", "Fernanda", "Gabriel", "Daniela", "Joaquín", "Alessandra",
  "Rodrigo", "Ariana", "Nicolás", "Valeria", "Emilio", "Renata",
];

export const LAST_NAMES = [
  "Quispe Mamani", "Flores Rojas", "Huamán Torres", "Chávez Díaz", "Ramos Vargas", "Castillo León",
  "Mendoza Ríos", "Gutiérrez Paredes", "Espinoza Cruz", "Sánchez Silva", "Rojas Medina", "Vega Salazar",
  "Pinedo Lápiz", "Cori Campos",
];

export const SCHOOLS = [
  "I.E. José Carlos Mariátegui",
  "I.E. Ricardo Palma",
  "I.E. María Parado de Bellido",
  "I.E. Alfonso Ugarte",
  "I.E. Pascual Saco Oliveros",
  "I.E. San Juan de la Libertad",
];

export { SPORTS } from "../domain/sports";

export const CATEGORIES = ["A", "B", "C"];

/** MOCK grouping of regions per macro-region; the real one comes with the client's base. */
export const MACRO_REGIONS: Record<MacroId, string[]> = {
  M1: ["San Martín", "Ucayali", "Amazonas", "Loreto"],
  M2: ["Junín", "Pasco", "Huánuco", "Huancavelica"],
  M3: ["Arequipa", "Tacna", "Moquegua", "Puno"],
  M4: ["Cusco", "Apurímac", "Madre de Dios", "Ayacucho"],
  M5: ["Lima Metropolitana", "Callao"],
  M6: ["La Libertad", "Cajamarca", "Áncash"],
  M7: ["Piura", "Tumbes", "Lambayeque"],
  M8: ["Ica", "Lima Provincias"],
};

export const SPECIAL_PEOPLE = [
  { type: "minedu", institution: "Dirección de Educación Física y Deporte - MINEDU" },
  { type: "guest", institution: "Especialista DRE Ucayali" },
  { type: "guest", institution: "Especialista DRE Cusco" },
  { type: "supplier_full", institution: "Producción general - Servicios Andinos" },
  { type: "supplier_partial", institution: "Alimentación - Catering Lima" },
  { type: "supplier_partial", institution: "Transporte - Movilidad Sur" },
] as const;

export const REVIEWER_NAME = "Carla Mendoza";
export const PRINTER_NAME = "Jorge Ramírez";
export const DELIVERY_USER_NAME = "Rosa Huamán";
export const REGISTRAR_NAME = "Luis Quispe";
