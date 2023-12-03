import products from './products.json' assert {type: "json"};

const menuPositions = [...document.querySelectorAll('.menuMenuPosition')];
const background = document.querySelector('.background');
const menuModalTitle = document.querySelector('.menuModalDescription h3');
const menuModalDescription = document.querySelector('.menuModalDescription p');


menuPositions.forEach((element) => {
    element.addEventListener('click', function(e) {
        background.classList.add('backgroundActive');
        for (let i = 0; i < products.length; i += 1) {
            if (products[i].name === element.querySelector('h3').textContent) {
                console.log(products[i])
            }
        }
    })
})