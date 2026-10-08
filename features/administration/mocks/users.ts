import type { User } from "@/features/auth";

export const MOCK_USERS: User[] = [
  { id: "u-1", name: "Ana Torres", email: "ana.torres@ipd.gob.pe", role: "admin", active: true },
  { id: "u-2", name: "Luis Quispe", email: "luis.quispe@ipd.gob.pe", role: "coordinator", active: true },
  { id: "u-3", name: "Carla Mendoza", email: "carla.mendoza@ipd.gob.pe", role: "operator", active: true },
  { id: "u-4", name: "Jorge Ramírez", email: "jorge.ramirez@ipd.gob.pe", role: "operator", active: true },
  { id: "u-5", name: "Rosa Huamán", email: "rosa.huaman@ipd.gob.pe", role: "operator", active: true },
  { id: "u-6", name: "Pedro Salas", email: "pedro.salas@ipd.gob.pe", role: "coordinator", active: false },
];
