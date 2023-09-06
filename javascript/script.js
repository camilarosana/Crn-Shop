let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el)=> document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);

dressJson.map((item, index)=>{
    let dressItem = c('.models .dress--item').cloneNode(true);

    dressItem.setAttribute('data-key', index);
    dressItem.querySelector('.dress--item--img img').src = item.img;
    dressItem.querySelector('.dress--item--price').innerHTML = `R$ ${item.price}`;
    dressItem.querySelector('.dress--item--name').innerHTML = item.name;
    dressItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.dress--item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.dressBig img').src = dressJson[key].img;
        c('.dressInfo h1').innerHTML = dressJson[key].name;
        c('.dressInfo--actualPrice').innerHTML = dressJson[key].price;
        c('.dressInfo-size.selected').classList.remove('selected');
        cs('.dressInfo-size').forEach( (size, sizeIndex)=>{
            if (sizeIndex == 2) {
                size.classList.add('selected');
            };
        });

        c('.dressInfo--qt').innerHTML = modalQt;

        c('.dressWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.dressWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.dress--area').append(dressItem);
});

// eventos do Modal
function closeModal() {
    c('.dressWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.dressWindowArea').style.display = 'none';
    }, 500);
}
cs('.dressInfo--cancel, .dressInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
c('.dressInfo--qtmenos').addEventListener('click', ()=>{
    if (modalQt > 1) {
        modalQt--;
    c('.dressInfo--qt').innerHTML = modalQt;
    };
});
c('.dressInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.dressInfo--qt').innerHTML = modalQt;
});
cs('.dressInfo-size').forEach( (size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.dressInfo-size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
c('.dressInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.dressInfo-size.selected').getAttribute('data-key'));
    let identifier = dressJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:dressJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    closeModal();
    
});

function updateCart() {
    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let dressItem = dressJson.find((item)=>item.id == cart[id].id);
            subtotal = dressItem.price * cart[i].qt;
            let cartItem = c('.models .cart--item').cloneNode(true);

            cartItem.querySelector('img').src = dressItem.img;
            cartItem.querySelector('.cart--item--nome').innerHTML = dressItem.name;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[id].qt;
            cartItem.querySelector('.cart--item--qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item--qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        
        c('.cart--totalitem-subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.cart--totalitem-desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.cart--totalitem-total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
    }
}

