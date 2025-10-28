// Dropdown menu functionality - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
  const productsDropdown = document.getElementById('productsDropdown');
  const productsMenu = document.getElementById('productsMenu');
  const dropdownContainer = productsDropdown ? productsDropdown.closest('.dropdown') : null;

  console.log('Dropdown elements:', { productsDropdown, productsMenu, dropdownContainer });

  if (productsDropdown && productsMenu && dropdownContainer) {
    // Toggle dropdown on click
    productsDropdown.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isShowing = productsMenu.classList.contains('show');
      console.log('Dropdown clicked, currently showing:', isShowing);
      
      if (isShowing) {
        productsMenu.classList.remove('show');
        dropdownContainer.classList.remove('active');
      } else {
        productsMenu.classList.add('show');
        dropdownContainer.classList.add('active');
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdownContainer.contains(e.target)) {
        productsMenu.classList.remove('show');
        dropdownContainer.classList.remove('active');
      }
    });

    // Prevent dropdown from closing when clicking inside menu
    productsMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  } else {
    console.error('Dropdown elements not found!');
  }
});

// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.indicator-dot');

if (slides.length > 0) {
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  setInterval(nextSlide, 4000);
}

// === CART FUNCTIONALITY WITH PERSISTENT STORAGE ===
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error loading cart:', e);
      cart = [];
    }
  }
  updateCart();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

const cartItemsElement = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const checkoutForm = document.getElementById('checkoutForm');
const cancelButton = document.getElementById('cancelButton');
const toast = document.getElementById('cartToast');

function addToCart(product) {
  cart.push(product);
  saveCart(); // Save to localStorage
  updateCart();
  showToast();
}

function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function buyNow(product) {
  addToCart(product);
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}

function updateCart() {
  if (!cartItemsElement || !cartCountElement) return;

  // Reload cart from localStorage to ensure we have latest data
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  cartItemsElement.innerHTML = '';

  if (cart.length === 0) {
    cartItemsElement.innerHTML = '<p style="text-align: center; color: #666666; padding: 2rem;">Your bag is empty</p>';
  } else {
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.style.display = 'flex';
      div.style.justifyContent = 'space-between';
      div.style.alignItems = 'center';
      div.style.marginBottom = '8px';

      div.innerHTML = `
        <span>${item.name}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600;">₱${item.price}</span>
          <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">Remove</button>
        </div>
      `;

      cartItemsElement.appendChild(div);
      total += parseFloat(item.price);
    });

    // Display total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.style = 'text-align: right; font-weight: 700; margin-top: 10px; border-top: 2px solid #e0e0e0; padding-top: 10px;';
    totalDiv.innerHTML = `Total: ₱${total.toFixed(2)}`;
    cartItemsElement.appendChild(totalDiv);

    // Add remove functionality
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeItem(index);
      });
    });
  }

  cartCountElement.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart(); // Save to localStorage after removing
  updateCart();
}

// Handle "Add to Bag" and "Buy Now" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    addToCart({ name: product, price: price });
  });
});

document.querySelectorAll('.buy-now').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    buyNow({ name: product, price: price });
  });
});

// Checkout form
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    alert(`Order placed!\n\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment Method: ${paymentMethod}\n\nThank you for your order!`);

    cart.length = 0;
    saveCart(); // Clear localStorage
    updateCart();
    checkoutForm.reset();

    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
  });
}

// Cancel order
if (cancelButton) {
  cancelButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your shopping bag?')) {
      cart.length = 0;
      saveCart(); // Clear localStorage
      updateCart();
      checkoutForm.reset();

      const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
      cartModal.hide();
    }
  });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === '') {
    alert('Please enter a search term');
    return;
  }
  
  // Redirect to search page with query parameter
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// Initialize cart on page load
loadCart();

