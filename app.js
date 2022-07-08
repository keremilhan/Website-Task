import relatedProductsData from './relatedProducts.json' assert {type: 'json'};
import bestsellersData from './bestSeller.json' assert {type: 'json'};

const relatedProductsContainer = document.getElementById('related-products-container')

const bestsellersContainer = document.getElementById('bestsellers-container')

const loadMoreRelatedProducts = document.getElementById('load-more_related-products')

let swiper = new Swiper(".mySwiper", {
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
});

let swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 5,
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
});

window.addEventListener('DOMContentLoaded', function(){
  displayRelatedProducts(relatedProductsData)
  displayBestsellers(bestsellersData)
});

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
          <div class="add-to-cart">
          <div id="add-to-cart_left">
              <i class="fa-solid fa-right-left"></i>
          </div>
          <div id="add-to-cart_right">
              <P>SEPETE EKLE</P>
          </div>
      </div>
      </div>`
    }  
  }); 

  displayCards = displayCards.join('');
  relatedProductsContainer.innerHTML = displayCards;

}


loadMoreRelatedProducts.addEventListener('click',()=>{
  loadCounter = 20
  displayRelatedProducts(relatedProductsData)
})


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
            <div class="same-day-shipping">${product.samedayshipping && "BUGÜN KARGODA"}</div>
            <div class="add-to-cart">
            <div id="add-to-cart_left">
                <i class="fa-solid fa-right-left"></i>
            </div>
            <div id="add-to-cart_right">
                <P>SEPETE EKLE</P>
            </div>
        </div>
        </div>
      </div>`

  }); 

  displayCards = displayCards.join('');
  bestsellersContainer.innerHTML = displayCards;

}