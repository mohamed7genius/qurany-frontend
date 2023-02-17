export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "errors.emailError";
  if (!re.test(email)) return "errors.invalidEmailError";
  return "";
}
