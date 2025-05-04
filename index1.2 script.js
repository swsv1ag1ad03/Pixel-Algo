<script>
let cartItems = [];

function updateCart() {
  const cartTableBody = document.querySelector('.cart tbody');
  cartTableBody.innerHTML = '';
  let totalPrice = 0;
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity" />
      </td>
      <td>${item.price} ₽</td>
      <td>${itemTotal} ₽</td>
      <td><button class="remove-item" data-index="${index}">Удалить</button></td>
    `;
    cartTableBody.appendChild(row);
  });
  document.getElementById('total-price').textContent = totalPrice;
}

// Добавление товара
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('.price').textContent);
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }
    updateCart();
  });
});

// Изменение количества или удаление товара
document.querySelector('.cart tbody').addEventListener('input', function(e) {
  if (e.target.classList.contains('item-quantity')) {
    const index = e.target.dataset.index;
    cartItems[index].quantity = parseInt(e.target.value);
    updateCart();
  }
});
document.querySelector('.cart tbody').addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-item')) {
    const index = e.target.dataset.index;
    cartItems.splice(index, 1);
    updateCart();
  }
});
</script>

