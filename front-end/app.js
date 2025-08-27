
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteContainer = document.querySelector(".main-container");
const nextBtn = document.querySelector("#next-btn")
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

fetchQuote()
