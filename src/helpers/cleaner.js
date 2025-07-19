// 1) corrige mojibake com try/catch
function fixEncoding(str) {
  try {
    const pct = Array.from(str, (c) => {
      const code = c.charCodeAt(0);
      return code <= 0xff ? "%" + code.toString(16).padStart(2, "0") : c;
    }).join("");
    return decodeURIComponent(pct);
  } catch {
    return str;
  }
}

// 2) só corrige strings que realmente parecem mojibake
function maybeFix(str) {
  return /�|Ã[\xA0-\xFF]/.test(str) ? fixEncoding(str) : str;
}

// 3) extração “robusta” do nome do curso
function extractCourseName(str) {
  // tira “Verbo Jurídico – ”
  let s = str.replace(/^Verbo Jurídico\s*-\s*/i, "");

  // tenta capturar entre “PÓS-GRADUAÇÃO EM” e o sufixo (“a distância” real, “a dist�ncia” quebrado ou “EAD”)
  const m = s.match(/PÓS-GRADUAÇÃO EM\s+(.+?)(?=\s+(?:a\s+dist\S*|EAD)|$)/i);
  if (m) return m[1].trim();

  // fallback genérico:
  s = s
    .replace(/P[oó]s[-\s]?Gradua(?:ção)?(?:\s+em)?\s*/i, "")
    .replace(/\s+(?:a\s+dist\S*|EAD)$/i, "")
    .trim();
  return s;
}

// 4) composição final, sem mais “malformed URI” e sem sufixos estranhos
export const getCourseName = (title) => {
  const fixed = maybeFix(title);
  return extractCourseName(fixed);
};
