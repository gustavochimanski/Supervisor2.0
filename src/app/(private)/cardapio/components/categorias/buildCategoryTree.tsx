// utils/buildCategoryTree.ts

// Define o formato dos dados de entrada (vindo da API)
export interface CategoryApi {
  id: number;
  label: string;            // Nome legível da categoria
  slug: string;             // Identificador único para URL
  slug_pai: string | null;  // Slug do pai (ou null se for raiz)
  imagem?: string;          // URL da imagem da categoria (opcional)
  href?: string;            // Link customizado (opcional)
}

// Define o formato da árvore gerada
export interface CategoryNode {
  id: number;               // Mesmo ID do CategoryApi
  label: string;            // Nome legível (reaproveitando label)
  slug: string;             // Mesmo slug do CategoryApi
  imagem?: string;          // URL da imagem (opcional)
  children: CategoryNode[]; // Lista de nós filhos
}

/**
 * Constrói uma estrutura de árvore a partir de uma lista plana de categorias.
 * Cada item CategoryApi é transformado em CategoryNode e ligado ao seu pai.
 *
 * @param data - Array de CategoryApi vindo da API
 * @returns Array de nós raiz (CategoryNode[])
 */
export function buildCategoryTree(data: CategoryApi[]): CategoryNode[] {
  // Mapa auxiliar para acessar nós existentes por slug
  const map = new Map<string, CategoryNode>();
  // Lista de nós de nível raiz (sem pai)
  const roots: CategoryNode[] = [];

  // 1️⃣ Primeiro passo: criar todos os nós sem definir hierarquia
  data.forEach((cat) => {
    map.set(cat.slug, {
      id: cat.id,
      label: cat.label,      // usa label direto do CategoryApi
      slug: cat.slug,
      imagem: cat.imagem,
      children: [],          // inicializa lista de filhos vazia
    });
  });

  // 2️⃣ Segundo passo: ligar cada nó ao seu pai ou adicioná-lo às raízes
  data.forEach((cat) => {
    const node = map.get(cat.slug)!;    // recupera o nó recém-criado
    if (cat.slug_pai) {
      // Se existir slug_pai, adiciona este node como filho do parent
      map.get(cat.slug_pai)?.children.push(node);
    } else {
      // Caso contrário, é nó raiz
      roots.push(node);
    }
  });

  // 3️⃣ Retorna apenas os nós de topo
  return roots;
}
