document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cart-button");
    const modal = document.getElementById("cart-modal");
    const span = document.getElementsByClassName("close")[0];
    const cartItems = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const finalizeOrderButton = document.getElementById("finalize-order");
    const addressInput = document.getElementById("address");
    const tableNumberInput = document.getElementById("table-number");
    const paymentForm = document.getElementById("payment-form");

    let subtotal = 0;
    let cartItemsList = [];

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const item = button.parentElement;
            const itemName = item.querySelector("h3").innerText;
            const itemPrice = parseFloat(item.querySelector("span").innerText.replace('R$', '').replace(',', '.'));

            subtotal += itemPrice;
            cartItemsList.push({ name: itemName, price: itemPrice });
            updateCart();

            // Adiciona a classe shake ao botão do carrinho
            cartButton.classList.add('shake');
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        cartItemsList.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                ${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}
                <button class="remove-item">-</button>
            `;

            cartItems.appendChild(cartItem);

            cartItem.querySelector(".remove-item").addEventListener("click", () => {
                subtotal -= item.price;
                cartItemsList.splice(index, 1);
                updateCart();
            });
        });

        subtotalElement.innerText = subtotal.toFixed(2).replace('.', ',');
    }

    cartButton.onclick = function () {
        modal.style.display = "block";
        // Remove a animação de tremer quando o modal é aberto
        cartButton.classList.remove('shake');
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    finalizeOrderButton.addEventListener("click", () => {
        const address = addressInput.value.trim();
        const tableNumber = tableNumberInput.value.trim();
        const paymentMethod = paymentForm.querySelector('input[name="payment"]:checked').value;

        let orderMessage = `Pedido:\n`;

        cartItemsList.forEach(item => {
            orderMessage += `${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
        });

        orderMessage += `\nSubtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
        orderMessage += `Forma de Pagamento: ${paymentMethod}\n`;

        if (tableNumber) {
            orderMessage += `Número da Mesa: ${tableNumber}\n`;
        }

        if (address) {
            orderMessage += `Endereço: ${address}\n`;
        }

        const whatsappURL = `https://wa.me/5561998910674?text=${encodeURIComponent(orderMessage)}`;
        window.open(whatsappURL, '_blank');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Adiciona comportamento de rolagem suave
    document.querySelectorAll('#light-bar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.getElementById('share-button').addEventListener('click', function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    if (navigator.share) {
        navigator.share({
            title: 'Churrasquinho do Guizadaaa',
            text: 'Veja o cardápio e faça seu pedido!',
            url: window.location.href // Compartilha a URL atual
        }).then(() => {
            console.log('Compartilhamento bem-sucedido!');
        }).catch((error) => {
            console.error('Erro ao compartilhar:', error);
        });
    } else {
        alert('Compartilhamento não suportado neste navegador.');
    }
});

// Função para abrir o modal e esconder os botões
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Esconder botões de Localização e Carrinho
    document.getElementById("location-button").style.display = "none";
    document.getElementById("cart-button").style.display = "none";
}

// Função para fechar o modal e mostrar os botões novamente
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    // Mostrar botões de Localização e Carrinho
    document.getElementById("location-button").style.display = "block";
    document.getElementById("cart-button").style.display = "block";
}

// Fechar o modal ao clicar no botão de fechar
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function () {
    closeModal();
}

// Fechar o modal ao clicar fora dele
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}
