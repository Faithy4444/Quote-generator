const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteContainer = document.querySelector(".main-container");
const nextBtn = document.querySelector("#next-btn");
const quoteForm = document.getElementById("form");
const apiUrl = "http://127.0.0.1:3000/";

const fetchQuote = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
            const RandomQuote = Math.floor(Math.random() * data.length);
            renderData(data[RandomQuote]);
        } else if (data.quote && data.author) {
            renderData(data);
        } else {
            quoteContainer.textContent = "No quote available";
        }
    } catch (error) {
        quoteContainer.textContent = "Error loading quote";
        console.error('Error fetching quote:', error);
    }
}

const renderData = (quotePair) => {
    quote.textContent = quotePair.quote;
    author.textContent = quotePair.author;
}

nextBtn.addEventListener("click", fetchQuote)


quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newQuote = document.getElementById("quote").value.trim();
    const newAuthor = document.getElementById("author").value.trim();
    const outcomeText = document.getElementById("outcome");

    if (!newAuthor || !newQuote) {
        outcomeText = `Both quote and author are required!`;
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quote:newQuote, author:newAuthor })

        });
        const data = await response.json();
        outcomeText.innerText = `Quote added successfully!`;

       quoteForm.reset();
    } catch(err) {
       outcomeText.innerText =`Error: ${err.message}`; 
    }
})
fetchQuote()
