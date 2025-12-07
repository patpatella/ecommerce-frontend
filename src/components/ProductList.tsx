import ProductCard from "./ProductCard";
import type { Product } from "../App";

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <div className="empty">No products found.</div>;
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
