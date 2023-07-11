import React, { useEffect, useState } from "react";

function QuoteBox() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [postText, setPostText] = useState("");

    useEffect(() => {
        newQuoteHandler()
    }, []);

    //Fetch Quotes from QuoteGarden
    const fetchQuote = async() => {
        return fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
            .then(response => response.json())
            .then(data => data.data[0])
            .catch(error => console.error(error));
    };

    //Handler for every new Quote
    const newQuoteHandler = () => {
        fetchQuote()
        .then(response => {
            setQuote(response.quoteText);
            setAuthor(response.quoteAuthor);
            setPostText(response.quoteText + ' -' + response.quoteAuthor);
        })
    };

    //Make new urls
    const encodedText = encodeURIComponent(postText);
    const TwitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    const TumblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=&caption=&content=${encodedText}`;

    return (
        <div id="quote-box">
            <div className="quote-text">
                <i className="fa fa-quote-left"> </i> <span id="text">{quote}</span>
            </div>
            <div className="quote-author">- <span id="author">{author}</span></div>
            <div className="buttons">
                <a className="button" id="tweet-quote" title="Tweet this quote!" target="_blank" href={TwitterUrl}>
                    <i className="fa fa-twitter"></i>
                </a>
                <a className="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" href={TumblrUrl}>
                    <i className="fa fa-tumblr"></i>
                </a>
                <button className="button" id="new-quote" onClick={newQuoteHandler}>New quote</button>
            </div>
            <p className="quote-author"> -by r4cc</p>
      </div>
    )

    
}

export default QuoteBox