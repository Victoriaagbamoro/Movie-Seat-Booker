// UI Selectors
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save Selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');


    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    // total.innerText = selectedSeatsCount * ticketSpecial;
}

// How do I save my data To Local  Storage
// Copy Selected Seats into array
// Map through array
// return a new array

// We need to be able to select the movie we want and know the price

// Now We want to get data from local storage and display in the UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    // We need to ensure that the price is showing as well
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
};


// We Should be able to change our movie
movieSelect.addEventListener('change', function(e){
    ticketPrice = e.target.value;
    setMovieData(e.targets.selectedIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied') 
    
    ){
        e.target.classList.toggle('selected');
        
    

        updateSelectedCount();

    }

    
});

// Showcase of count and total in UI
updateSelectedCount();