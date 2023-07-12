import React, { useEffect, useState } from "react";
import $ from 'jquery';
window.$ = $;

function QuoteBox() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [postText, setPostText] = useState("");

    useEffect(() => {
        newQuoteHandler();
    }, []);

    //Handler for every new Quote
    const newQuoteHandler = () => {

        fetchQuote()
        .then(response => {
            setQuote(response.quoteText);
            setAuthor(response.quoteAuthor);
            setPostText(response.quoteText + ' -' + response.quoteAuthor);
        })

        animateCss();
    };

    //Fetch Quotes from QuoteGarden
    const fetchQuote = async() => {
        return fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
            .then(response => response.json())
            .then(data => data.data[0])
            .catch(error => console.error(error));
    };

    const animateCss = () => {
        
        // Generate random RGB values between 0 and 255
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
      
        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;
        document.documentElement.style.setProperty('--random-color', color);
        
        $('.quote-text').animate({ opacity: 0 }, 500, function () {
            $(this).animate({ opacity: 1 }, 500);
          });
        
        $('.quote-author').animate({ opacity: 0 }, 500, function () {
            $(this).animate({ opacity: 1 }, 500);
          });


    }

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
            <p className="program-author"> -by r4cc</p>
      </div>
    )

    
}

export default QuoteBox