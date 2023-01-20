
let filter = document.getElementById("filter");
let result = document.getElementById("result");
let listItems = [];

let asyncFunction = async () => {
  let response = await fetch("https://reqres.in/api/users?page=2");
  if (response.status !== 200) {
    throw response.status;
  }
  let responseData = await response.json();
  return responseData;
};

asyncFunction()
  .then((responseData) => {
    responseData.data.forEach((element) => {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = element.avatar;
      img.style.display = 'flex';
      li.textContent = `${element.email}`;
      li.appendChild(img);
      listItems.push(li);
      result.appendChild(li);
    });
  })
  .catch((error) => console.log("rejected", error));

function filterData(searchSymbol) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchSymbol.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

filter.addEventListener("keyup", function (event) {
  filterData(event.target.value);
});