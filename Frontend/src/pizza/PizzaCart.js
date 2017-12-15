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

var storage = require('../LocalStorage');

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
    var orders = storage.get("cart");

    if (orders) {
        Cart = orders;
    }

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

        if (document.location.href == "http://localhost:5050/order.html") {

            $node.find(".plus").css("display", "none");
            $node.find(".minus").css("display", "none");
            $node.find(".remove").css("display", "none");

            var piz = "";

            if (cart_item.quantity == 1) piz = "піца";
            else if (cart_item.quantity % 10 == 2 || cart_item.quantity % 10 == 3 || cart_item.quantity % 10 == 4) piz = "піци";
            else piz = "піц";

            $node.find(".counter").text(cart_item.quantity + " " + piz);

        } else {

            $node.find(".plus").css("display", "inline-block");
            $node.find(".minus").css("display", "inline-block");
            $node.find(".remove").css("display", "inline-block");
            $node.find(".counter").text(cart_item.quantity);

        }

        $cart.append($node);
    }

    $header_cart.find(".counter").text(Cart.length);

    var sum = 0;
    Cart.forEach(function (t) {

        sum += parseInt(t.pizza[t.size].price) * parseInt(t.quantity);

    });
    console.log(sum);

    if (document.location.href == "http://localhost:5050/order.html") {

        $header_cart.find(".button-clear").css("visibility", "hidden");

    } else {

        $header_cart.find(".button-clear").css("visibility", "visible");
    }

    $(".orders-footer").find(".amount").text(sum);

    if (Cart.length < 1) {
        $(".submit-order").attr("disabled", true);
    } else {
        Cart.forEach(showOnePizzaInCart);
        $(".submit-order").attr("disabled", false);
    }

    orders = Cart;
    storage.set("cart", orders);

    $(".submit-order").click(function () {
        document.location.href = "http://localhost:5050/order.html";
    });
}

function getPizzaSum() {
    var sum = 0;
    Cart.forEach(function (t) {

        sum += parseInt(t.pizza[t.size].price) * parseInt(t.quantity);

    });
    return sum;
}

exports.getPizzaSum = getPizzaSum;

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;