// Data imported from JSON files 

import relatedProductsData from './relatedProducts.json' assert {type: 'json'};
import bestsellersData from './bestSeller.json' assert {type: 'json'};

//  Swipers

let swiper = new Swiper(".mySwiper", {
  speed: 600,
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    650: {
        slidesPerView: 3,
    },
    1000: {
        slidesPerView: 4,
    },
},
});

let swiper2 = new Swiper(".mySwiper2", {
  speed: 600,
  slidesPerView: 5,
  spaceBetween: 30,
  slidesPerGroup: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    650: {
        slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
    1000: {
        slidesPerView: 5,
    },
}, 
});

// DOMContentLoaded --- Displaying the products

window.addEventListener('DOMContentLoaded', function(){
  displayRelatedProducts(relatedProductsData)
  displayBestsellers(bestsellersData)
});


// Displaying the Related Products

const relatedProductsContainer = document.getElementById('related-products-container')

let loadCounter = 10

function displayRelatedProducts(productsData) {

  let displayCards = productsData.map(function(product, index){   
    if(index < loadCounter){
      return `
      <div class="card">
          <div class="card-image">
              <img src=${product.img} alt=${product.title}>
          </div>
          <div class="rating-comment">
              <div class="rating">
                  <i class="fa-solid fa-star"></i>${product.rating}
              </div>
              <div class="comment">
                  (${product.comment} Yorum)
              </div>
          </div>
          <p class="product-code">${product.code}</p>
          <div class="title">${product.title}</div>
          <div class="price">₺${product.discount ? product.dprice : product.price}</div>
          <div class="same-day-shipping">${product.samedayshipping && "BUGÜN KARGODA"}</div>
          <div class="add-to-cart add">
            <div class="add" id="add-to-cart_left">
                <i class="fa-solid fa-right-left add"></i>
            </div>
            <div class="add" id="add-to-cart_right">
                <p class="add">SEPETE EKLE</p>
            </div>
          </div>
      </div>`
    }  
  }); 

  displayCards = displayCards.join('');
  relatedProductsContainer.innerHTML = displayCards;

}

// Load More Button

const loadMoreRelatedProducts = document.getElementById('load-more_related-products')

loadMoreRelatedProducts.addEventListener('click',()=>{
  loadCounter = 20
  displayRelatedProducts(relatedProductsData)
})


// Displaying the Bestseller Products

const bestsellersContainer = document.getElementById('bestsellers-container')

function displayBestsellers(productsData) {

  let displayCards = productsData.map(function(product){   

      return `
      <div class="swiper-slide opacity-1">
        <div class="card">
            <div class="card-image">
                <img src=${product.img} alt=${product.title}>
            </div>
            <div class="rating-comment">
                <div class="rating">
                    <i class="fa-solid fa-star"></i>${product.rating}
                </div>
                <div class="comment">
                    (${product.comment} Yorum)
                </div>
            </div>
            <p class="product-code">${product.code}</p>
            <div class="title">${product.title}</div>
            <div class="price">₺${product.discount ? product.dprice : product.price}</div>
            <div class="same-day-shipping">${product.samedayshipping ? "BUGÜN KARGODA": "YARIN KARGODA"}</div>
            <div class="add-to-cart add">
              <div class="add" id="add-to-cart_left">
                  <i class="fa-solid fa-right-left add"></i>
              </div>
              <div class="add" id="add-to-cart_right">
                  <p class="add">SEPETE EKLE</p>
              </div>
            </div>
        </div>
      </div>`

  }); 

  displayCards = displayCards.join('');
  bestsellersContainer.innerHTML = displayCards;

}

// Adding products to the Cart with localstorage

const main = document.getElementById('main')
const numberOnTheCart = document.getElementById('number-on-the-cart')

let productsInTheCart = parseInt(localStorage.getItem("productsInTheCart")) || 0 ;
numberOnTheCart.textContent = localStorage.getItem("productsInTheCart") || 0;

main.addEventListener("click", (e)=>{
  if(e.target.classList.contains("add")) {
    productsInTheCart += 1
    localStorage.setItem("productsInTheCart", productsInTheCart)

    numberOnTheCart.textContent = localStorage.getItem("productsInTheCart")
  }
})

// Dropdown Menu

const dropdownButton = document.querySelector('.select')

const dropdownMenu = document.querySelector('.dropdown-menu')

dropdownButton.addEventListener('click', ()=>{
  dropdownButton.classList.toggle('active')
  dropdownMenu.classList.toggle('block')
})