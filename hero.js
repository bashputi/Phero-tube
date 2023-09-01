const handleCategory = async () => {
 
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    
    data.data.forEach((category) => {
//    console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="handleLoadNews('${category.category_id}')" class="btn 
        shadow-lg mx-3 mt-6">
       <a  class="tab">${category.category} </a> </button>
        `;
        tabContainer.appendChild(div);
    });
};

const handleLoadNews = async (categoryId) => {

     const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
     const data = await response.json();
//  console.log(data);
    const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = "";

    data.data.forEach((news) => {
//         // console.log(news);
//          console.log(news);
        
        
    const div = document.createElement("div");
    div.classList = `card card-compact ml-14 md:ml-8 lg:ml-1 w-96 bg-base-100 w-[312px] h-[300px] mb-4 shadow-xl`;
    div.innerHTML = `
        <figure class="w-[312px] h-[200px]" ><img src="${news?.thumbnail}" class="card card-compact" alt="video" /></figure>
        <span class="bg-black text-white w-[100px]">222222</span>
        <div class="card-body grid grid-cols-2">
            <div>
                <img src="${news?.authors[0].profile_picture}" class="rounded-full w-10 h-10" >
            </div>
            <div class="-ml-20">
                <h2 class="card-title">${news.title}</h2>
            <p>${news?.authors[0].profile_name}</p><span></span>
            <p>${news.others.views}</p>
            </div>
        </div>`;
         cardContainer.appendChild(div);
    

   });


};

 handleCategory();
  handleLoadNews('1000');