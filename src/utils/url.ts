export function getImagemProxyUrl(url: string) {
  try {
    const path = new URL(url).pathname; // → /categorias/xyz.jpg
    return `/imagens${path}`;           // → /imagens/categorias/xyz.jpg
  } catch (e) {
    return "/placeholder.png";          // fallback em caso de erro
  }
}
