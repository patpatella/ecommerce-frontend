import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartProvider";
import { useCart } from "./context/useCart";
import CartDrawer from "./components/CartDrawer";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  variants?: string[] | null;
  inStock: boolean;
  stock?: number;
}

const API_URL =
  (import.meta.env.VITE_API_URL as string);

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");

  const { items } = useCart(); //get cart state
  const [cartOpen, setCartOpen] = useState(false); // drawer toggle

  useEffect(() => {
    const q = category ? `?category=${encodeURIComponent(category)}` : "";
    fetch(`${API_URL}/products${q}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
  }, [category]);

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Trends</h1>

          <div className="controls">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Products</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
            </select>

            {/* Cart icon */}
            <button
              className="cart-btn"
              aria-label="View Cart"
              onClick={() => setCartOpen(true)}
            >
              🛒
              {items.length > 0 && (
                <span className="cart-count">{items.length}</span>
              )}
            </button>
          </div>
        </header>

        <main>
          <ProductList products={products} />
        </main>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
