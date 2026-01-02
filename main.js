document.addEventListener("DOMContentLoaded", () => {

    const findinput = document.getElementById("findinput");
    const resultDiv = document.getElementById("result")
    const errorDiv = document.getElementById("error")
    const getrecipeData = document.getElementById("getrecipeData")
    



    getrecipeData.addEventListener("click", async () => {
       
         resultDiv.style.display = "none";
         resultDiv.innerHTML = "";
        errorDiv.textContent = "";

        const recipe = findinput.value.trim().toLowerCase()


        if (!recipe) {
            errorDiv.textContent = "plese Enter a recipe name"
            return;
        }
        // const url = `http://localhost:3000/recipes`;




        // Error Handeling 

        //   try catch method 

        try {
            const response = await fetch("http://localhost:3000/recipes");
            const data = await response.json();


            const filteredRecipes = data.filter(item =>
                item.name.toLowerCase().includes(recipe)
            );

            if (filteredRecipes.length === 0) {
                errorDiv.textContent = "No recipe found!";
                return;
            }

            filteredRecipes.forEach(data => {
                resultDiv.innerHTML += `
      <div class="recipe-card">
  <img src="${data.image}" class="recipe-img" alt="recipe">
  <div class="card-body">
    <h5 class="card-title">Name: ${data.name}</h5>
    <p>Category: ${data.category}</p>
    <p>Rating: ${data.rating}</p>
    <p>Ingredients: ${data.ingredients}</p>
    <button class="save-btn" onclick='saveRecipe(${JSON.stringify(data)})'>
      Save
    </button>
  </div>
</div>
`;
                // resultDiv.style.display = "block";
                resultDiv.style.display = "flex";
                resultDiv.style.justifyContent = "center"
                resultDiv.style.gap = "20px"
                 
            });
        } catch (error) {
            resultDiv.style.display = "none";
            errorDiv.textContent = `Error : ${error}`;
        }
    });

  
     
});


// save recipe function 
function saveRecipe(recipe) {
  fetch("http://localhost:3000/savedRecipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  })
  .then(() => alert("Recipe Saved Successfully!"))
  .catch(err => console.log(err));
}



