// getData();


// const selfies = [];

// // // sort on basis of time
// // document.getElementById('time').addEventListener('click', event => {
// //     sortData((a, b) => b.time - a.time);
// // });

// // // sort on basis of caption
// // document.getElementById('caption').addEventListener('click', event => {
// //     sortData((a, b) => {
// //         // var nameA = a.name.toUpperCase();
// //         // var nameB = b.name.toUpperCase();
// //         if (b.caption > a.caption) return -1;
// //         else return 1;
// //     });
// // });

// // function sortData(compare) {
// //     for (let item of selfies) {
// //         item.elt.remove();
// //     }
// //     selfies.sort(compare);
// //     for (let item of selfies) {
// //         document.body.append(item.elt);
// //     }
// // }

// // Fetch the data and display dynamically
// async function getData() {
//     const response = await fetch('/api');
//     const data = await response.json();


//     for (item of data) {

//         const book = document.getElementById('book');
//         const div1 = document.createElement('div');
//         div1.className = "clean-blog-post";
//         const div2 = document.createElement('div');
//         div2.className = "row";
//         const div21 = document.createElement('div');
//         div21.className = "col-lg-5";
//         const image = document.createElement('img');
//         image.src = item.image64;
//         image.alt = item.caption;
//         image.className = "rounded";
//         image.className = "img-fluid";
//         const div22 = document.createElement("div");
//         div22.className = "col-lg-7";
//         const caption = document.createElement('h3');
//         const info = document.createElement('div');
//         info.className = "info";
//         const time = document.createElement('span');
//         time.className = "text-muted";
//         const brek1 = document.createElement('br');
//         const brek2 = document.createElement('br');
//         const longi = document.createElement('span');
//         const lonval = document.createElement('span');
//         lonval.className = "text-muted";
//         const lati = document.createElement('span');
//         const latval = document.createElement('span');
//         latval.className = "text-muted";

//         div21.appendChild(image);
//         div2.appendChild(div21);

//         div22.appendChild(caption).textContent = item.caption;

//         const datestring = new Date(item.timestamp).toLocaleString();
//         info.appendChild(time).textContent = datestring;;
//         info.appendChild(brek1);
//         info.appendChild(longi);
//         info.appendChild(lonval).textContent = item.lon;
//         info.appendChild(brek2);
//         info.appendChild(lati);
//         info.appendChild(latval).textContent = item.lat;

//         div22.appendChild(info);

//         div2.appendChild(div22);

//         div1.appendChild(div2);
//         selfies.push({ elt: div1, time: item.timestamp, caption: item.caption });
//         book.appendChild(div1);
//     }
// }