document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = '/collection.html';
    });
});

document.querySelectorAll('.add-to-cart, .share, .compare, .like')
    .forEach(el => el.addEventListener('click', e => e.stopPropagation()));

const quantity = document.querySelector('.quantity');
const valueEl = quantity.querySelector('.qty-value');
const minus = quantity.querySelector('.minus');
const plus = quantity.querySelector('.plus');

let count = 1;

minus.addEventListener('click', () => {
    if (count > 1) {
        count--;
        valueEl.textContent = count;
    }
});

plus.addEventListener('click', () => {
    count++;
    valueEl.textContent = count;
});
