document.addEventListener("DOMContentLoaded",

function createMenu() {

    function MenuItem(item,price){

        this.name = item;
        this.price = price;
        this.addItem = addItem;
        this.quantity = quantity;
        this.subTotal = subTotal;
        this.orderSummary = orderSummary;

    }

    function addItem() {

        var name = document.createTextNode(this.name);
        var price = document.createTextNode("$"+this.price);

        var li = document.createElement("li");
        var label = document.createElement("label");
        var p = document.createElement("p");
        var input = document.createElement("input");

        var container = document.getElementById("formList");

        label.appendChild(name);
        label.setAttribute("for",this.name);

        p.appendChild(price);

        input.setAttribute("type","number");
        input.setAttribute("min","0");
        input.setAttribute("value","0");
        input.setAttribute("class","qBox")
        input.setAttribute("id",this.name);  

        li.appendChild(label);
        li.appendChild(p);
        li.appendChild(input);
         
        container.appendChild(li);
    }

    function quantity() {

        var quantity = document.getElementById(this.name).value;

        return quantity;
    }

    function subTotal() {

        var subTotal = this.quantity() * this.price;

        return subTotal;
    }

    function orderSummary() {

        var order = this.name+" x "+ this.quantity();
    
        return order;
    }


    item1 = new MenuItem("Hotdogs",4);
    item2 = new MenuItem("Fries",3.5);
    item3 = new MenuItem("Soda",1.5);
    item4 = new MenuItem("Sauerkraut",1);

    priceList = [item1,item2,item3,item4]

        for (i in priceList)

        priceList[i].addItem();
    

    var button = document.getElementById("subMenu");
    var box = document.getElementById("orderSummary");
    var total = 0;

    button.addEventListener("click", submitOrder, {once:true}) 

        function submitOrder() {
            checkTotal();
            getMessage();
        }
    
        function checkTotal() {

            for (i in priceList)

            total += priceList[i].subTotal()
        }

        function getMessage() {

            box.classList.remove("collapsed");

            if (total > 0)

            {box.innerHTML = "Thank you for ordering: <br/>"

            for (i in priceList)

                if (priceList[i].subTotal()>0)
                   
                box.innerHTML += "<li>"+priceList[i].orderSummary()+"</li>"
            
            box.innerHTML += "for a total of $"+total}
            
            else

            {box.innerHTML = "You have not selected any items!"}
        
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

});


