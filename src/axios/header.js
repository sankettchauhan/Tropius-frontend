export default function header(token) {
  return { headers: { "x-auth-token": token } };
}
