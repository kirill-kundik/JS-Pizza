/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $header_cart = $(".orders-header");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var added = false;

    Cart.forEach(function (cart_item) {
        if (!added) {
            if (cart_item.pizza === pizza && cart_item.size === size) {

                console.log("NICK MARHAL (IPZ-16) LOX, prost)))0) 4tob znali");
                cart_item.quantity += 1;
                added = true;

            }
        }
    });

    //Приклад реалізації, можна робити будь-яким іншим способом
    if (!added) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика

    var i = Cart.indexOf(cart_item);
    Cart.splice(i, 1);

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function clearCart() {

    Cart.splice(0, Cart.length);

}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        var sum = cart_item.quantity * cart_item.pizza[cart_item.size].price;
        $node.find(".price").text(sum);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            //Зменуємо кількість замовлених піц
            cart_item.quantity -= 1;
            if (cart_item.quantity <= 0) {
                removeFromCart(cart_item);
            }

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".remove").click(function () {
            //Видаляємо замовлену піцу
            removeFromCart(cart_item);
            //Оновлюємо відображення
            updateCart();
        });

        $header_cart.find(".button-clear").click(function () {
            //Збільшуємо кількість замовлених піц
            console.log("Maks LOX, sry novaya paskhalo4ka :)");
            clearCart();

            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $header_cart.find(".counter").text(Cart.length);

    var sum = 0;
    Cart.forEach(function (t) {

        sum += parseInt(t.pizza[t.size].price) * parseInt(t.quantity);

    });
    console.log(sum);

    $(".orders-footer").find(".amount").text(sum);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;