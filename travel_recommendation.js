btnSearch = document.querySelector('.click');
btnClear = document.querySelector('#btnClear');
btnSubmit = document.querySelector('#btnSubmit');
textArea = document.querySelector('textArea');


function searchCondition()
{
    const input = document.querySelector('#conditionInput').value.toLowerCase();
    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = '';

    const childTextBox = document.createElement("div");
    childTextBox.setAttribute("class", "textBox");

    resultDiv.appendChild(childTextBox);
    
    
    console.log('>>>>>>>>> input: \n');
    console.log(input);
    console.log('=======================================\n');


    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        let country = undefined;
        let temple = undefined;
        let beach = undefined;

        let notFoundYet = true;

        
        country = data.countries.find(item => item.name.toLowerCase() === input);
        console.log(`country? ${country}`);

        if(country)
        {
            notFoundYet = false;

            console.log(">>>>>>>>>>>> Country:")
            console.log(JSON.stringify(country));
            console.log("---------------------------------\n");

            childTextBox.innerHTML += `<h1>Our Recommendations</h1>`;
            for(city of country.cities)
            {
                childTextBox.innerHTML += `<br><h3>${city.name}</h3>`;
                childTextBox.innerHTML += `<img class="img-bg" src="${city.imageUrl}" alt="">`;
                childTextBox.innerHTML += `<p>${city.description}</p>`;
            }
        }
        
        
        if(notFoundYet)
        {
            temple = data.temples.find(item => item.name.toLowerCase().includes(input));
            console.log(`temple? ${temple}`);

            if(temple)
            {
                notFoundYet = false;

                console.log(">>>>>>>>>>>> Temple:")
                console.log(JSON.stringify(temple));
                console.log("---------------------------------\n");

                childTextBox.innerHTML += `<h1>Our Recommendations</h1>`;
                
                childTextBox.innerHTML += `<br><h3>${temple.name}</h3>`;
                childTextBox.innerHTML += `<img class="img-bg" src="${temple.imageUrl}" alt="">`;
                childTextBox.innerHTML += `<p>${temple.description}</p>`;
            }
        }


        if(notFoundYet)
        {
            beach = data.beaches.find(item => item.name.toLowerCase().includes(input));
            console.log(`beach? ${beach}`);

            if(beach)
            {
                notFoundYet = false;

                console.log(">>>>>>>>>>>> Beach:")
                console.log(JSON.stringify(beach));
                console.log("---------------------------------\n");

                childTextBox.innerHTML += `<h1>Our Recommendations</h1>`;
                
                childTextBox.innerHTML += `<br><h3>${beach.name}</h3>`;
                childTextBox.innerHTML += `<img class="img-bg" src="${beach.imageUrl}" alt="">`;
                childTextBox.innerHTML += `<p>${beach.description}</p>`;
            }
        }

        if(notFoundYet) 
        {
            console.log(">>>>>>>>>>>> NO RESULT !!!")
            console.log("---------------------------------\n");

            childTextBox.innerHTML += `<h1>No Result Found</h1>`;
            
            childTextBox.innerHTML += `<br><h3>No Info in the Database</h3>`;
        }

        
        const close = document.createElement("button");
        close.setAttribute("class", "button");
        close.setAttribute("id", "btnClose");
        close.textContent="Close";
        childTextBox.appendChild(close);

        btnClose = document.querySelector('#btnClose');
        btnClose.addEventListener('click', closeTextbox);

    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

btnSearch.addEventListener('click', searchCondition);



function closeTextbox()
{
    const resultDivRemove = document.querySelector('.result');
    resultDivRemove.innerHTML = '';

}


function clearCondition()
{
    document.querySelector('#conditionInput').value = "";

}

btnClear.addEventListener('click', clearCondition);


function thankyou()
{
    if(textArea.value !== "")
    {
        btnSubmit.textContent="Thank you!";
    }

}





