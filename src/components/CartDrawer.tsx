import { useCart } from "../context/useCart";
import type { CartItem } from "../context/CartContext";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, clearCart, updateQuantity, updateVariant } = useCart();

  if (!open) return null;

  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price * (item.quantity ?? 1)),
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className={`cart-overlay ${open ? "show" : ""}`} onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </header>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            {/* Clear Cart */}
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>

            {/* Scrollable items */}
            <div className="cart-items">
              {items.map((item: CartItem) => {
                const variants: string[] = Array.isArray(item.variants)
                  ? item.variants
                  : JSON.parse(item.variants ?? "[]");

                return (
                  <div key={item.id + (item.selectedVariant ?? "Standard")} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>

                      {variants.length > 0 && (
                        <select
                          className="variant-select"
                          value={item.selectedVariant}
                          onChange={(e) => updateVariant(item, e.target.value)}
                        >
                          {variants.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      )}

                      <div className="qty-price">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item, parseInt(e.target.value) || 1)
                          }
                        />
                        <span className="item-total">
                          ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                        </span>
                      </div>

                      <button className="remove-btn" onClick={() => removeItem(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
