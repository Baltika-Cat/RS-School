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
const body = document.body;
const burgerIcon = document.querySelector('#burger-icon');
const navigationBurgerWindow = document.querySelector('.navigationBurgerWindow');
const burgerNavigation = [...document.querySelectorAll('.burgerNavigation li')];
const burgerNavigationMenu = document.querySelector('.navigationBurgerWindow .homeHeadMenu');
const burgerLines = [...document.querySelectorAll('.burger-line')];
const menuRefreshButton = document.querySelector('.menuRefreshButton');
const menuMenuBottom = [...document.querySelectorAll('.menuMenuBottom')];
const allSlides = document.querySelector('.allSlides');
const slides = [...document.querySelectorAll('.slide')];
const slideWindow = document.querySelector('.slideWindow');
const arrows = [...document.querySelectorAll('.homeArrowCircle')];
const controls = [...document.querySelectorAll('.homeControls hr')];

const leftArrow = arrows[0];
const rightArrow = arrows[1];

let windowWidthSmaller = false;

let productIndex = 0;

let slideCount = 0;

function rollSlide() {
    allSlides.style.transform = `translateX(${(-slideCount * (slideWindow.offsetWidth + 40))}px)`;
}

if (leftArrow) {
    leftArrow.addEventListener('click', () => {
        controls[slideCount].classList.remove('controlActive');
        slideCount -= 1;
        if (slideCount < 0) {
            slideCount = slides.length - 1;
        }
        controls[slideCount].classList.add('controlActive');
        rollSlide();
    })
}

if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        controls[slideCount].classList.remove('controlActive');
        slideCount += 1;
        if (slideCount > slides.length - 1) {
            slideCount = 0;
        }
        controls[slideCount].classList.add('controlActive');
        rollSlide();
    })
}

controls.forEach((control, index, arr) => {
    control.addEventListener('transitionend', () => {
        control.classList.remove('controlActive');
        let index = arr.indexOf(control) + 1;
        if (index === arr.length) {
            index = 0;
        }
        controls[index].classList.add('controlActive');
        slideCount = index;
        rollSlide();
    })
})

if (controls[0]) {
    window.addEventListener('load', () => {
        controls[0].classList.add('controlActive');
    })
}

let transitionCurrent = '';

slideWindow.addEventListener('mouseover', () => {
    let elementTransition = controls[slideCount].querySelector('.controlActive');
    let style = window.getComputedStyle(elementTransition);
    transitionCurrent = style.getPropertyValue('transition');
    controls[slideCount].classList.remove('controlActive');
    console.log(transitionCurrent)
})

const menu = [menuCoffee, menuTea, menuDessert];
const unactiveCoffeeTeaDessertButtons = function() {
    coffeeTeaDessertButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}

let menuType = 'coffee';

let menuTypeIndex = function() {
    for (let i = 0; i < coffeeTeaDessertButtons.length; i += 1) {
        if (coffeeTeaDessertButtons[i].classList.contains('menuMenuButtonsActive')) {
            return i;
        }
    }
}

const unactiveMenuSizeButtons = function() {
    menuModalSizeButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}

const unactiveMenuAdditivesButtons = function() {
    menuModalAdditivesButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}

burgerIcon.addEventListener('click', function() {
    if(navigationBurgerWindow.classList.contains('burgerMenuOpen')) {
        navigationBurgerWindow.classList.remove('burgerMenuOpen');
        burgerLines.map((item) => item.classList.remove('burger-line-open'));
    } else {
        navigationBurgerWindow.classList.add('burgerMenuOpen');
        burgerLines.map((item) => item.classList.add('burger-line-open'));
    }
})

burgerNavigation.forEach((element) => {
    element.addEventListener('click', () => {
        navigationBurgerWindow.classList.remove('burgerMenuOpen');
        burgerLines.map((item) => item.classList.remove('burger-line-open'));
    })
})

burgerNavigationMenu.addEventListener('click', () => {
    navigationBurgerWindow.classList.remove('burgerMenuOpen');
    burgerLines.map((item) => item.classList.remove('burger-line-open'));
})

if (menuCoffee[0]) {
    window.addEventListener('load', () => {
        if (window.innerWidth > 768) {
            windowWidthSmaller = false;
            menuCoffee.map((item) => item.classList.add('menuOpen'));
        } else {
            windowWidthSmaller = true;
            menuCoffee[0].classList.add('menuOpen');
            menuCoffee[1].classList.remove('menuOpen');
            menuRefreshButton.classList.remove('refreshButtonClose');
        }
    })
}

if (menuCoffee[0]) {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            windowWidthSmaller = false;
            menuMenuBottom[menuTypeIndex()].classList.add('menuOpen');
        } else if (window.innerWidth <= 768) {
            if (windowWidthSmaller === false) {
                menuMenuBottom.map((item) => {item.classList.remove('menuOpen')});
                menuRefreshButton.classList.remove('refreshButtonClose');
            }
            windowWidthSmaller = true;
            
        }
    })
}

coffeeTeaDessertButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        unactiveCoffeeTeaDessertButtons();
        button.classList.add('menuMenuButtonsActive');
        menuType = button.textContent.trim().toLowerCase();
        if (button.textContent.trim().toLowerCase() === 'tea') {
            menuRefreshButton.classList.add('refreshButtonClose');
        } else {
            menuRefreshButton.classList.remove('refreshButtonClose');
        }
        for (let i = 0; i < menu.length; i += 1) {
            if (menu[i][0].classList.contains(button.textContent.trim().toLowerCase())) {
                if (window.innerWidth > 768) {
                    menu[i].map((item) => item.classList.add('menuOpen'));
                } else {
                    menu[i][0].classList.add('menuOpen');
                }
                
            } else {
                menu[i].map((item) => item.classList.remove('menuOpen'));
            }
        }
    })
})

if (menuRefreshButton) {
    menuRefreshButton.addEventListener('click', () => {
        menuMenuBottom[menuTypeIndex()].classList.add('menuOpen');
        menuRefreshButton.classList.add('refreshButtonClose');
    })
}

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
                body.classList.add('block');
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

if(background) {
    background.addEventListener('click', function() {
        background.classList.remove('backgroundActive');
        menuModal.classList.remove('active');
        let img = menuModalPhoto.querySelector('img');
        menuModalPhoto.removeChild(img);
        body.classList.remove('block');
    })
}

if (closeButton) {
    closeButton.addEventListener('click', function() {
        background.classList.remove('backgroundActive');
        menuModal.classList.remove('active');
        let img = menuModalPhoto.querySelector('img');
        menuModalPhoto.removeChild(img);
        body.classList.remove('block');
    })
}