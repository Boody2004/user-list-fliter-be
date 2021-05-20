window.addEventListener("load", () => {
    let pageResults1 = []
    let pageResults2 = []
    const userFilter = document.querySelector(".list-input");
    const cards = document.querySelector(".cards");
    const pageOne = document.querySelector(".page1");
    const pageTwo = document.querySelector(".page2");

    const renderCard = (cardData) => {
        return `
            <div class="card">
                <div class="imgBx">
                    <img src="${cardData.avatar}" alt="usr avatar">
                </div>
                <div class="details">
                    <h2>${cardData.first_name} ${cardData.last_name}
                    <br>
                    <span>${cardData.email}</span></h2>
                </div>
            </div>
                `;
    }

    // addEventListener userFilter
    userFilter.addEventListener("input", function (event) {
        const filteredResults1 = pageResults1.filter((x) => {
            return x.first_name.toLowerCase().indexOf(userFilter.value.toLowerCase())!==-1
            || x.last_name.toLowerCase().indexOf(userFilter.value.toLowerCase())!==-1
        });
        const filteredResults2 = pageResults2.filter((x) => {
            return x.first_name.toLowerCase().indexOf(userFilter.value.toLowerCase())!==-1
            || x.last_name.toLowerCase().indexOf(userFilter.value.toLowerCase())!==-1
        });
        cards.innerHTML = ""
        filteredResults1.concat(filteredResults2).forEach((cardDetails) => {
            cards.innerHTML += renderCard(cardDetails)
        })
        if (userFilter.value === "") {
            cards.innerHTML = ""
            pageResults1.forEach((cardDetails) => {
                cards.innerHTML += renderCard(cardDetails)
            })
        } 
    });
    // addEventListener pageOne
    pageOne.addEventListener("click", function () {
            cards.innerHTML = ""
            pageResults1.forEach((cardDetails) => {
                cards.innerHTML += renderCard(cardDetails)
            })
    });
    // addEventListener pageTwo
    pageTwo.addEventListener("click", function () {
            cards.innerHTML = ""
            pageResults2.forEach((cardDetails) => {
                cards.innerHTML += renderCard(cardDetails)
            })
    });

    // fetch pageOne
    fetch('https://reqres.in/api/users?page=1')
    .then(response => response.json())
    .then(data => {
        pageResults1 = data.data
        data.data.forEach((cardDetails) => {
            cards.innerHTML += renderCard(cardDetails)
        })
    });
    // fetch pageTwo
    fetch('https://reqres.in/api/users?page=2')
    .then(response => response.json())
    .then(data => {
        pageResults2 = data.data
    });

})
