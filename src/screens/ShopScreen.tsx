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
import { WzModal } from '../components/workzish/WzModal';

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
        <div className="px-4 py-5 space-y-5">
          <header className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
              <p className="text-sm text-gray-500 mt-1">Supplements, apparel & gym essentials</p>
            </div>
            <button
              type="button"
              onClick={() => setShowCart(true)}
              className="relative shrink-0 w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-card"
            >
              <ShoppingBag size={20} className="text-brand-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </header>

          <section className="wz-card !p-5 border-brand-200 bg-brand-50/50">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-brand-500" />
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Member Exclusive</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-2">10% Off Everything</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Member pricing applied automatically. Pick up at the front desk or protein bar.
            </p>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-brand-200/50">
              <MapPin size={14} className="text-brand-500 shrink-0" />
              <span className="text-xs font-semibold text-gray-700">In-gym pickup · Same day</span>
            </div>
          </section>

          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-300"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto scroll-area pb-1 -mx-1 px-1">
            {SHOP_CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

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
            <div className="wz-card text-center py-10">
              <Package size={28} className="text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-900">No products found</p>
              <p className="text-xs text-gray-500 mt-1">Try a different category or search term</p>
            </div>
          )}
        </div>
      </ScreenLayout>

      <WzModal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name ?? 'Product'} tall>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAdd={() => {
              addToCart(selectedProduct.id);
              setSelectedProduct(null);
            }}
          />
        )}
      </WzModal>

      <WzModal open={showCart} onClose={() => setShowCart(false)} title="Your Cart" tall>
        {cart.length === 0 ? (
          <div className="py-10 text-center">
            <ShoppingBag size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-900">Your cart is empty</p>
            <p className="text-xs text-gray-500 mt-1">Browse supplements & gear to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="wz-card !p-3.5">
                  <div className="flex gap-3">
                    <ProductThumb product={product} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm font-bold text-brand-600 mt-0.5">{formatPrice(product.memberPrice)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-brand-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Member total</span>
              <span className="text-2xl font-bold text-brand-600">{formatPrice(cartTotal)}</span>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed">
              Pay at pickup. Show your member ID at the front desk or protein bar.
            </p>

            <button type="button" onClick={handleCheckout} className="wz-btn-primary w-full py-3.5 text-sm">
              Place Order
            </button>
          </div>
        )}
      </WzModal>
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
    <div className="wz-card !p-0 overflow-hidden flex flex-col">
      <button type="button" onClick={onOpen} className="text-left flex-1">
        <ProductThumb product={product} />
        <div className="p-3.5 pt-3">
          {product.badge && (
            <span className="inline-block px-2 py-0.5 rounded-md bg-brand-50 border border-brand-200 text-brand-600 text-[9px] font-bold uppercase tracking-wide mb-2">
              {product.badge}
            </span>
          )}
          <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem]">{product.name}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-brand-600">{formatPrice(product.memberPrice)}</span>
            <span className="text-[10px] text-gray-400 line-through">{formatPrice(product.price)}</span>
          </div>
        </div>
      </button>
      <div className="px-3.5 pb-3.5">
        {product.inStock ? (
          <button
            type="button"
            onClick={onAdd}
            className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 wz-btn-primary"
          >
            <Plus size={14} /> Add
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="w-full py-2.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-400 border border-gray-200"
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
        className={`${size === 'md' ? 'absolute inset-0' : 'h-full w-full rounded-xl'} bg-gradient-to-br from-brand-50 via-white to-gray-50 flex items-center justify-center border-b border-gray-100`}
      >
        <Icon size={size === 'sm' ? 22 : 34} className="text-brand-400" />
      </div>
      {product.pickupOnly && size === 'md' && (
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 border border-gray-200 text-[9px] font-bold uppercase text-gray-500">
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
      <div className="h-40 rounded-2xl bg-gradient-to-br from-brand-50 via-white to-gray-50 border border-gray-200 flex items-center justify-center">
        <Icon size={48} className="text-brand-400" />
      </div>

      <div className="flex flex-wrap gap-2">
        {product.badge && (
          <span className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] font-bold uppercase">
            {product.badge}
          </span>
        )}
        <span className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase">
          {product.category}
        </span>
        {product.pickupOnly && (
          <span className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase">
            Gym Pickup
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

      <div className="wz-card !p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Member Price</p>
            <p className="text-3xl font-bold text-brand-600 mt-1">{formatPrice(product.memberPrice)}</p>
            <p className="text-xs text-gray-400 line-through mt-0.5">{formatPrice(product.price)}</p>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200">
            <Tag size={12} className="text-brand-500" />
            <span className="text-brand-600 text-[10px] font-bold uppercase">Save {formatPrice(savings)}</span>
          </div>
        </div>
      </div>

      {product.inStock ? (
        <button
          type="button"
          onClick={onAdd}
          className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 wz-btn-primary"
        >
          <ShoppingBag size={18} /> Add to Cart
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="w-full py-3.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-400 border border-gray-200"
        >
          Currently Unavailable
        </button>
      )}
    </div>
  );
}
