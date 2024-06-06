const modal = document.querySelector('.modal');
const openbtn = document.querySelector('.open-button');
const closeBtn = modal.querySelector('.close');
const overlay = modal.querySelector('.modal-overlay');


const openModal = () =>{
    modal.classList.toggle('hidden');
}

openbtn.addEventListener('click',openModal);




const closeModal = () =>{
    modal.classList.toggle('hidden');
}
closeBtn.addEventListener('click',closeModal)




overlay.addEventListener('click',closeModal)

