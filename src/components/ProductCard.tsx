import { useState } from "react";
import type { Product } from "../App";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem } = useCart(); // ✅ include items to check duplicates

  // Ensure variants is always an array
  const variants: string[] = Array.isArray(product.variants)
    ? product.variants
    : JSON.parse(product.variants ?? "[]");

  const [selected, setSelected] = useState<string>(variants[0] ?? "");

  const handleAdd = () => {
    if (!product.inStock) return;

    // ✅ Check if item with selected variant already exists in cart
    const exists = items.some(
      (item) =>
        item.id === product.id && item.selectedVariant === selected
    );

    if (exists) {
      alert("This item is already in the cart!");
      return;
    }

    addItem({ ...product, selectedVariant: selected });
  };

  return (
    <article className="card">
      <div className="media">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="body">
        <h3 className="title">{product.name}</h3>
        <div className="price">${product.price.toFixed(2)}</div>

        {variants.length > 0 ? (
          <select
            className="variant"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        ) : (
          <div className="variant-label">Standard</div>
        )}

        <div className="stock-info">
          {product.inStock
            ? `In Stock: ${product.stock ?? "N/A"}`
            : "Out of Stock"}
        </div>

        <button
          className={`btn ${!product.inStock ? "disabled" : ""}`}
          onClick={handleAdd}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}
