'use strict';
const axios = require('axios')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    const news1 = await axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7026d13236394963856a190be5b09e5c'
    })
    news1.data.articles.forEach(el => {
      data.push({
        title: el.title,
        tag: Math.floor(Math.random() * (22 - 1 + 1)) + 1,
        userId: 1,
        content: el.content,
        img: el.urlToImage,
        status: 'Active',
        publishedAt: el.publishedAt.slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    const news2 = await axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/everything?domains=techcrunch.com&apiKey=7026d13236394963856a190be5b09e5c'
    })
    news2.data.articles.forEach(el => {
      data.push({
        title: el.title,
        tag: Math.floor(Math.random() * (22 - 1 + 1)) + 1,
        userId: 1,
        content: el.content,
        img: el.urlToImage,
        status: 'Active',
        publishedAt: el.publishedAt.slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    const news3 = await axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/everything?sources=techcrunch&apiKey=7026d13236394963856a190be5b09e5c'
    })
    news3.data.articles.forEach(el => {
      data.push({
        title: el.title,
        tag: Math.floor(Math.random() * (22 - 1 + 1)) + 1,
        userId: 1,
        content: el.content,
        img: el.urlToImage,
        status: 'Active',
        publishedAt: el.publishedAt.slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    await queryInterface.bulkInsert("Articles", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
