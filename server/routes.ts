import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      console.log("Contact form submission:", {
        name: validatedData.name,
        email: validatedData.email,
        messagePreview: validatedData.message.substring(0, 50) + "...",
        timestamp: new Date().toISOString(),
      });

      res.status(200).json({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again.",
        });
      }
    }
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return httpServer;
}
