import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title harus di isi.").max(255),
  description: z.string().min(1, "Deskripsi Harus di isi."),
  start_date: z.date().nullable(), // Menerima nilai null atau objek Date
  deadline: z.date().nullable(),
  client_id: z.number(),
  created_by: z.number(),
  status_id: z.number(),
  assigned_to: z.number(),
});
