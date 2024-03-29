const list = document.querySelector('#list')
const loader = document.querySelector('#loader')
const error = document.querySelector('#error_data')
const urlAPI = 'https://api.escuelajs.co/api/v1/products'
const products = []

async function fetchData() {
  try {
    showLoader()
    const resp = await fetch(urlAPI)
    const data = await resp.json()
    renderElements(data)
    hideLoader()
  } catch (err) {
    hideLoader()
    error.innerHTML = err.message
  }
}

function renderElements(products) {
  const html = products.map(toHTML).join('')
  if (products.length === 0) {
    error.innerHTML = 'There are no data :('
  } else {
    list.innerHTML = html
  }
}

function toHTML(product) {
  return`
    <li class="product__item">
      <div class="product__wrapper">
        <img class="product__image" src="${product.images}" 
        onerror="this.src='http://placehold.it/300x300'"
        />
        <div class="product__name">
          ${product.title}
        </div>
        <div class="product__price">
          Price: $${product.price}
        </div>
        <p class="product__description">
          ${product.description}
        </p>
      </div>
    </li>
  `
}

function showLoader() {
  loader.style.display = 'block'
}

function hideLoader() {
  loader.style.display = 'none'
}

function init() {
  fetchData()
}

window.onload = init
