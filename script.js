(function (){
    "use strict";

    const detailsForm = document.querySelector('#destination_details_form');

    detailsForm.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event){
        event.preventDefault();
        //we are targeting the event of submitting the form and getting the value of the things the user typed
        const destName = event.target.elements['name'].value;
        const destLocation = event.target.elements['location'].value;
        const destPhoto = event.target.elements['photo'].value;
        const destDescription = event.target.elements['description'].value;

        //now that we captured the values we need to loop through and set each element in the form to '' which is nothing
        for( let i=0;i<detailsForm.length;i++){
            detailsForm.elements[i].value='';        
        }

        //create the card (last step- defined functions below)
        const destCard = createDestinationCard(destName,destLocation,destPhoto, destDescription);

        //check to see if there is already a card made on the right column- if it is we change, if no we create new

        const wishListContainer = document.getElementById('destinations_container');

        if(wishListContainer.children.length === 0){
            document.getElementById('title').innerHTML = "My Wish List"
        }

        document.querySelector('#destinations_container').appendChild(destCard);

        //now we will create the destination card
        function createDestinationCard(name, location, photoURL, description){

            const card = document.createElement('div');
            card.className = 'card'
        //next we add everything to add the image
            const img = document.createElement('img');
            img.setAttribute('alt', name);

            const constantPhotoURL = "images/signpost.jpg";

            if(photoURL.length === 0){
                img.setAttribute('src', constantPhotoURL);
            } else {
                img.setAttribute('src', photoURL);
            }

            card.appendChild(img);

        //now we create a div for the card body and add the dest name/location
            const cardBody = document.createElement('div');
            cardBody.className = "card-body";

            const cardTitle = document.createElement('h3');
            cardTitle.innerText = name;
            cardBody.appendChild(cardTitle);

            const cardSubtitle = document.createElement('h4');
            cardSubtitle.innerText = location;
            cardBody.appendChild(cardSubtitle);
          //add if statement for if there is info in description  
            if (description.length !== 0){
                const cardText = document.createElement('p');
                cardText.className = "card-text";
                cardText.innerText = description;
                cardBody.appendChild(cardText);
            }
        //the remove card defined and event listener button
            const cardDeleteBtn = document.createElement('button');
            cardDeleteBtn.innerText ="Remove";

            cardDeleteBtn.addEventListener('click', removeDestination);
            cardBody.appendChild(cardDeleteBtn);

            card.appendChild(cardBody);
            return card;

        }

        //write function to remove card- need to go up 2 parents to remove
        function removeDestination(event){
            const card = event.target.parentElement.parentElement;
            card.remove();
        }




    }




})();