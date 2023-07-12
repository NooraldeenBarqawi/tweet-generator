const quoteContaniner=document.getElementById("quote-container")
const quoteText=document.getElementById("quote")
const authorText=document.getElementById("author")
const twitterBtn=document.getElementById("twitter")
const newQuoteBtn=document.getElementById("new-quote")
const loader=document.getElementById("loader")
let apiQuotes=[]
function loading(){
    loader.hidden = false
    quoteContaniner.hidden=true
}
function complete(){
    quoteContaniner.hidden=false
    loader.hidden=true
}
function newQuote(){
    loading();
    let c=apiQuotes.length
    let ind=Math.floor(Math.random()*c);
    const quote=(apiQuotes[ind]);
    authorText.textContent=quote.author

    quoteText.textContent=quote.text
    complete();
    if (quote.text.length > 120){
        quoteText.textContent.add("long-quote");
    }else{
        quoteText.textContent.remove("long-quote");
    }

}


async function getQuote(){
    loading();
    const apiurl="https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
       const response=await fetch(apiurl);
       apiQuotes=await response.json();
       newQuote();

    } catch(error){

    }
}
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}
newQuoteBtn.addEventListener("click",newQuote)
twitterBtn.addEventListener("click",tweetQuote)
getQuote();
