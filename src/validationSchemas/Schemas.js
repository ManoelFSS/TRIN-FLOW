// fieldSchemas.js
import { z } from "zod";

export const nameSchema = z.string().min(3, "O nome é obrigatório.");

export const emailSchema = z.string().email("Insira um e-mail válido.");

export const phoneSchema = z
    .string()
    .min(14, "O telefone deve ter pelo menos 14 caracteres.")
    .regex(/^\(\d{2}\)\d{5}-\d{4}$/, "O telefone deve estar no formato (XX)XXXXX-XXXX.");

export const passwordSchema = z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve ter pelo menos um número.")
    .regex(/[\W_]/, "A senha deve ter pelo menos um caractere especial (ex: !, @, #, etc.).");

export const checkboxSchema = z
    .boolean()
    .refine((value) => value === true, "Você precisa aceitar os termos e condições.");

// schema de cadastro
export const registerSchema = z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    isAdmin: z.boolean().optional(),
});

// schema de recuperação de senha
export const recoverySchema = z.object({
    password: passwordSchema,
    passwordRepeat: passwordSchema,
});

