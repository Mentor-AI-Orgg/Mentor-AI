// Validare Zod la granița rutei. Înlocuiește verificările ad-hoc de
// `if (!x)` care lăsau câmpuri neașteptate să treacă mai departe în store.

function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body || {});
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      const field = Array.isArray(first?.path) ? first.path[0] : undefined;
      return res.status(400).json({
        error: first?.message || "Date invalide.",
        field: field !== undefined ? String(field) : undefined,
        code: "invalid_body"
      });
    }
    req.body = parsed.data;
    next();
  };
}

module.exports = { validateBody };
