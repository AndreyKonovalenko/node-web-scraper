const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');



const options = {
  url: 'https://www.freecodecamp.org/forum/directory_items?period=weekly&order=likes_received&_=1563803570539',
  json: true
};

rp(options)
  .then((data) => {
    let userData = [];
    for (let user of data.directory_items) {
      userData.push({ name: user.user.username, likes_received: user.likes_received });
    }
    process.stdout.write('loading');
    printToTable(userData);
    //getChallengesCompletedAndPushToUserArray(userData);
  })
  .catch((err) => {
    console.log(err);
  });

const printToTable = (userData) => {
  let table = new Table({
    head: ['username', 'haerts'],
    colWidths: [15, 5]
  });
  for (let i = 0; i < userData.length; i++) {
    table.push([userData[i].name, userData[i].likes_received]);
  }
  console.log(table.toString());
}

// function getChallengesCompletedAndPushToUserArray(userData) {
//   let i = 0;

//   function next() {
//     if (i < userData.length) {
//       let options = {
//         url: `https://www.freecodecamp.org/forum/u/` + userData[i].name + `/sammery`,
//         // transform: body => cheerio.load(body)
//       };
//       rp(options)
//         .then(function() {
//           process.stdout.write(`.`);
//           // const fccAccount = $('h1.landing-heading').length == 0;
//           // const challengesPassed = fccAccount ? $('tbody tr').length : 'unknown';
//           table.push([userData[i].name, userData[i].likes_recived]);
//           ++i;
//           return next();
//         });
//     }
//     else {
//       printData();
//     }
//   }
//   return next();
// }

// function printData() {
//   console.log('checbox');
//   console.log(table.toString());

// }
