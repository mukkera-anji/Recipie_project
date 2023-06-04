//https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
//df133c4c-13f9-42a4-8039-7c4c562f3f59

//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=df133c4c-13f9-42a4-8039-7c4c562f3f59


const searchBtn=document.getElementById("btnSearch")
const searchInput=document.getElementById("searchInput")
const  leftcontainer=document.getElementById("left_container")
const rightcontainer=document.getElementById("right-container")

searchBtn.addEventListener("click",()=>{

    getRecipieData()
})

 async function getRecipieData(){
try{
    let searchItem=searchInput.value
    const response= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchItem}&key=df133c4c-13f9-42a4-8039-7c4c562f3f59`)
const recipieData= await response.json()
const recepiearray=recipieData.data.recipes;
recepiearray.map(function(i){
    //console.log(i);
    const mypublisher=i.publisher
   const myurl= i.image_url
    const mytitle=i.title
    const myId=i.id
    //console.log(myId);
   


    return leftcontainer.insertAdjacentHTML("afterbegin",`
   <a href="#${myId}" id="myanchor">
   <div id="leftfoodcontainer">
   <img src="${myurl}" id="myimage">
   <h2 id="mypublisher">${mypublisher}</h2>
   <h3 id="myds">${mytitle}</h3>
   </div>
   </a>
    
    `)

})

}
catch(e){
    alert(e);
}
}

//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09


async function loadrecipe(){

   
//collecting hash id over here
const hashId=window.location.hash.slice(1)

//console.log(hashId);


    const response= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${hashId}`)

    const particularRecipe=await response.json()
   // console.log(particularRecipe.data.recipe);
    const RecipeObject={
       imageUrl:particularRecipe.data.recipe.image_url,
       pulisher:particularRecipe.data.recipe.publisher,
       title:particularRecipe.data.recipe.title       ,
       servings:particularRecipe.data.recipe.servings,
       cooking_time:particularRecipe.data.recipe.cooking_time,
       ingredients:particularRecipe.data.recipe.ingredients


    }
    //console.log(RecipeObject.ingredients);

    rightcontainer.innerText=""

   const rightData= `
    <div id="Rightcontainer">
    <img src="${RecipeObject.imageUrl}" id="rightimg">
    <h2 id="righttile"> Title:${RecipeObject.title} </h2>
    <h3  id="rightpublisher"Publisher:>${RecipeObject.pulisher}</h3>
    <h3 id="rightservings">Servings:${RecipeObject.servings}</h3>
    <h3 id="rightcookingTime">Cooking-Time:${RecipeObject.cooking_time}</h3>

    <div class="ingrediants">
         ${RecipeObject.ingredients.map(function(i){
          // console.log(i);
          ` <div>
          <span>${i.description} </span>
          <span>${i.quantity}</span>
          <span>${i.description} </span>
          </div>`
         })}

    </div>
    
    </div>
     `


return rightcontainer.insertAdjacentHTML("afterbegin",rightData)









}
loadrecipe()

window.addEventListener("hashchange",loadrecipe)


