/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $inner = $(".inner");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function (pizza) {

        if (filter === "all") {
            pizza_shown.push(pizza);
        }else if (filter === "vegan") {
            if (!pizza.content.ocean && !pizza.content.chicken && !pizza.content.ocean)
                pizza_shown.push(pizza);
        }else {
            if (pizza.content[filter]) pizza_shown.push(pizza);
        }

    });

    $inner.find("#by-type").text(pizza_shown.length);

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {

    $inner.find(".fbut").click(function () {

        $inner.find(".fbut").removeClass("pressed");
        $(this).addClass("pressed");
        filterPizza(event.target.id);

    });

    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;