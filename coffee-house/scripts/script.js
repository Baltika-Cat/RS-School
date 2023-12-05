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

let productIndex = 0;

const unactiveMenuButtons = function() {
    menuModalSizeButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
    menuModalAdditivesButtons.map((item) => item.classList.remove('menuMenuButtonsActive'));
}   

menuPositions.forEach((element) => {
    element.addEventListener('click', function(e) {
        for (let i = 0; i < products.length; i += 1) {
            if (products[i].name === element.querySelector('h3').textContent) {
                productIndex = i;
                unactiveMenuButtons();
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
                menuModalPrice.textContent = `$${products[i].price}`;
            }
        }
    })
})

menuModalSizeButtons.forEach((sizeButton) => {
    sizeButton.addEventListener('click', function() {
        unactiveMenuButtons();
        sizeButton.classList.add('menuMenuButtonsActive');
        let index = menuModalSizeButtons.indexOf(sizeButton);
        let keysValues = Object.entries(products[productIndex].sizes);
        console.log(productIndex)
        console.log(products[productIndex].price)
        console.log(keysValues[index][1]['add-price']);

        menuModalPrice.textContent = `$${(parseFloat(products[productIndex].price) + parseFloat(keysValues[index][1]['add-price'])).toFixed(2)}`;
    })
})

background.addEventListener('click', function() {
    background.classList.remove('backgroundActive');
    menuModal.classList.remove('active');
    let img = menuModalPhoto.querySelector('img');
    menuModalPhoto.removeChild(img);
})