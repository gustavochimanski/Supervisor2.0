// utils/buildCategoryTree.ts
export interface CategoryApi {
  id: number;
  label: string;            
  slug: string;
  slug_pai: string | null;
  imagem?: string;
  href?: string;            
}

export interface CategoryNode {
  id: number;
  label: string;
  slug: string;
  imagem?: string;
  children: CategoryNode[];
}

export function buildCategoryTree(data: CategoryApi[]): CategoryNode[] {
  const map = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];

  data.forEach((cat) => {
    map.set(cat.slug, {
      id: cat.id,
      label: cat.label,      // ➌ usa label
      slug: cat.slug,
      imagem: cat.imagem,
      children: [],
    });
  });

  data.forEach((cat) => {
    const node = map.get(cat.slug)!;
    if (cat.slug_pai) {
      map.get(cat.slug_pai)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}
