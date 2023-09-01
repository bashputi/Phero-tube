const handleCategory = async () => {
 
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    
    data.data.forEach((category) => {
       console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
        <button class="btn shadow-lg mx-3"><a class="tab">${category.category} </a> </button>
        `;
        tabContainer.appendChild(div);
    });


};


handleCategory();
