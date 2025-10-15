import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import horariosRouter from "./routes/horarios";
import paymentsRouter from "./routes/payments";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Rota para gerenciamento de horários
  app.use('/api', horariosRouter);
  
  // Rota para pagamentos via Asaas
  app.use('/api/payments', paymentsRouter);

  const httpServer = createServer(app);

  return httpServer;
}
