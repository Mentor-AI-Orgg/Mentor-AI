const { z } = require("zod");
const { usernameIssue } = require("../safety/usernamePolicy");

function celMult(count) {
  const n = Number(count) || 0;
  const unit = n === 1 ? "caracter" : "caractere";
  return n >= 20 ? `${n} de ${unit}` : `${n} ${unit}`;
}

// Mesajele implicite Zod sunt în engleză. Le înlocuim pentru orice câmp
// care ajunge la utilizator fără un text propriu.
z.setErrorMap((issue, ctx) => {
  const field = Array.isArray(issue.path) && issue.path.length
    ? String(issue.path[issue.path.length - 1])
    : "";
  if (issue.code === z.ZodIssueCode.too_big && issue.type === "string") {
    if (["password", "confirmPassword", "currentPassword", "newPassword"].includes(field)) {
      return { message: `Parola poate avea cel mult ${celMult(issue.maximum)}.` };
    }
    if (field === "token") return { message: "Linkul nu mai este valabil." };
    if (field === "email" || field === "parentEmail" || field === "to_email" || field === "other_email" || field === "child_email") {
      return { message: "Adresa de email este prea lungă." };
    }
    return { message: `Textul poate avea cel mult ${celMult(issue.maximum)}.` };
  }
  if (issue.code === z.ZodIssueCode.too_small && issue.type === "string") {
    if (field === "token") return { message: "Linkul nu mai este valabil." };
    if (Number(issue.minimum) <= 1) return { message: "Câmpul este obligatoriu." };
    return { message: `Textul trebuie să aibă cel puțin ${celMult(issue.minimum)}.` };
  }
  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return { message: "Valoarea nu este acceptată." };
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email") return { message: "Adresa de email nu este validă." };
    return { message: "Textul nu este valid." };
  }
  if (issue.code === z.ZodIssueCode.unrecognized_keys) {
    return { message: "Cererea conține câmpuri necunoscute." };
  }
  if (issue.code === z.ZodIssueCode.invalid_type || issue.code === z.ZodIssueCode.invalid_literal) {
    return { message: "Date invalide." };
  }
  const fallback = String(ctx.defaultError || "");
  if (/String must|Invalid|Expected|Required|Unrecognized/.test(fallback)) {
    return { message: "Date invalide." };
  }
  return { message: fallback || "Date invalide." };
});

const PASSWORD_MAX = "Parola poate avea cel mult 200 de caractere.";
const LINK_INVALID = "Linkul nu mai este valabil.";
const TERMS_REQUIRED = "Trebuie să fii de acord cu termenii și politica de confidențialitate.";

const linkToken = z.string().trim().min(20, LINK_INVALID).max(200, LINK_INVALID);

const usernameField = z.string().trim().superRefine((value, ctx) => {
  const issue = usernameIssue(value);
  if (!issue) return;
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: issue.error,
    params: { code: issue.code }
  });
});

const email = z
  .string({ required_error: "Adresa de email este obligatorie." })
  .trim()
  .toLowerCase()
  .email("Adresa de email nu este validă.")
  .max(254);

const optionalEmail = z
  .string()
  .trim()
  .toLowerCase()
  .max(254)
  .refine(v => v === "" || z.string().email().safeParse(v).success, {
    message: "Adresa de email nu este validă."
  })
  .optional()
  .default("");

const registerSchema = z.object({
  username: usernameField,
  password: z.string({ required_error: "Parola este obligatorie." }).min(1, "Parola este obligatorie.").max(200, PASSWORD_MAX),
  confirmPassword: z.string().min(1, "Confirmă parola.").max(200, PASSWORD_MAX),
  class: z.enum(["5", "6", "7", "8"]),
  parentEmail: email,
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: TERMS_REQUIRED })
  }),
  role: z.enum(["student", "parent", "teacher"]).optional().default("student")
}).strict();

const consentActionSchema = z.object({
  token: linkToken,
  action: z.enum(["grant", "refuse"])
});

const tokenSchema = z.object({
  token: linkToken
});

const parentEmailSchema = z.object({
  parentEmail: email
});

const loginSchema = z.object({
  email: z.string().trim().min(1, "Numele de utilizator și parola sunt obligatorii.").max(254),
  password: z.string().min(1, "Numele de utilizator și parola sunt obligatorii.").max(200, PASSWORD_MAX)
}).strict();

const forgotPasswordSchema = z.object({
  email: z.string().trim().max(254).optional().default("")
});

const resetPasswordSchema = z.object({
  token: linkToken,
  password: z.string().min(1, "Parola este obligatorie.").max(200, PASSWORD_MAX)
});

const problemRefSchema = z.object({
  source: z.enum(["quiz", "flashcard", "en", "step", "mistake"]),
  id: z.string().trim().min(1).max(160),
  session_id: z.string().max(80).optional().default(""),
  paper_id: z.string().max(120).optional().default("")
}).strict();

const chatSchema = z.object({
  message: z
    .string({ required_error: "Câmpul 'message' este obligatoriu." })
    .trim()
    .min(1, "Câmpul 'message' este obligatoriu.")
    .max(2000, "Mesajul este prea lung."),
  subject: z.string().max(80).optional().default("matematica"),
  class_level: z.union([z.string(), z.number()]).optional().default(8),
  language: z.string().max(8).optional().default("ro"),
  plan_id: z.string().max(20).optional().default("free"),
  conversation_id: z.string().max(80).optional(),
  problem: problemRefSchema.optional()
}).strict();

