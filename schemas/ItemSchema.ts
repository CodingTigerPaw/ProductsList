import { z } from "zod";

export const itemSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1),
  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(1),
  type: z.string({
    required_error: "Type is required",
  }),
  count: z
    .number({
      required_error: "Count is required",
      invalid_type_error: "Count must be a number",
    })
    .int()
    .positive(),
});
