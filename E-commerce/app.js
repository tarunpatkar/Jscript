const wrapper = document.querySelector(".sliderWrapper");
const currProduct = document.querySelector(".product");
const navBottom = document.querySelector(".navBottom");
const sizes = document.querySelector(".sizes");
const colors = document.querySelector(".colors");


let products = [];
(async function () {
    const prodResponse = await fetch('./products.json')
    products = await prodResponse.json();
    loadScript()
})()
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function loadScript() {
    //console.log(JSON.stringify(products))
    let listofproducts = products.map((prod) => {
        return `
    <div class="sliderItem" data-id="${prod.id}">
                <img src="${prod.colors[0].img}" alt="" class="sliderImg">
                <div class="sliderBg"></div>
                <h1 class="sliderTitle">${prod.title}<br/> New <br/> Season</h1>
                <h2 class="sliderPrice">$${prod.price}</h2>
                <a href="#product">
                    <button class="buyButton">Buy Now!</button>
                </a>
            </div>
    `
    })
    let lstMenuItem = products.map((prod) => {
        return `<h3 class="menuItem">${prod.title.toUpperCase()}</h3>`
    })

    navBottom.innerHTML = lstMenuItem;
    navBottom.innerHTML = navBottom.innerHTML.replace(/,/g, '')
    const menuItems = document.querySelectorAll(".menuItem");
    wrapper.innerHTML = listofproducts;
    wrapper.style.width =listofproducts.length * 100 + 'vw';
    for(let icnt = 0;icnt<products.length;icnt++){
        const slBG = document.querySelector(`.sliderItem:nth-child(${icnt + 1}) .sliderBg`)
        slBG.style.backgroundColor = getRandomColor();
        const slPrice=document.querySelector(`.sliderItem:nth-child(${icnt + 1}) .sliderPrice`)    
        slPrice.style.color = getRandomColor();
    }
    
    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            wrapper.style.transform = `translateX(${-100 * index}vw)`

            choosenProduct = products[index];
            sizes.innerHTML = '';
            choosenProduct.sizes.forEach((size) => {
                sizes.innerHTML += `<div class="size">${size}</div>`
            })
            // colors.innerHTML='';
            // choosenProduct.colors

            const currentProductImg = document.querySelector(".productImg")
            const currentProductTitle = document.querySelector(".productTitle")
            const currentProductPrice = document.querySelector(".productPrice")
            const currentProductSizes = document.querySelectorAll(".size")

            currProduct.style.display = "block";

            currentProductTitle.textContent = choosenProduct.title;
            currentProductPrice.textContent = "$" + choosenProduct.price
            currentProductImg.src = choosenProduct.colors[0].img;

            colors.innerHTML='';
            choosenProduct.colors.forEach((color) => {
                colors.innerHTML+=`<div class="color" style="background-color:${color.code}"></div>`
                //color.style.backgroundColor = choosenProduct.colors[index].code;
            });
            const currentProductColors = document.querySelectorAll(".color")
            addColorEvent(currentProductColors, currentProductImg);
            addSizeEvent(currentProductSizes);
        });
    });
    menuItems[0].click();
    function addColorEvent(currentProductColors, currentProductImg) {
        currentProductColors.forEach((color, index) => {
            color.addEventListener("click", () => {
                currentProductImg.src = choosenProduct.colors[index].img
            });
        });
    }



    function addSizeEvent(currentProductSizes) {
        currentProductSizes.forEach((size, index) => {
            size.addEventListener("click", () => {
                currentProductSizes.forEach((size) => {
                    size.style.backgroundColor = "white";
                    size.style.color = "black";
                });
                size.style.backgroundColor = "black";
                size.style.color = "white";
            });
        });
    }


    const productButton = document.querySelector(".productButton");
    const payment = document.querySelector(".payment");
    const close = document.querySelector(".close");

    productButton.addEventListener("click", () => {
        payment.style.display = "flex";
    });

    close.addEventListener("click", () => {
        payment.style.display = "none";
    })
}