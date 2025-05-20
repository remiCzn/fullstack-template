import { z } from "zod";

export type T<A extends z.ZodTypeAny> = z.infer<A>;
