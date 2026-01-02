document.addEventListener("DOMContentLoaded", async() =>{
    const savedResult= document.getElementById("savedResult")



     try {
            const response = await fetch("http://localhost:3000/savedRecipes");
            const data = await response.json();


           

            if (data.length === 0) {
               savedResult.innerHTML = "<h4>No Saved Recipes</h4>";
                return;
            }

            data.forEach(data => {
                savedResult.innerHTML += `
      <div class="recipe-card">
  <img src="${data.image}" class="recipe-img" alt="recipe">
  <div class="recipe-body">
    <h5 class="recipe-title">Name: ${data.name}</h5>
    <p>Category: ${data.category}</p>
    <p>Rating: ${data.rating}</p>
    <p>Ingredients: ${data.ingredients}</p>
  </div>
</div>
`;
                // resultDiv.style.display = "block";
                savedResult.style.display = "flex";
                savedResult.style.justifyContent = "center"
                savedResult.style.gap = "20px"
                 
            });
        } catch (error) {
           savedResult.innerHTML = `<p>Error loading saved recipes</p>`;
    console.log(error);
        }
    });

