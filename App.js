import React, { useState } from 'react';
import './App.css';

const moviesData = [
  { id: 1, title: "Интерстеллар", genre: "Научная фантастика", rating: 8.6, img: "https://via.placeholder.com/200x300" },
  { id: 2, title: "Начало", genre: "Боевик", rating: 8.8, img: "https://via.placeholder.com/200x300" },
  { id: 3, title: "Дюна", genre: "Приключения", rating: 8.1, img: "https://via.placeholder.com/200x300" },
  { id: 4, title: "Бэтмен", genre: "Криминал", rating: 7.9, img: "https://via.placeholder.com/200x300" },
];

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1>CineFlex</h1>
        <input type="text" placeholder="Поиск фильма..." className="search-input" />
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h2>Дюна: Часть вторая</h2>
          <p>Смотрите во всех залах с 1 марта</p>
          <button className="btn-main">Купить билет</button>
        </div>
      </header>

      <main className="container">
        <h3>Сейчас в прокате</h3>
        <div className="movie-grid">
          {moviesData.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={movie.img} alt={movie.title} />
              <div className="movie-info">
                <h4>{movie.title}</h4>
                <span>{movie.genre}</span>
                <p className="rating">⭐ {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;