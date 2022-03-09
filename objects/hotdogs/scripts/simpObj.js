document.addEventListener("DOMContentLoaded",function(){
    
  var priceList = {
      
      Hotdogs: 4,
      Fries: 3.5,
      Soda: 1.5,
      Sauerkraut: 1

  }

  for (i in priceList) addItem()

  function addItem() {

      var name = document.createTextNode(i);
      var price = document.createTextNode("$"+priceList[i]);

      var li = document.createElement("li");
      var label = document.createElement("label");
      var p = document.createElement("p");
      var input = document.createElement("input");

      var container = document.getElementById("formList");

      label.appendChild(name);
      label.setAttribute("for",i);

      p.appendChild(price);

      input.setAttribute("type","number");
      input.setAttribute("min","0");
      input.setAttribute("value","0");
      input.setAttribute("class","qBox")
      input.setAttribute("id",i);

      li.appendChild(label);
      li.appendChild(p);
      li.appendChild(input);
        
      container.appendChild(li); 
  }


  var button = document.getElementById("subMenu");
  var box = document.getElementById("orderSummary");
  var total = 0;

  button.addEventListener("click", submitOrder,{once:true})

      function submitOrder() {

          checkTotal();
          getMessage();
      }

      function checkTotal() {

          for (i in priceList)

          total += document.getElementById(i).value*priceList[i];
      }

      function getMessage() {

          box.classList.remove("collapsed");

          if (total > 0){
              
                box.innerHTML = "Thank you for ordering: <br/>"
  
                for (i in priceList) {

                    quantity = document.getElementById(i).value
                    
                    if (quantity > 0)
                    box.innerHTML+= "<li>"+i+" x "+quantity+"</li>"
                }
              
                box.innerHTML += "for a total of $"+total

                }

          else{
              
                box.innerHTML = "You have not selected any items!"}
      }

  box.addEventListener("click",setZero)

      function setZero(){

              box.innerHTML = ""
              box.classList.add("collapsed")

          var qboxes = document.querySelectorAll(".qBox");

              qboxes.forEach(function(qbox){
              qbox.value = 0;
              })

          total=0;

          button.addEventListener("click",submitOrder,{once:true})

      }

})