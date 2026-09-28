const STORAGE_KEYS = {
  products: 'global-social-products',
  cart: 'global-social-cart',
  orders: 'global-social-orders',
};

const sampleProducts = [
  {
    id: 101,
    name: 'Smart Home Kit',
    category: 'Electronics',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    description: 'Connected smart plug, speaker, and app-enabled automation bundle for modern homes.',
    featured: true,
  },
  {
    id: 102,
    name: 'Premium Knit Set',
    category: 'Fashion',
    price: 64.0,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    description: 'A premium casual layering outfit designed for comfort and everyday style.',
    featured: true,
  },
  {
    id: 103,
    name: 'Glow Serum',
    category: 'Beauty',
    price: 29.5,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    description: 'Hydrating glow serum with vitamin-rich ingredients for smooth, radiant skin.',
    featured: true,
  },
  {
    id: 104,
    name: 'Portable Blender',
    category: 'Home',
    price: 41.75,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    description: 'Compact personal blender perfect for quick smoothie and protein mixes on the go.',
    featured: true,
  },
  {
    id: 105,
    name: 'Learning Robot',
    category: 'Toys',
    price: 76.5,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80',
    description: 'Interactive robot toy for kids that teaches logic, colors, and voice prompts.',
    featured: true,
  },
  {
    id: 106,
    name: 'Travel Organizer Kit',
    category: 'Accessories',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
    description: 'Multiple compartments for tech accessories, travel essentials, and daily carry.',
    featured: false,
  },
  {
    id: 107,
    name: 'Desk Lamp Pro',
    category: 'Home',
    price: 52.0,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description: 'Minimalist adjustable desk lamp with warm-to-cool lighting modes.',
    featured: false,
  },
  {
    id: 108,
    name: 'Urban Sling Bag',
    category: 'Accessories',
    price: 39.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Lightweight everyday sling bag for commuting, city travel, and casual styling.',
    featured: false,
  },
];

const categories = [
  { name: 'Toys', icon: '🧸' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home', icon: '🏠' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Accessories', icon: '🎒' },
];

const formatMoney = (value) => `$${Number(value).toFixed(2)}`;

function loadProducts() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || 'null');
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(sampleProducts));
  return sampleProducts;
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}

function loadCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
}

function loadOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.orders) || '[]');
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
}

function getProductById(productId) {
  return loadProducts().find((product) => product.id === Number(productId));
}

function renderCategories() {
  const categoryGrid = document.getElementById('categoryGrid');
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories
    .map(
      (category) => `
        <button class="category-card" data-category="${category.name}">
          <div class="category-icon">${category.icon}</div>
          <h3>${category.name}</h3>
          <p>Browse ${category.name.toLowerCase()} picks</p>
        </button>
      `
    )
    .join('');

  categoryGrid.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
      const value = card.dataset.category;
      document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.category === value || (value === 'all' && btn.dataset.category === 'all'));
      });
      renderProducts(value);
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderFilters() {
  const filterContainer = document.getElementById('productFilters');
  if (!filterContainer) return;

  const uniqueCategories = [...new Set(loadProducts().map((product) => product.category))];
  const buttons = ['all', ...uniqueCategories]
    .map(
      (category) => `
        <button class="filter-btn ${category === 'all' ? 'active' : ''}" data-category="${category}">
          ${category === 'all' ? 'All' : category}
        </button>
      `
    )
    .join('');

  filterContainer.innerHTML = buttons;

  filterContainer.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.category;
      filterContainer.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.category === selected);
      });
      renderProducts(selected);
    });
  });
}

function renderProducts(category = 'all') {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  const allProducts = loadProducts();
  const filteredProducts = category === 'all' ? allProducts : allProducts.filter((p) => p.category === category);

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <div class="product-meta">
              <span class="product-tag">${product.featured ? 'Featured' : 'New'}</span>
              <span class="product-category">${product.category}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
              <span class="price">${formatMoney(product.price)}</span>
              <button class="add-to-cart" data-product-id="${product.id}">Add to cart</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  productGrid.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.productId));
  });
}

function addToCart(productId) {
  const cart = loadCart();
  const existing = cart.find((item) => item.productId === Number(productId));

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId: Number(productId), quantity: 1 });
  }

  saveCart(cart);
  updateCartUI();
}

