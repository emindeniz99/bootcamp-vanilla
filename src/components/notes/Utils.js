// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/68141099#68141099
function uuidv4() {
  const a = crypto.getRandomValues(new Uint16Array(8));
  let i = 0;
  return "00-0-4-1-000".replace(/[^-]/g, (s) =>
    ((a[i++] + s * 0x10000) >> s).toString(16).padStart(4, "0")
  );
}
export { uuidv4 };
