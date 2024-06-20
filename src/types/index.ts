import { Sex } from "@prisma/client";

export type Slug = [Sex, string | undefined, string | undefined];
