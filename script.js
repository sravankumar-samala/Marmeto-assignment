const searchInput = document.getElementById('search')
const gridBtn = document.querySelector('.grid-btn')
const listBtn = document.querySelector('.list-btn')
const productsContainer = document.getElementById('productsContainer')

const productsUrl = 'https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';

async function fetchProducts(){
    try {
        const response = await fetch(productsUrl)
        const productsData = await response.json()
        console.log(productsData.data)
        const upadatedProducts = productsData.data.map(each => ({
            title : each.product_title,
            badge: each.product_badge,
            imageUrl : each.product_image,
            variants: each.product_variants,
        }))
        return upadatedProducts
    } catch (error) {
        console.log(error.message)
    }
}

function createProductItem(product, index){
    const productItem = document.createElement('li')
        productItem.classList.add('product-item')

        const badgeElement = document.createElement('span')
        badgeElement.classList.add('badge')
        badgeElement.textContent = product.badge
        const imageContainer = document.createElement('div')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src', `product${index+1}.png`)
        imageElement.setAttribute('alt', 'product')
        
        imageContainer.appendChild(imageElement)
        imageContainer.appendChild(badgeElement)
        productItem.appendChild(imageContainer)

        const productContentContainer = document.createElement('div')
        const productTitle = document.createElement('h2')
        productTitle.textContent = product.title
        const productsVariantsContainer = document.createElement('ul')
        product.variants.forEach((varient, i) => {
            const productVarient = document.createElement('li')
            const [key] = Object.keys(varient)
            const value = varient[key].split('/').join(' / ')
            productVarient.textContent = value
            productsVariantsContainer.appendChild(productVarient)
        })

        productContentContainer.appendChild(productTitle)
        productContentContainer.appendChild(productsVariantsContainer)
        productItem.appendChild(productContentContainer)

    return productItem

}

function renderProducts(products){
    productsContainer.innerHTML = ''; //ensures products container is empty while seaching products

    products.forEach((product, i) => {
        const newListElement = createProductItem(product, i)

        productsContainer.appendChild(newListElement)
    })
}

searchInput.addEventListener('input', async (event) => {
    const searchValue = event.target.value.toLowerCase()
    const data = await fetchProducts()
    const filteredProducts = data.filter(each => each.title.toLowerCase().includes(searchValue))
    console.log(filteredProducts)
    renderProducts(filteredProducts)
})

gridBtn.addEventListener('click', () => {
    productsContainer.classList.remove('products-container')
    productsContainer.classList.add('grid-products')
})

listBtn.addEventListener('click', () => {
    productsContainer.classList.add('products-container')
    productsContainer.classList.remove('grid-products')
})

async function initialRender(){
    const initialProducts = await fetchProducts()
    renderProducts(initialProducts)
}
initialRender()