function removeFromCart(productId) {
  const cart = loadCart().filter((item) => item.productId !== Number(productId));
  saveCart(cart);
  updateCartUI();
}

function changeQuantity(productId, delta) {
  const cart = loadCart();
  const item = cart.find((entry) => entry.productId === Number(productId));
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const subtotalValue = document.getElementById('subtotalValue');

  const cart = loadCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalQuantity;

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    if (subtotalValue) subtotalValue.textContent = formatMoney(0);
    return;
  }

  const mappedItems = cart.map((item) => {
    const product = getProductById(item.productId);
    if (!product) return null;
    return {
      ...item,
      product,
      total: product.price * item.quantity,
    };
  }).filter(Boolean);

  const subtotal = mappedItems.reduce((sum, item) => sum + item.total, 0);

  cartItems.innerHTML = mappedItems
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.name}" />
          <div>
            <h4>${item.product.name}</h4>
            <div class="qty-controls">
              <button data-action="decrease" data-id="${item.product.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.product.id}">+</button>
            </div>
          </div>
          <div class="item-price">${formatMoney(item.total)}</div>
        </div>
      `
    )
    .join('');

  if (subtotalValue) subtotalValue.textContent = formatMoney(subtotal);

  cartItems.querySelectorAll('[data-action]').forEach((button) => {
    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    button.addEventListener('click', () => {
      if (action === 'increase') changeQuantity(id, 1);
      if (action === 'decrease') changeQuantity(id, -1);
    });
  });
}

function placeOrder(formData) {
  const cart = loadCart();
  if (!cart.length) return;

  const products = loadProducts();
  const orderItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: `GS-${String(Date.now()).slice(-5)}`,
    date: new Date().toISOString(),
    customer: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    payment: formData.payment,
    status: 'Pending',
    total,
    items: orderItems,
  };

  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);

  localStorage.removeItem(STORAGE_KEYS.cart);
  updateCartUI();
  if (document.getElementById('checkoutModal')) {
    document.getElementById('checkoutModal').classList.add('hidden');
  }

  alert(`Order placed successfully! Your order ID is ${order.id}`);
}

function renderTracking() {
  const input = document.getElementById('trackingInput');
  const button = document.getElementById('trackingButton');
  const result = document.getElementById('trackingResult');

  if (!button || !result || !input) return;

  button.addEventListener('click', () => {
    const value = input.value.trim();
    const orders = loadOrders();
    const order = orders.find((entry) => entry.id.toLowerCase() === value.toLowerCase());

    if (!order) {
      result.className = 'tracking-result empty';
      result.textContent = 'No order found for this ID. Please check the order number and try again.';
      return;
    }

    const statusClass = order.status.toLowerCase().includes('shipped')
      ? 'status-ship'
      : order.status.toLowerCase().includes('pending')
        ? 'status-pending'
        : 'status-pill';

    result.className = 'tracking-result';
    result.innerHTML = `
      <div><strong>Order ID:</strong> ${order.id}</div>
      <div><strong>Customer:</strong> ${order.customer}</div>
      <div><strong>Total:</strong> ${formatMoney(order.total)}</div>
      <div><strong>Payment:</strong> ${order.payment}</div>
      <div><strong>Address:</strong> ${order.address}</div>
      <div class="status-pill ${statusClass}">${order.status}</div>
      <div><strong>Items:</strong> ${order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}</div>
    `;
  });
}

function initCheckoutModal() {
  const cartButton = document.getElementById('cartButton');
  const closeCart = document.getElementById('closeCart');
  const cartDrawer = document.getElementById('cartDrawer');
  const checkoutButton = document.getElementById('checkoutButton');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckout = document.getElementById('closeCheckout');
  const checkoutForm = document.getElementById('checkoutForm');

  if (cartButton) {
    cartButton.addEventListener('click', () => cartDrawer?.classList.add('open'));
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => cartDrawer?.classList.remove('open'));
  }

  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (loadCart().length === 0) {
        alert('Your cart is empty. Add products before checkout.');
        return;
      }
      cartDrawer?.classList.remove('open');
      checkoutModal?.classList.remove('hidden');
    });
  }

  if (closeCheckout) {
    closeCheckout.addEventListener('click', () => checkoutModal?.classList.add('hidden'));
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(checkoutForm).entries());
      placeOrder(formData);
    });
  }
}

function renderAdminDashboard() {
  const inventoryStats = document.getElementById('inventoryStats');
  if (!inventoryStats) return;

  const products = loadProducts();
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const orders = loadOrders();

  inventoryStats.innerHTML = `
    <div class="stat-item">
      <span>Total products</span>
      <strong>${totalProducts}</strong>
    </div>
    <div class="stat-item">
      <span>Inventory value</span>
      <strong>${formatMoney(totalValue)}</strong>
    </div>
    <div class="stat-item">
      <span>Orders received</span>
      <strong>${orders.length}</strong>
    </div>
  `;

  const adminProductList = document.getElementById('adminProductList');
  if (adminProductList) {
    adminProductList.innerHTML = products
      .map(
        (product) => `
          <div class="admin-product-row">
            <div>
              <h4>${product.name}</h4>
              <small>${product.category}</small>
            </div>
            <div>${formatMoney(product.price)}</div>
            <div>${product.featured ? 'Featured' : 'Standard'}</div>
            <div class="product-actions">
              <button class="action-btn" data-edit="${product.id}">Edit</button>
              <button class="action-btn delete" data-delete="${product.id}">Delete</button>
            </div>
          </div>
        `
      )
      .join('');

    adminProductList.querySelectorAll('[data-edit]').forEach((button) => {
      button.addEventListener('click', () => {
        const product = getProductById(button.dataset.edit);
        if (!product) return;
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description;
      });
    });

    adminProductList.querySelectorAll('[data-delete]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.delete);
        const updated = loadProducts().filter((product) => product.id !== id);
        saveProducts(updated);
        renderAdminDashboard();
        renderProducts();
        renderFilters();
      });
    });
  }

  const adminOrders = document.getElementById('adminOrders');
  if (adminOrders) {
    if (!orders.length) {
      adminOrders.innerHTML = '<div class="empty-cart">No orders yet.</div>';
      return;
    }

    adminOrders.innerHTML = orders
      .map(
        (order) => `
          <div class="order-row">
            <div>
              <h4>${order.id}</h4>
              <small>${order.customer}</small>
            </div>
            <div>${order.payment}</div>
            <div>${formatMoney(order.total)}</div>
            <div class="order-actions">
              <select data-order-status="${order.id}">
                <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              </select>
            </div>
          </div>
        `
      )
      .join('');

    adminOrders.querySelectorAll('[data-order-status]').forEach((select) => {
      select.addEventListener('change', (event) => {
        const ordersList = loadOrders();
        const targetId = event.target.dataset.orderStatus;
        const found = ordersList.find((order) => order.id === targetId);
        if (!found) return;
        found.status = event.target.value;
        saveOrders(ordersList);
        renderAdminDashboard();
      });
    });
  }
}

function handleProductForm() {
  const form = document.getElementById('productForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('productId').value;
    const products = loadProducts();
    const payload = {
      id: id ? Number(id) : Date.now(),
      name: document.getElementById('productName').value.trim(),
      category: document.getElementById('productCategory').value,
      price: Number(document.getElementById('productPrice').value),
      image: document.getElementById('productImage').value.trim(),
      description: document.getElementById('productDescription').value.trim(),
      featured: true,
    };

    if (id) {
      const index = products.findIndex((product) => product.id === Number(id));
      if (index >= 0) products[index] = payload;
    } else {
      products.unshift(payload);
    }

    saveProducts(products);
    form.reset();
    renderAdminDashboard();
    renderProducts();
    renderFilters();
  });

  document.getElementById('resetProductForm')?.addEventListener('click', () => form.reset());
}

function init() {
  renderCategories();
  renderFilters();
  renderProducts();
  updateCartUI();
  renderTracking();
  initCheckoutModal();
  renderAdminDashboard();
  handleProductForm();
}

document.addEventListener('DOMContentLoaded', init);

window.GLOBAL_SOCIAL = {
  loadProducts,
  saveProducts,
  loadOrders,
  saveOrders,
};

if (typeof window !== 'undefined' && window.location.pathname.includes('admin.html')) {
  const products = loadProducts();
  if (!products.length) {
    saveProducts(sampleProducts);
  }
}

if (typeof window !== 'undefined' && !window.location.pathname.includes('admin.html')) {
  const products = loadProducts();
  if (!products.length) {
    saveProducts(sampleProducts);
  }
}
