// 'use strict';
// const axios = require('axios')
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     let data = []
//     const news1 = await axios({
//       method: 'GET',
//       url: 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7026d13236394963856a190be5b09e5c'
//     })
//     news1.data.articles.forEach(el => {
//       data.push({
//         title: el.title,
//         tag: Math.floor(Math.random() * (22 - 1 + 1)) + 1,
//         userId: 1,
//         content: el.content,
//         imgThumbnail: "https://ik.imagekit.io/fjaskqdnu0xp/image_21__1__w4ybLjp7iEO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643296033734",
//         img: "https://ik.imagekit.io/fjaskqdnu0xp/JUNE-5-4_fX-gmqN51.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1643867282336",
//         status: 'Active',
//         publishedAt: el.publishedAt.slice(0, 10),
//         createdAt: new Date(),
//         updatedAt: new Date()
//       })
//     })
//     const news2 = await axios({
//       method: 'GET',
//       url: 'https://newsapi.org/v2/everything?q=tesla&apiKey=7026d13236394963856a190be5b09e5c'
//     })
//     news2.data.articles.forEach(el => {
//       data.push({
//         title: el.title,
//         tag: Math.floor(Math.random() * (22 - 1 + 1)) + 1,
//         userId: 1,
//         content: el.content,
//         imgThumbnail: "https://ik.imagekit.io/fjaskqdnu0xp/image_21__1__w4ybLjp7iEO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643296033734",
//         img: "https://ik.imagekit.io/fjaskqdnu0xp/JUNE-5-4_fX-gmqN51.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1643867282336",
//         status: 'Active',
//         publishedAt: el.publishedAt.slice(0, 10),
//         createdAt: new Date(),
//         updatedAt: new Date()
//       })
//     })
//     const news3 = await axios({
//       method: 'GET',
//       url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=7026d13236394963856a190be5b09e5c'
//     })
//     news3.data.articles.forEach(el => {
//       data.push({
//         title: el.title,
//         tag: Math.floor(Math.random() * (22 - 1 + 1)) + 1,
//         userId: 1,
//         content: el.content,
//         imgThumbnail: "https://ik.imagekit.io/fjaskqdnu0xp/image_21__1__w4ybLjp7iEO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643296033734",
//         img: "https://ik.imagekit.io/fjaskqdnu0xp/JUNE-5-4_fX-gmqN51.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1643867282336",
//         status: 'Active',
//         publishedAt: el.publishedAt.slice(0, 10),
//         createdAt: new Date(),
//         updatedAt: new Date()
//       })
//     })
//     await queryInterface.bulkInsert("Articles", data)
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Articles', null, {});
//   }
// };
