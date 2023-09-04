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
    let size = c('.dressInfo-size.selected').getAttribute('data-key');

    cart.push({
        id:dressJson[modalKey].id,
        size,
        qt:modalQt
    });

    closeModal();
});