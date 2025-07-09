import React, { useState, useEffect } from 'react';

const quotes = [
  "The only way to do great work is to love what you do",
  "Developers are problem solvers and discoverers.",
  "Start now. There is no perfect time.",
  "Good code is worth more than good documentation.",
  "Solving difficult problems is an opportunity to test a developer's creativity and perseverance.",
  "Failure is the starting point of learning."
];

const Quote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return <blockquote className="quote">💬 {quote}</blockquote>;
};

export default Quote;
