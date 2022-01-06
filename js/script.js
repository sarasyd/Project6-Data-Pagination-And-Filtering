
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const perPage = 9; //Set one page with 9 

function showPage(list, page) {

   const startIndex = (page * perPage) - perPage;
   const endIndex = (page * perPage);
   const studentList = document.querySelector('.student-list');
   let studentItem = '';

   //if there is no data to display, it should show "No results found"
   studentList.innerHTML = "<p>No results found</p>";

   if(list.length > 0) {
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            studentItem += `
            <li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
              <h3>${list[i].name.first + ' ' + list[i].name.last}</h3>
              <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${list[i].registered.date}</span>
            </div>
          </li>`;
         }
      }
      studentList.innerHTML = studentItem;
   }
}

// console.log(showPage(data,2));
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / perPage);
   const linkList = document.querySelector('.link-list');

   let button = '';
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      button += `
      <li>
         <button type="button" ${(i==1)?"class=active":""}>${i}</button>
      </li>
      `
   }
   linkList.insertAdjacentHTML('beforeend', button);

   // let firstButton = document.querySelector('.link-list button');
   // firstButton.className = 'active';

   //Create click button event Listener
   linkList.addEventListener('click', (event) => {

      if (event.target.tagName == 'BUTTON') {
         let activeButton = document.querySelector('.active');
         activeButton.className = '';
         event.target.className = 'active';
         showPage(list, event.target.textContent);
      }
   });

}

/*
   Create the `addSearchComponent` function
   This function will create the serch bar on the web page and add keyup event listener
*/
function addSearchComponent() {

   const searchList = document.querySelector('.header');
   let SearchComponent = '';

   SearchComponent = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button" onclick=onSearchClick()><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`

 searchList.insertAdjacentHTML('beforeend',SearchComponent);

 document.getElementById("search").addEventListener("keyup", onSearchClick);
}

/*
   Create the `onSearchClick` function
   This function will create the newStudentList
*/
function onSearchClick(){
   var keywords = document.getElementById("search").value.toUpperCase().trim();
   let newStudentList = [];

   data.forEach(item => {
      var name = item.name.first + ' ' + item.name.last;
      if(name.toUpperCase().includes(keywords)){
         newStudentList.push(item);
      }
   });
   
   showPage(newStudentList, 1);
   addPagination(newStudentList);
}

function loadPage(data){
   // Call functions
   showPage(data, 1);
   addPagination(data);
   addSearchComponent();
}

loadPage(data);