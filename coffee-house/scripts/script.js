import products from './products.json' assert {type: "json"};

const menuPositions = [...document.querySelectorAll('.menuMenuPosition')];
const background = document.querySelector('.background');
const menuModalTitle = document.querySelector('.menuModalDescription h3');
const menuModalDescription = document.querySelector('.menuModalDescription p');
const menuModalPhoto = document.querySelector('.menuPhotoDiv');
const menuModal = document.querySelector('.menuModalWindow');
const menuModalSizeButtonsTitle = [...document.querySelectorAll('.menuModalSize .menuMenuButton h4')];
const menuModalAdditivesButtonsTitle = [...document.querySelectorAll('.menuModalAdditives .menuMenuButton h4')];
const menuModalPrice = document.querySelector('.menuModalPrice');
const menuModalSizeButtons = [...document.querySelectorAll('.menuModalSize .menuMenuButton')];
const menuModalAdditivesButtons = [...document.querySelectorAll('.menuModalAdditives .menuMenuButton')];
const closeButton = document.querySelector('.menuModalCloseButton');
const coffeeTeaDessertButtons = [...document.querySelectorAll('.menuMenuButtons .menuMenuButton')];
const menuCoffee = [...document.querySelectorAll('.coffee')];
const menuTea = [...document.querySelectorAll('.tea')];
const menuDessert = [...document.querySelectorAll('.dessert')];

let productIndex = 0;

const menu = [menuCoffee, menuTea, menuDessert];
const unactiveCoffeeTeaDessertButtons = function() {
    coffeeTeaDessertButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}

const unactiveMenuSizeButtons = function() {
    menuModalSizeButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}

const unactiveMenuAdditivesButtons = function() {
    menuModalAdditivesButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}

coffeeTeaDessertButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        unactiveCoffeeTeaDessertButtons();
        button.classList.add('menuMenuButtonsActive');
        console.log(button.textContent.trim().toLowerCase())
        for (let i = 0; i < menu.length; i += 1) {
            if (menu[i][0].classList.contains(button.textContent.trim().toLowerCase())) {
                menu[i].map((item) => item.classList.add('menuOpen'));
            } else {
                menu[i].map((item) => item.classList.remove('menuOpen'));
            }
        }
    })
})

let priceSum = 0;
let indexOld = 0;

menuPositions.forEach((element) => {
    element.addEventListener('click', function(e) {
        indexOld = 0;
        for (let i = 0; i < products.length; i += 1) {
            if (products[i].name === element.querySelector('h3').textContent) {
                productIndex = i;
                unactiveMenuSizeButtons();
                unactiveMenuAdditivesButtons();
                menuModalSizeButtons[0].classList.add('menuMenuButtonsActive');

                menuModal.classList.add('active');
                background.classList.add('backgroundActive');
                menuModalTitle.textContent = products[i].name;
                menuModalDescription.textContent = products[i].description;
                let img = document.createElement('img');
                img.src = products[i].photo;
                menuModalPhoto.appendChild(img);
                let keysValues = Object.entries(products[i].sizes);
                let keysAdditives = Object.entries(products[i].additives);
                console.log(keysValues)
                for (let j = 0; j < keysValues.length; j += 1) {
                    menuModalSizeButtonsTitle[j].textContent = keysValues[j][1].size;
                    menuModalAdditivesButtonsTitle[j].textContent = keysAdditives[j][1].name;
                }

                priceSum = parseFloat(products[i].price);
                menuModalPrice.textContent = `$${priceSum.toFixed(2)}`;
            }
        }
    })
})

menuModalSizeButtons.forEach((sizeButton) => {
    sizeButton.addEventListener('click', function() {
        for (let i = 0; i < 3; i += 1) {
            if (menuModalSizeButtons[i].classList.contains('menuMenuButtonsActive')) {
                indexOld = i;
            }
        }
        unactiveMenuSizeButtons();
        sizeButton.classList.add('menuMenuButtonsActive');
        let index = menuModalSizeButtons.indexOf(sizeButton);
        let keysValues = Object.entries(products[productIndex].sizes);
        console.log(productIndex)
        console.log(products[productIndex].price)
        console.log(keysValues[index][1]['add-price']);
        priceSum += parseFloat(keysValues[index][1]['add-price']);
        priceSum -= parseFloat(keysValues[indexOld][1]['add-price']);
        menuModalPrice.textContent = `$${priceSum.toFixed(2)}`;
    })
})

menuModalAdditivesButtons.forEach((additivesButton) => {
    additivesButton.addEventListener('click', function() {
        additivesButton.classList.toggle('menuMenuButtonsActive');
        let index = menuModalAdditivesButtons.indexOf(additivesButton);
        let keysAdditives = Object.entries(products[productIndex].additives);
        if (additivesButton.classList.contains('menuMenuButtonsActive')) {
            priceSum += parseFloat(keysAdditives[index][1]['add-price']);
        } else {
            priceSum -= parseFloat(keysAdditives[index][1]['add-price']);
        }
        menuModalPrice.textContent = `$${parseFloat(priceSum).toFixed(2)}`;
    })
})

background.addEventListener('click', function() {
    background.classList.remove('backgroundActive');
    menuModal.classList.remove('active');
    let img = menuModalPhoto.querySelector('img');
    menuModalPhoto.removeChild(img);
})

closeButton.addEventListener('click', function() {
    background.classList.remove('backgroundActive');
    menuModal.classList.remove('active');
    let img = menuModalPhoto.querySelector('img');
    menuModalPhoto.removeChild(img);
})