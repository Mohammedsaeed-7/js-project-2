var product_Section = document.getElementById("product-container")

let types = []
let descriptions = []
let names = []
const products = [

    {
        type: "jacket",
        name:"Jacket",
        id: 1,
        price: 700,
        img: "./image/1.jpg",
    },
    {
        type: "hoodie",
        id: 2,
        name: "Hoodie",
        price: 400,
        img: "./image/2.jpg",
    },
    {
        type: "hoodie",
        id: 3,
        name: "Hoodie",
        price: 1375,
        img: "./image/3.jpg",
    },
    {
        type: "hoodie",
        id: 4,
        name: "Hoodie",
        price: 1482,
        img: "./image/4.jpg",
    },
    {
        type: "hoodie",
        id: 5,
        name: "Hoodie",
        price: 550,
        img: "./image/5.jpg",
    },
    {
        type: "jacket",
        id: 6,
        name: "Half Jacket Half Hoodie",
        price: 1335,
        img: "./image/6.jpg",
    },
    {
        type: "hoodie",
        id: 7,
        name: "Hoodie",
        price: 300,
        img: "./image/7.jpg",
    },
    {
        type: "hoodie",
        id: 8,
        name: "Yellow Hoodie",
        price: 2536,
        img: "./image/8.jpg",
    },
    {
        type: "hoodie",
        id: 9,
        name: "Red Hoodie",
        price: 1061,
        img: "./image/9.jpg",
    },
    {
        type: "hoodie",
        id: 10,
        name: "Space Black Hoodie",
        price: 2565,
        img: "./image/10.jpg",
    },
    {
        type: "jacket",
        id: 11,
        name: "AL-Shazly Pump",
        price: 450,
        img: "./image/11.jpg",
    },
    {
        type: "jacket",
        id: 12,
        name: "Leather Jacket",
        price: 2750,
        img: "./image/12.jpg",
    },

]
let search_result

let carts = [];
let fav_products = [];
let index;
if (localStorage.getItem("index")) {
    index = +localStorage.getItem("index");

    if (localStorage.getItem("carts")) {
        carts = JSON.parse(localStorage.getItem("carts"));
    }
    if (carts[index]) {
    } else { carts.push([]); }
    if (localStorage.getItem("fav_products")) {
        fav_products = JSON.parse(localStorage.getItem("fav_products"));
    }
    if (fav_products[index]) {
    } else fav_products.push([]);
}

const ATC = () => {
    return `
            <i class="fas fa-shopping-bag mr-1"></i>Add to cart
    `
}

const RFC = () => {
    return `
            <i class="fas fa-shopping-bag mr-1"></i>Remove from cart 
    `
}

const drwButton = (id) => {
    let t;

    if (carts[index]) {
        t = carts[index].find(p => p.id == id)
    }
    if (t) {
        return RFC();
    } else return ATC();

}
let fa = "far fa-heart"

const drwHeart = (id) => {
    let t
    if (fav_products[index]) {
        t = fav_products[index].find(p => p.id == id)
    }
    if (t) {
        return "fas fa-heart"
    } else return "far fa-heart"

}
products.map((item) => {

    types.push(item.type)
    descriptions.push(item.description)
    names.push(item.name)
})

getItem = (id) => {
    let item = products.find(p => p.id == id)
    return item;
}

const ProductItem = () => {
    let product_drw = []
    if (search_result) {
        product_drw = search_result
    } else product_drw = products;

    let product = product_drw.map((item) => {

        item.TotalPrice = 0
        item.count = 1;

        return `<div class="product-item pb-3">
                <div class="figure">
                    <img src=${item.img} alt="${item.name}" />
                    <div class="product-info">
                        <div class="d_col" >
                            <span>${item.name}</span>
                            <i class="${drwHeart(item.id)}"name="${item.id}"></i>
                        </div>
                        <p>${item.description}</p>
                    </div>
                </div>
                    <div class="d_col">
                        <button name="${item.id}" class="btn btn-sm ml-1 mt-1">${drwButton(item.id)}</button>
                        <b class="price">${item.price} $</b>
                    </div>
            </div>
        `
    })

    product_Section.innerHTML = product.join(" ");

    let addToCart = document.querySelectorAll(".product-item .d_col button")
    addToCart.forEach((z) => {
        z.style.backgroundColor = "#729dcace";
        z.style.boxShadow = "0 0 0 0"

        if (z.innerHTML === ATC()) {
            z.style.backgroundColor = "#729dcace";
        } else if (z.innerHTML === RFC()) z.style.backgroundColor = "#cf8088d5"

        z.onclick = function () {

            let carts = [];
            let fav_products = [];
            let index;
            if (localStorage.getItem("index")) {
                index = +localStorage.getItem("index");

                if (localStorage.getItem("carts")) {
                    carts = JSON.parse(localStorage.getItem("carts"));
                }
                if (carts[index]) {
                } else { carts.push([]); }
                if (localStorage.getItem("fav_products")) {
                    fav_products = JSON.parse(localStorage.getItem("fav_products"));
                }
                if (fav_products[index]) {
                } else fav_products.push([]);
            }

            if (userName) {
                let id = z.getAttribute("name")
                let item = getItem(id);

                if (z.innerHTML === ATC()) {
                    z.innerHTML = RFC();
                    z.style.backgroundColor = "#cf8088d5";
                    carts[index].push(item);
                    localStorage.setItem("carts", JSON.stringify(carts));
                } else {
                    z.innerHTML = ATC();
                    z.style.backgroundColor = "#729dcace"
                    carts[index].splice(carts[index].findIndex(p => p.id == id), 1);
                    localStorage.setItem("carts", JSON.stringify(carts));
                }

                Productbag();
            } else {
                setTimeout(() => {
                    window.location = "login.html";
                }, 400)
            }
        }
    })
    let heart_icon = document.querySelectorAll(".product-item .product-info i")

    heart_icon.forEach((z) => {
        z.onclick = function () {
            let id = z.getAttribute("name")
            let item = getItem(id);
            if (z.className === "fas fa-heart") {
                z.className = "far fa-heart";
                fav_products[index].splice(fav_products[index].findIndex(p => p.id == id), 1);
                localStorage.setItem("fav_products", JSON.stringify(fav_products));
            } else {
                z.className = "fas fa-heart";
                fav_products[index].push(item);
                localStorage.setItem("fav_products", JSON.stringify(fav_products));
            }
        }

    })

}

ProductItem();

////////////////////////////////////////////////////////////////////////

function search(value) {
    let selected = document.querySelector(".custom-select")
    let i = 2;
    
    if (+selected.value > -1)
        i = +selected.value

    let arr = [types, names, descriptions]
    var indexes = []
    arr[i].forEach((v, ii) => {
        if (v.toUpperCase().indexOf(value.toUpperCase().trim()) != -1) {
            indexes.push(ii)
        }
    })
    search_result = []
    indexes.forEach((it) => {
        search_result.push(products[it])
    })

    ProductItem();
}

////////////////////////////////////////////////////////////////////////////





