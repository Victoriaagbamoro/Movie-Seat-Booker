const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSpecial = document.getElementById('movie-special');

showInUI();

let ticketSpecialPrice = +movieSpecial.value;

//  Save Selected movie index and price
function setMovieData(movieSpecialIndex, movieSpecialPrice){
    localStorage.setItem('specialMovieIndex', movieSpecialIndex);
    localStorage.setItem('specialMoviePrice', movieSpecialPrice);
}





// Update total and count
function  updateSpecialCount(){
    const specialSeats = document.querySelectorAll('.row .seat.special');

    const seatsIndex = [...specialSeats].map(function(seat){
        return [...seats].indexOf(seat)
    });

    localStorage.setItem('specialSeats', JSON.stringify(seatsIndex));


    const selectedSpecialSeatCount = specialSeats.length;

    count.innerText = selectedSpecialSeatCount;
    total.innerText = selectedSpecialSeatCount * ticketSpecialPrice;
} 


function showInUI(){
    const specialSeats = JSON.parse(localStorage.getItem('specialSeats'));

    if(specialSeats !== null && specialSeats.length > 0){
        seats.forEach((seat, index) => {
            if(specialSeats.indexOf(index) > -1){
                seat.classList.add('special');
            }
        })
    }

    // We need to ensure that the price is showing as well
    const specialMovieIndex = localStorage.getItem('specialMovieIndex');
    if(specialMovieIndex !== null){
        movieSpecial.specialIndex = specialMovieIndex;
    }
};




// / We Should be able to change our movie
movieSpecial.addEventListener('change', function(e){
    ticketSpecialPrice= e.target.value;
    updateSpecialCount();
})


container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat')
    
    
    ){
        e.target.classList.toggle('special');


        updateSpecialCount();

    }
})

updateSpecialCount();