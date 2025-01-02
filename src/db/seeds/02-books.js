/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// const books = require("../fixtures/books");

exports.seed = function(knex) {
  return knex
      .raw("TRUNCATE TABLE books RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("books").insert([
          // Ba Jin
          { book_title: "Destruction", publication_year: 1929, author_id: 1, in_stock: true, genre_id: 4, price: 10 },
          // Jane Austen
          { book_title: "Sense and Sensibility", publication_year: 1811, author_id: 2, in_stock: true, genre_id: 6, price: 10 },
          { book_title: "Pride and Prejudice", publication_year: 1813, author_id: 2, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Mansfield Park", publication_year: 1814, author_id: 2, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Emma", publication_year: 1815, author_id: 2, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Northanger Abbey", publication_year: 1818, author_id: 2, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Persuasion", publication_year: 1818, author_id: 2, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "The Watsons", publication_year: 1804, author_id: 2, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Sanditon", publication_year: 1817, author_id: 2, in_stock: true, genre_id: 4, price: 10 },
          // Toni Morrison
          { book_title: "The Bluest Eye", publication_year: 1970, author_id: 3, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Sula", publication_year: 1973, author_id: 3, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Song of Solomon", publication_year: 1977, author_id: 3, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Tar Baby", publication_year: 1981, author_id: 3, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Beloved", publication_year: 1987, author_id: 3, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Jazz", publication_year: 1992, author_id: 3, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Paradise", publication_year: 1997, author_id: 3, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Love", publication_year: 2003, author_id: 3, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "A Mercy", publication_year: 2008, author_id: 3, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Home", publication_year: 2012, author_id: 3, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "God Help the Child", publication_year: 1968, author_id: 3, in_stock: true, genre_id: 4, price: 10 },
          // Gabriel García Márquez
          { book_title: "In Evil Hour", publication_year: 1962, author_id: 4, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "One Hundred Years of Solitude", publication_year: 1967, author_id: 4, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "The Autumn of the Patriarch", publication_year: 1975, author_id: 4, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Love in the Time of Cholera", publication_year: 1985, author_id: 4, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "The General in His Labyrinth", publication_year: 1989, author_id: 4, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Of Love and Other Demons", publication_year: 1994, author_id: 4, in_stock: true, genre_id: 4, price: 10 },
          // Elif Shafak
          { book_title: "The Gaze", publication_year: 2000, author_id: 5, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "The Flea Palace", publication_year: 2002, author_id: 5, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "The Saint of Incipient Insanities", publication_year: 2004, author_id: 5, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "The Bastard of Istanbul", publication_year: 2006, author_id: 5, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Black Milk: On Writing, Motherhood, and the Harem Within", publication_year: 2007, author_id: 5, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "The Forty Rules of Love: A Novel of Rumi", publication_year: 2009, author_id: 5, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "Honour", publication_year: 2011, author_id: 5, in_stock: false, genre_id: 4, price: 10 },
          { book_title: "Three Daughters of Eve", publication_year: 2016, author_id: 5, in_stock: true, genre_id: 4, price: 10 },
          { book_title: "10 Minutes 38 Seconds in This Strange World", publication_year: 2019, author_id: 5, in_stock: true, genre_id: 4, price: 10 },
          // Amy Tan
          { book_title: "The Joy Luck Club", publication_year: 1989, author_id: 6, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "The Kitchen God's Wife", publication_year: 1991, author_id: 6, in_stock: false, genre_id: 1, price: 10 },
          { book_title: "The Hundred Secret Senses", publication_year: 1995, author_id: 6, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "The Bonesetter's Daughter", publication_year: 2001, author_id: 6, in_stock: false, genre_id: 1, price: 10 },
          { book_title: "Saving Fish from Drowning", publication_year: 2005, author_id: 6, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "The Valley of Amazement", publication_year: 2013, author_id: 6, in_stock: true, genre_id: 1, price: 10 },
          // Leo Tolstoy
          { book_title: "Childhood", publication_year: 1852, author_id: 7, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "Boyhood", publication_year: 1854, author_id: 7, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "Youth", publication_year: 1856, author_id: 7, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "Family Happiness", publication_year: 1859, author_id: 7, in_stock: false, genre_id: 1, price: 10 },
          { book_title: "War and Peace", publication_year: 1869, author_id: 7, in_stock: true, genre_id: 1, price: 10 },
          { book_title: "Anna Karenina", publication_year: 1877, author_id: 7, in_stock: false, genre_id: 1, price: 10 },
          { book_title: "Resurrection", publication_year: 1899, author_id: 7, in_stock: true, genre_id: 1, price: 10 },
        ]);
      });
};
