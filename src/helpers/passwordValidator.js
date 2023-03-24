export function passwordValidator(password) {
  if (!password) return "errors.passwordError";
  if (password.length < 5) return "errors.invalidPasswordError";
  return "";
}
