let currentCategoryID = 1000;
const handleCategory = async () => {
 
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    
    data.data.forEach((category) => {
    // console.log(category.category);
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="handleDisplay('${category.category_id}')" class="btn 
        shadow-lg mx-3 mt-6">
       <a  class="tab">${category.category} </a> </button>
        `;
        tabContainer.appendChild(div);
    }); 
};

const handleDisplay = async (categoryId, viewSorting) => {

     const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
     const data = await response.json();
     const status = data.status;
    //  view sorting 
    if(viewSorting){
        data.data.sort((a, b) =>{
             const sortingA = parseInt(a.others.views);
             const sortingB = parseInt(b.others.views);
             const sortedValue = sortingB - sortingA;
             return sortedValue;
         })
        }  

    const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = "";

    data.data.forEach((news) => {

        // time conversion
     const sec = parseInt(news.others.posted_date);
     let hours = Math.floor(sec / 3600);
     let minutes = Math.floor((sec - (hours * 3600))/ 60);
                
    const div = document.createElement("div");
    div.classList = `card card-compact ml-14 md:ml-8 lg:ml-1 w-96 bg-base-100 w-[312px] h-[300px] mb-4 shadow-xl`;
    div.innerHTML = `
        <figure class="w-[312px] h-[200px] relative" ><img src="${news?.thumbnail}" class="card card-compact" alt="video" /></figure>
         <div class="grid place-items-end"> 
          <div class="bg-black place-items-end flex rounded-lg absolute text-white mb-6 mr-3 px-2"> <div class="mr-1">${hours? `${hours}hrs` : ''}</div><div>${minutes? `${minutes}min` : ''}</div>  </div>
          </div>
        <div class="card-body grid grid-cols-2">
            <div>
                <img src="${news?.authors[0].profile_picture}" class="rounded-full w-10 h-10" >
            </div>
            <div class="-ml-20">
                <h2 class="card-title">${news.title}</h2>
                <div class="flex">
               <div class="mr-3">${news?.authors[0].profile_name}</div>
               <div><img class="w-6" src="${news.authors[0].verified? `verified.png` : ''}"></div>
               </div>
               <div><p>${news.others.views}</p></div>
            </div>
        </div>`;  
         cardContainer.appendChild(div);
       
   });
      
   const noContent = document.getElementById('no-content');
   if(data.data.length === 0){
     noContent.removeAttribute("hidden");
   }
   else{
     noContent.setAttribute("hidden", true);
   }

};
const sortByView = () => {
    handleDisplay(currentCategoryID,true);
}

 handleCategory();
 handleDisplay('1000');
