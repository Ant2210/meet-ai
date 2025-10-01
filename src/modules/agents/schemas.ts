// import { z } from "zod";

// export const agentsInsertSchema = z.object({
import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  instructions: z
    .string()
    .trim()
    .min(1, { message: "Instructions are required" }),
});
