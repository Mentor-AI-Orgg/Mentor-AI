const { z } = require("zod");

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
  email,
  password: z.string({ required_error: "Parola este obligatorie." }).min(1).max(200),
  role: z.enum(["student", "parent", "teacher"]).optional().default("student"),
  invite_code: z.string().max(80).optional().default(""),
  name: z.string().max(80).optional().default(""),
  username: z.string().max(40).optional().default(""),
  phone: z.string().max(20).optional().default(""),
  school: z.string().max(120).optional().default(""),
  class: z.string().max(40).optional().default(""),
  subject: z.string().max(80).optional().default(""),
  parentEmail: optionalEmail,
  teacherEmail: optionalEmail,
  parental_consent: z.boolean().optional().default(false),
  privacy_accepted: z.boolean().optional().default(false)
});

const loginSchema = z.object({
  email: z.string().trim().min(1, "Emailul și parola sunt obligatorii.").max(254),
  password: z.string().min(1, "Emailul și parola sunt obligatorii.").max(200)
});

const forgotPasswordSchema = z.object({
  email: z.string().trim().max(254).optional().default("")
});

const chatSchema = z.object({
  message: z
    .string({ required_error: "Câmpul 'message' este obligatoriu." })
    .trim()
    .min(1, "Câmpul 'message' este obligatoriu.")
    .max(8000, "Mesajul este prea lung."),
  subject: z.string().max(80).optional().default("matematica"),
  class_level: z.union([z.string(), z.number()]).optional().default(8),
  language: z.string().max(8).optional().default("ro"),
  plan_id: z.string().max(20).optional().default("free"),
  conversation_id: z.string().max(80).optional(),
  image_base64: z.string().max(7_000_000).optional().default("")
});

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
  note: z.string().max(200).optional().default(""),
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
  confirm: z.literal("DELETE", {
    errorMap: () => ({ message: "Pentru a șterge contul, trimite { \"confirm\": \"DELETE\" }." })
  })
});

const profileSchema = z.object({
  name: z.string().max(80).optional(),
  username: z.string().max(40).optional(),
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
  hasCompletedOnboarding: z.boolean().optional()
});

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Parola actuală este obligatorie.").max(200),
  newPassword: z.string().min(1, "Parola nouă este obligatorie.").max(200)
});

const friendSettingsSchema = z.object({
  profilePrivate: z.boolean(),
  acceptFriendRequests: z.boolean()
});

const friendRequestSchema = z.object({
  user_id: z.string().trim().min(4).max(40)
});

const friendRespondSchema = z.object({
  request_id: z.string().trim().min(4).max(80),
  action: z.enum(["accept", "decline"])
});

const enPhotoSchema = z.object({
  paper_id: z.string().trim().min(1).max(120),
  target: z.string().trim().min(1).max(80),
  image_base64: z.string().min(32).max(7_000_000)
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
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
  enPhotoSchema
};
