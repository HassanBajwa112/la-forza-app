import { useMemo, useState } from 'react';
import {
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  Package,
  Shirt,
  Dumbbell,
  Pill,
  Sparkles,
  MapPin,
  Tag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SHOP_CATEGORIES,
  SHOP_PRODUCTS,
  formatPrice,
  type ShopCategory,
  type ShopProduct,
} from '../data/mockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { AnimatedModal } from '../components/motion/Transitions';
import { Stagger, StaggerItem, Pressable } from '../components/motion';

const categoryIcons = {
  supplements: Pill,
  apparel: Shirt,
  accessories: Package,
  equipment: Dumbbell,
} as const;

export function ShopScreen() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getProductById,
    showToast,
  } = useApp();

  const [category, setCategory] = useState<ShopCategory>('all');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHOP_PRODUCTS.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    clearCart();
    setShowCart(false);
    showToast('Order placed — pick up at front desk');
  };

  return (
    <div className="relative h-full min-h-0 flex flex-col">
      <ScreenLayout>
        <Stagger className="px-5 pb-6">
          <StaggerItem>
            <header className="pt-4 pb-4 flex items-start justify-between gap-3">
              <div>
                <h1 className="screen-header">Shop</h1>
                <p className="screen-subtitle">Supplements, apparel & gym essentials</p>
              </div>
              <Pressable
                type="button"
                onClick={() => setShowCart(true)}
                className="relative shrink-0 w-11 h-11 rounded-xl bg-forza-elevated border border-forza-border flex items-center justify-center"
              >
                <ShoppingBag size={20} className="text-forza-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-forza-red text-forza-white text-[10px] font-bold flex items-center justify-center shadow-glow">
                    {cartCount}
                  </span>
                )}
              </Pressable>
            </header>
          </StaggerItem>

          <StaggerItem>
            <section className="hero-panel mb-5">
              <div className="hero-panel-inner">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-forza-red" />
                  <span className="label-caps">Member Exclusive</span>
                </div>
                <p className="font-display text-2xl font-bold text-forza-white uppercase tracking-wide mt-2 leading-tight">
                  10% Off Everything
                </p>
                <p className="text-forza-muted text-xs mt-2 leading-relaxed">
                  Member pricing applied automatically. Pick up at the front desk or protein bar.
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-forza-border">
                  <MapPin size={14} className="text-forza-red shrink-0" />
                  <span className="text-forza-white text-xs font-semibold">In-gym pickup · Same day</span>
                </div>
              </div>
            </section>
          </StaggerItem>

          <StaggerItem>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forza-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-forza-border bg-forza-elevated/80 py-3 pl-10 pr-4 text-sm text-forza-white placeholder:text-forza-muted focus:outline-none focus:border-forza-red/40"
              />
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex gap-2 overflow-x-auto scroll-area pb-1 mb-5 -mx-1 px-1">
              {SHOP_CATEGORIES.map((cat) => {
                const active = category === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide border transition-colors ${
                      active
                        ? 'bg-forza-red border-forza-red text-forza-white shadow-glow'
                        : 'bg-forza-elevated border-forza-border text-forza-muted'
                    }`}
                  >
                    {cat.label}
                  </Pressable>
                );
              })}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={() => setSelectedProduct(product)}
                  onAdd={() => addToCart(product.id)}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="surface-card p-8 text-center">
                <Package size={28} className="text-forza-muted mx-auto mb-3" />
                <p className="text-forza-white text-sm font-semibold">No products found</p>
                <p className="text-forza-muted text-xs mt-1">Try a different category or search term</p>
              </div>
            )}
          </StaggerItem>
        </Stagger>
      </ScreenLayout>

      <AnimatedModal
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name ?? 'Product'}
        tall
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAdd={() => {
              addToCart(selectedProduct.id);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatedModal>

      <AnimatedModal open={showCart} onClose={() => setShowCart(false)} title="Your Cart" tall>
        {cart.length === 0 ? (
          <div className="py-10 text-center">
            <ShoppingBag size={32} className="text-forza-muted mx-auto mb-3" />
            <p className="text-forza-white text-sm font-semibold">Your cart is empty</p>
            <p className="text-forza-muted text-xs mt-1">Browse supplements & gear to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="surface-card p-3.5">
                  <div className="flex gap-3">
                    <ProductThumb product={product} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-forza-white text-sm font-semibold truncate">{product.name}</p>
                      <p className="text-forza-red text-sm font-bold mt-0.5">
                        {formatPrice(product.memberPrice)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 rounded-lg bg-forza-elevated border border-forza-border p-1">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-forza-muted"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-forza-white text-sm font-semibold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-forza-muted"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-forza-muted hover:text-forza-red transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="divider-brand" />

            <div className="flex justify-between items-center">
              <span className="text-forza-muted text-sm">Member total</span>
              <span className="font-display text-2xl font-bold text-forza-red">{formatPrice(cartTotal)}</span>
            </div>

            <p className="text-forza-muted text-[11px] leading-relaxed">
              Pay at pickup. Show your member ID at the front desk or protein bar.
            </p>

            <Pressable type="button" onClick={handleCheckout} className="w-full py-3.5 rounded-xl btn-primary text-sm">
              Place Order
            </Pressable>
          </div>
        )}
      </AnimatedModal>
    </div>
  );
}

function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: ShopProduct;
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="surface-card overflow-hidden flex flex-col">
      <button type="button" onClick={onOpen} className="text-left flex-1">
        <ProductThumb product={product} />
        <div className="p-3.5 pt-3">
          {product.badge && (
            <span className="inline-block px-2 py-0.5 rounded-md bg-forza-red/15 border border-forza-red/25 text-forza-red text-[9px] font-bold uppercase tracking-wide mb-2">
              {product.badge}
            </span>
          )}
          <p className="text-forza-white text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-forza-red text-sm font-bold">{formatPrice(product.memberPrice)}</span>
            <span className="text-forza-muted text-[10px] line-through">{formatPrice(product.price)}</span>
          </div>
        </div>
      </button>
      <div className="px-3.5 pb-3.5">
        {product.inStock ? (
          <Pressable
            type="button"
            onClick={onAdd}
            className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 btn-primary"
          >
            <Plus size={14} /> Add
          </Pressable>
        ) : (
          <button
            type="button"
            disabled
            className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide bg-forza-elevated text-forza-muted border border-forza-border"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

function ProductThumb({ product, size = 'md' }: { product: ShopProduct; size?: 'sm' | 'md' }) {
  const Icon = categoryIcons[product.category];
  const height = size === 'sm' ? 'h-14 w-14' : 'h-[7.5rem]';

  return (
    <div className={`relative ${size === 'md' ? 'w-full' : height} ${size === 'md' ? height : ''} shrink-0`}>
      <div
        className={`${size === 'md' ? 'absolute inset-0' : 'h-full w-full rounded-xl'} bg-gradient-to-br from-forza-elevated via-forza-surface to-forza-ink flex items-center justify-center border-b border-forza-border`}
      >
        <Icon size={size === 'sm' ? 22 : 34} className="text-forza-red/80" />
      </div>
      {product.pickupOnly && size === 'md' && (
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-forza-ink/80 border border-forza-border text-[9px] font-bold uppercase text-forza-muted">
          Pickup
        </span>
      )}
    </div>
  );
}

function ProductDetail({ product, onAdd }: { product: ShopProduct; onAdd: () => void }) {
  const Icon = categoryIcons[product.category];
  const savings = product.price - product.memberPrice;

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-2xl bg-gradient-to-br from-forza-elevated via-forza-surface to-forza-ink border border-forza-border flex items-center justify-center">
        <Icon size={48} className="text-forza-red/80" />
      </div>

      <div className="flex flex-wrap gap-2">
        {product.badge && (
          <span className="px-2.5 py-1 rounded-full bg-forza-red/15 border border-forza-red/25 text-forza-red text-[10px] font-bold uppercase">
            {product.badge}
          </span>
        )}
        <span className="px-2.5 py-1 rounded-full bg-forza-elevated border border-forza-border text-forza-muted text-[10px] font-bold uppercase">
          {product.category}
        </span>
        {product.pickupOnly && (
          <span className="px-2.5 py-1 rounded-full bg-forza-elevated border border-forza-border text-forza-muted text-[10px] font-bold uppercase">
            Gym Pickup
          </span>
        )}
      </div>

      <p className="text-forza-muted text-sm leading-relaxed">{product.description}</p>

      <div className="surface-card p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="label-caps-muted">Member Price</p>
            <p className="font-display text-3xl font-bold text-forza-red mt-1">{formatPrice(product.memberPrice)}</p>
            <p className="text-forza-muted text-xs line-through mt-0.5">{formatPrice(product.price)}</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forza-red/10 border border-forza-red/20">
              <Tag size={12} className="text-forza-red" />
              <span className="text-forza-red text-[10px] font-bold uppercase">Save {formatPrice(savings)}</span>
            </div>
          </div>
        </div>
      </div>

      {product.inStock ? (
        <Pressable
          type="button"
          onClick={onAdd}
          className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 btn-primary"
        >
          <ShoppingBag size={18} /> Add to Cart
        </Pressable>
      ) : (
        <button
          type="button"
          disabled
          className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide bg-forza-elevated text-forza-muted border border-forza-border"
        >
          Currently Unavailable
        </button>
      )}
    </div>
  );
}