const detectSchema = z.object({
  text: z
    .string({ required_error: "Textul este obligatoriu." })
    .trim()
    .min(20, "Textul trebuie să aibă minim 20 de caractere.")
    .max(20000, "Textul este prea lung.")
});

const inviteLinkSchema = z.object({
  to_email: email,
  kind: z.enum(["parent_child", "teacher_student"], {
    errorMap: () => ({ message: "Tip de legătură necunoscut." })
  })
});

const unlinkSchema = z.object({
  other_email: email
});

const claimSchema = z.object({
  type: z.string().min(1, "Tipul recompensei este obligatoriu.").max(80),
  payload: z.record(z.any()).optional()
}).passthrough();

const buySchema = z.object({
  item_id: z.string().min(1, "item_id este obligatoriu.").max(80)
});

const equipSchema = z.object({
  item_id: z.string().max(80).optional(),
  title_id: z.string().max(80).optional(),
  slot: z.enum(["avatar", "background", "title"]).optional()
});

const progressSchema = z.object({
  type: z.enum([
    "chapter_open",
    "session_complete",
    "flashcard_known",
    "focus_session",
    "save_session",
    "learn_module",
    "mentor_message",
    "chapter_test"
  ], { errorMap: () => ({ message: "Tip de progres necunoscut." }) }),
  meta: z.record(z.any()).optional().default({})
});

const accessCodeRequestSchema = z.object({
  child_email: email,
  phone: z.string().max(20).optional().default("")
});

const accessCodeVerifySchema = z.object({
  child_email: email,
  code: z
    .string({ required_error: "Codul este obligatoriu." })
    .trim()
    .regex(/^\d{6}$/, "Codul trebuie să aibă 6 cifre.")
});

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Ora trebuie să fie HH:MM.");

const calendarEventSchema = z.object({
  date: z.union([
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data trebuie să fie în format YYYY-MM-DD."),
    z.literal("")
  ]).optional(),
  title: z.string().trim().min(1, "Titlul este obligatoriu.").max(200),
  type: z.string().max(40).optional(),
  time: hhmm.optional(),
  endTime: hhmm.optional(),
  weekday: z.coerce.number().int().min(0).max(6).optional(),
  important: z.boolean().optional(),
  subject: z.string().max(40).optional()
}).superRefine((value, ctx) => {
  if (value.type === "orar") {
    if (value.weekday === undefined || value.weekday === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Orarul are nevoie de ziua săptămânii." });
    }
    return;
  }
  if (!value.date) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Data trebuie să fie în format YYYY-MM-DD." });
  }
});

const calendarPatchSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  important: z.boolean().optional(),
  time: hhmm.optional(),
  endTime: hhmm.optional(),
  weekday: z.coerce.number().int().min(0).max(6).optional(),
  subject: z.string().max(40).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

const deleteAccountSchema = z.object({
  confirm: z.literal("ȘTERGE", {
    errorMap: () => ({ message: "Scrie ȘTERGE ca să confirmi." })
  }),
  password: z.string().min(1, "Parola este obligatorie.")
});

const profileSchema = z.object({
  name: z.string().max(80).optional(),
  username: usernameField.optional(),
  phone: z.string().max(20).optional(),
  school: z.string().max(120).optional(),
  class: z.string().max(40).optional(),
  subject: z.string().max(80).optional(),
  profile: z.string().max(40).optional(),
  exam: z.string().max(40).optional(),
  dailyHours: z.string().max(20).optional(),
  parentEmail: optionalEmail,
  uiLanguage: z.string().max(8).optional(),
  language: z.string().max(8).optional(),
  theme: z.enum(["dark", "light", "system"]).optional(),
  textSize: z.enum(["normal", "large", "xlarge"]).optional(),
  readableFont: z.enum(["0", "1"]).optional(),
  motion: z.enum(["0", "1"]).optional(),
  hasCompletedOnboarding: z.boolean().optional()
});

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Parola actuală este obligatorie.").max(200, PASSWORD_MAX),
  newPassword: z.string().min(1, "Parola nouă este obligatorie.").max(200, PASSWORD_MAX)
});

const friendSettingsSchema = z.object({
  profilePrivate: z.boolean(),
  acceptFriendRequests: z.boolean()
});

const usernameCheckSchema = z.object({
  username: z.string().trim().min(1).max(40)
}).strict();

const friendRequestSchema = z.object({
  user_id: z.string().trim().min(4).max(40)
});

const friendRespondSchema = z.object({
  request_id: z.string().trim().min(4).max(80),
  action: z.enum(["accept", "decline"])
});

const dailyChallengeSchema = z.object({
  answers: z.array(z.object({
    id: z.string().trim().min(1).max(160),
    choice: z.number().int().min(0).max(7)
  }).strict()).max(5)
}).strict();

const enPhotoSchema = z.object({
  paper_id: z.string().trim().min(1).max(120),
  target: z.string().trim().min(1).max(80),
  image_base64: z.string().min(32).max(4000)
});

module.exports = {
  registerSchema,
  usernameCheckSchema,
  consentActionSchema,
  tokenSchema,
  parentEmailSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  chatSchema,
  detectSchema,
  inviteLinkSchema,
  unlinkSchema,
  claimSchema,
  buySchema,
  equipSchema,
  progressSchema,
  accessCodeRequestSchema,
  accessCodeVerifySchema,
  calendarEventSchema,
  calendarPatchSchema,
  deleteAccountSchema,
  profileSchema,
  passwordChangeSchema,
  friendSettingsSchema,
  friendRequestSchema,
  friendRespondSchema,
  enPhotoSchema,
  dailyChallengeSchema
};
