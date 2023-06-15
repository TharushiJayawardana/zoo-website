//Ticket Purchase

var adult_ticket_price = [1000, 500, 5000]; //prices of adult ticket passes
var child_ticet_price = [500, 250, 2500]; //prices of child  ticket passes
var duration_price = [250, 500, 1000]; //prices for extra duration (Adult or child) //3hrs default
var extra_price = [5000, 500,]; //prices for extra add-ons


function calculateCost(){
    var total_amount = 0;

    //Get the value of the element and store in the variable
    var ticketType = document.getElementById("cmbticketType").value;
    var adult = document.getElementById("txtadult").value;
    var child = document.getElementById("txtchild").value;
    var timeDuration = document.getElementById("cmbtimeDuration").value;
    var annualPass = document.getElementById("chkannualPass");
    var foodToken = document.getElementById("chkfoodToken");
    var no_of_pass = document.getElementById("txtnoofannualpass").value;   
    var no_of_tokens = document.getElementById("txtnooffoodToken").value;   
    
    //If ticket type is not choosen
    if(ticketType == " "){
        //Show message
        alert("PLEASE SELECT A SPECIFIC TICKET TYPE !");
        document.getElementById("ticketType").focus();
        return;
    }
    
    //If 
    if (adult & child & no_of_tokens == " "){
        adult = 0;
        child = 0;
        no_of_tokens = 0;
        no_of_pass = 0;
    }
    else{
        adult = parseInt(adult); //Convert to string to integer
        child = parseInt(child); //Convert to string to integer
        no_of_pass = parseInt(no_of_pass);
        no_of_tokens = parseInt(no_of_tokens);
    }

    //Convert to string to integer
    ticketType = parseInt(ticketType);
    

    //Access the array using user inputed index no
    var adult_price = adult_ticket_price[ticketType]; 
    var child_price = child_ticet_price[ticketType];
    
    //Multiply the stored price from given no of adults and children
    adult_price = (adult_price * adult);
    child_price = (child_price * child);

    //Store the total ticket price of both adult and child together
    total_amount = (adult_price + child_price);

    //Since the 3hrs duration is defualt, total ticket price won't be change, So if not
    if(timeDuration != " "){
        //Convert to string to integer
        timeDuration = parseInt(timeDuration);
        //Add the chosen duration price to the ticket price
        total_amount = total_amount + duration_price[timeDuration];
    }

    //If the food token checkbox checked 
    if(foodToken.checked){
        //Show the label and textbox, user to enter the number of tokens
        document.getElementById("nofoodToken").style.visibility='visible';
        document.getElementById("nofoodToken").style.display='inline';
        //Multyply the # of tokens from the price(Taken from the index [1] value from array) and add to total amount and store in total amount
        total_amount = (total_amount) + (extra_price[1] * no_of_tokens);
        
    }
    else{ //If not,
        //Hide the label and textbox.
        document.getElementById("nofoodToken").style.visibility='hidden';
        document.getElementById("nofoodToken").style.display='none';
        //Total amount won't change
        total_amount = total_amount;
    }

    if(annualPass.checked){ //If the food token checkbox checked 
        //Show the label and textbox, user to enter the number of passes
        document.getElementById("noannualpass").style.visibility='visible';
        document.getElementById("noannualpass").style.display='inline';
        total_amount = (total_amount) + (extra_price[0] * no_of_pass);

    }
    else{ //If not,
        //Hide the label and textbox.
        document.getElementById("noannualpass").style.visibility='hidden';
        document.getElementById("noannualpass").style.display='none';

        //Total amount won't change
        total_amount = total_amount;
    }

    //Convert to float
    total_amount = parseFloat(total_amount);

    document.getElementById("spamount").innerHTML = total_amount.toFixed(2);
    

}

function addToOrder(){

    var total = parseFloat(document.getElementById("spamount").innerHTML);
    if(total == 0){
        alert("PLEASE, SELECT THE ITEMS FIRST!");
        return;
    }

    document.getElementById("order_sum").style = 'display:block';
    var grand_total = parseFloat(document.getElementById("spgrandtotal").innerHTML);   

    var no_of_pass = document.getElementById("txtnoofannualpass").value;   
    var no_of_tokens = document.getElementById("txtnooffoodToken").value;  


    var ctrl_ticketType = document.getElementById("cmbticketType");
    var ticketType_name = ctrl_ticketType.options[ctrl_ticketType.selectedIndex].text;

    var ctrl_timeDuration = document.getElementById("cmbtimeDuration");
    var timeDuration_type = ctrl_timeDuration.options[ctrl_timeDuration.selectedIndex].text;

    var tbody = document.getElementById("tbody_order");
    var trow1 = tbody.insertRow(-1);

    td1 = trow1.insertCell(0);
    td1.innerHTML = ticketType_name;

    td2 = trow1.insertCell(1);
    td2.innerHTML = document.getElementById("txtadult").value;

    td3 = trow1.insertCell(2);
    td3.innerHTML = document.getElementById("txtchild").value;
 
    td4 = trow1.insertCell(3);
    td4.innerHTML = timeDuration_type;

    var no_of_pass = document.getElementById("txtnoofannualpass").value;   


    if(no_of_pass != "0"){
        td5 = trow1.insertCell(4);
        td5.innerHTML = no_of_pass;
    }
    else{
        td5 = trow1.insertCell(4);
        td5.innerHTML = "0";

    }

    var no_of_tokens = document.getElementById("txtnooffoodToken").value; 

    if(no_of_tokens != "0"){
        td6 = trow1.insertCell(5);
        td6.innerHTML = no_of_tokens;
    }
    else{
        td6 = trow1.insertCell(5);
        td6.innerHTML = "0";

    }

    grand_total = grand_total + total;

    td7 = trow1.insertCell(6);
    total = total.toFixed(2);
    td7.innerHTML = total.toLocaleString('en-US');
    td7.style = "text-align:right";

    td8 = trow1.insertCell(7);
    td8.innerHTML = "<a href = 'javascript:void(0)' style = 'color:red'; onclick = 'removeRecord(this.parentElement);'> <i class='fa fa-trash'></i></a>";

    grand_total = grand_total.toFixed(2)
    document.getElementById("spgrandtotal").innerHTML = grand_total;
    resetPurchaseForm();

}

function resetPurchaseForm(){
    document.getElementById("frmpurchase").reset();
    document.getElementById("spamount").innerHTML = "0.00"
}

function removeRecord(item){
    var result = confirm("Do You Want To Remove This Record? ");
    if(result == true){
        var table = document.getElementById("tbl_order");
        var grand_total = parseFloat(document.getElementById("spgrandtotal").innerHTML);
        var total = item.parentElement.cells[6].innerHTML;
        grand_total = grand_total - total;
        document.getElementById("spgrandtotal").innerHTML = grand_total.toFixed(2);        
        table.deleteRow(item.parentElement.rowIndex);

    }
   
}

function placeOrder(){   

    var fullname = document.getElementById("txtfname").value;
    var emailaddress = document.getElementById("txtemail").value;
    var address = document.getElementById("adr").value;
    var contactnum = document.getElementById("contact").value;

    var cardname = document.getElementById("cname").value;
    var cardnum = document.getElementById("ccnum").value;
    var expiremonth = document.getElementById("expmonth").value;
    var expireyear = document.getElementById("expyear").value;
    var cvv = document.getElementById("cvv").value;



    if(fullname=="" || fullname.length<5 ){
        alert("Please enter your full name");
        document.getElementById("txtfname").focus();
        return false;
    }

    if(emailaddress.indexOf("@")==-1 || emailaddress.indexOf(".")==-1){
        alert("Please enter valid email address");
        document.getElementById("txtemail").focus();
        return false;
    }

    if(address=="" ){
        alert("Please enter the home address");
        document.getElementById("adr").focus();
        return false;
    }

    if(contactnum=="" ){
        alert("Please enter contact number");
        document.getElementById("contact").focus();
        return false;
    }

    if(cardname=="" || cardname.length<5 ){
        alert("Please enter your full name on card");
        document.getElementById("cname").focus();
        return false;
    }

    if(cardnum=="" || cardnum.length<5 ){
        alert("Please enter valid credit card number");
        document.getElementById("ccnum").focus();
        return false;
    }

    if(expiremonth == "")
    {
        alert("Please enter the expire month");
        document.getElementById("expmonth").focus();
        return false;
    }

    if(expireyear == "")
    {
        alert("Please enter the expire year");
        document.getElementById("expyear").focus();
        return false;
    }

    if(cvv == "" || cvv.length <= 3)
    {
        alert("Please enter the CVV number");
        document.getElementById("expyear").focus();
        return false;
    }

    var confirm_alert = confirm("Are You Sure You Want to Confirm the Order? ");
    if(confirm_alert == true){
        
        alert("THANK YOU FOR PLACE A CUSTOM RESERVATION WITH US !\nHOPE YOU ENJOY THE DAY ! \n                                  - DEHIWALA ZOO")
    }
    resetPurchaseForm();
    document.getElementById("order_sum").style = 'display:none';

}

function addToFavourites(){

    //Get the value of the element and store in the variable
    var ticketType = document.getElementById("cmbticketType").value;
    var adult = document.getElementById("txtadult").value;
    var child = document.getElementById("txtchild").value;
    var timeDuration = document.getElementById("cmbtimeDuration").value;
    var annualPass = document.getElementById("chkannualPass");
    var foodToken = document.getElementById("chkfoodToken");
    var no_of_pass = document.getElementById("txtnoofannualpass").value;   
    var no_of_tokens = document.getElementById("txtnooffoodToken").value;   

    var total_amount = 0;


     //If ticket type is not choosen
     if(ticketType == " "){
        //Show message
        alert("PLEASE SELECT A SPECIFIC TICKET TYPE !");
        document.getElementById("ticketType").focus();
        return;
    }

    //If 
    if (adult & child & no_of_tokens == " "){
        adult = 0;
        child = 0;
        no_of_tokens = 0;
        no_of_pass = 0;
    }
    else{
        adult = parseInt(adult); //Convert to string to integer
        child = parseInt(child); //Convert to string to integer
        no_of_pass = parseInt(no_of_pass);
        no_of_tokens = parseInt(no_of_tokens);
    }

    ticketType = parseInt(ticketType);

    //Access the array using user inputed index no
    var extra_add = duration_price[timeDuration];

    var ctrl_ticket = document.getElementById("cmbticketType");
    var ticket_type = ctrl_ticket.options[ctrl_ticket.selectedIndex].text;

    localStorage.setItem("Ticket_Type" , ticket_type);

    //Access the array using user inputed index no
    var adult_price = adult_ticket_price[ticketType]; 
    var child_price = child_ticet_price[ticketType];

    //Multiply the stored price from given no of adults and children
    adult_price = (adult_price * adult);
    child_price = (child_price * child);

    localStorage.setItem("No_of_adult" , adult);
    localStorage.setItem("No_of_child" , child);


    total_amount = (adult_price + child_price);


    var ctrl_duration = document.getElementById("cmbtimeDuration");
    var duretion_type = ctrl_duration.options[ctrl_duration.selectedIndex].text;

    localStorage.setItem("Duration_Type" , duretion_type);

    //Since the 3hrs duration is defualt, total ticket price won't be change, So if not
    if(timeDuration != " "){
        //Convert to string to integer
        timeDuration = parseInt(timeDuration);
        //Add the chosen duration price to the ticket price
        total_amount = total_amount + duration_price[timeDuration];
    }

    //If the food token checkbox checked 
    if(foodToken.checked){
        //Show the label and textbox, user to enter the number of tokens
        document.getElementById("nofoodToken").style.visibility='visible';
        document.getElementById("nofoodToken").style.display='inline';

        localStorage.setItem("No_Of_Tokens" , no_of_tokens);  

        //Multyply the # of tokens from the price(Taken from the index [1] value from array) and add to total amount and store in total amount
        total_amount = (total_amount) + (extra_price[1] * no_of_tokens);

    }
    else{ //If not,
        //Hide the label and textbox.
        document.getElementById("nofoodToken").style.visibility='hidden';
        document.getElementById("nofoodToken").style.display='none';
        //Total amount won't change
        total_amount = total_amount;
    }

    if(annualPass.checked){ //If the food token checkbox checked 
        //Show the label and textbox, user to enter the number of passes
        document.getElementById("noannualpass").style.visibility='visible';
        document.getElementById("noannualpass").style.display='inline';

        localStorage.setItem("No_Of_Pass" , no_of_pass);        
        total_amount = (total_amount) + (extra_price[0] * no_of_pass);

    }
    else{ //If not,
        //Hide the label and textbox.
        document.getElementById("noannualpass").style.visibility='hidden';
        document.getElementById("noannualpass").style.display='none';

        //Total amount won't change
        total_amount = total_amount;
    }

    //Convert to float
    total_amount = parseFloat(total_amount).toFixed(2);

    localStorage.setItem("Total_Amount" , total_amount);  
    
    
    if(adult>3 || child>3 ||  no_of_pass>0 || no_of_tokens>3){
        loyaltypointA = adult * 20 ;
        loyaltypointC = child * 20 ;
        loyaltypointAnnual = no_of_pass * 20;
        loyaltypointfood = no_of_tokens *20;

        
        var locapoint = parseInt(localStorage.getItem("Loyaltypoints")) + (loyaltypointA+loyaltypointC+loyaltypointAnnual+loyaltypointfood);
        
        localStorage.setItem("Loyaltypoints" , locapoint);
    }


    resetPurchaseForm();
    alert("Order successfully added to the favourites !")


}

function orderFavourites(){
    document.getElementById("order_sum").style = "display:block";

    var annualPass = document.getElementById("chkannualPass");
    var foodToken = document.getElementById("chkfoodToken");
    var no_of_pass = document.getElementById("txtnoofannualpass").value;   
    var no_of_tokens = document.getElementById("txtnooffoodToken").value;   

    var grand_total = parseFloat(document.getElementById("spgrandtotal").innerHTML);   
    var tbody = document.getElementById("tbody_order");
    var trow1 = tbody.insertRow(-1);

        td1 = trow1.insertCell(0);
        td1.innerHTML = localStorage.getItem("Ticket_Type");       
        
        td2 = trow1.insertCell(1);
        td2.innerHTML = localStorage.getItem("No_of_adult");    
        
        td3 = trow1.insertCell(2);
        td3.innerHTML = localStorage.getItem("No_of_child");  

        td4 = trow1.insertCell(3);
        td4.innerHTML = localStorage.getItem("Duration_Type");  

        if(no_of_pass != "0"){
            td5 = trow1.insertCell(4);
            td5.innerHTML = localStorage.getItem("No_Of_Pass");
        }
        else{
            td5 = trow1.insertCell(4);
            td5.innerHTML = "0";
    
        }

        if(no_of_tokens != "0"){
            td6 = trow1.insertCell(5);
            td6.innerHTML = localStorage.getItem("No_Of_Tokens");
        }
        else{
            td6 = trow1.insertCell(5);
            td6.innerHTML = "0";
    
        }

        td7 = trow1.insertCell(6);
        var total = parseFloat(localStorage.getItem("Total_Amount"));
        td7.innerHTML = total.toFixed(2);
        td7.style = "text-align:right";

        grand_total = grand_total + total;

        td8 = trow1.insertCell(7);
        td8.innerHTML = "<a href = 'javascript:void(0)' style = 'color:red'; onclick = 'removeRecord(this.parentElement);'> <i class='fa fa-trash'></i></a>";

        grand_total = grand_total.toFixed(2)
        document.getElementById("spgrandtotal").innerHTML = grand_total;
}


//Donation


function donate(){

    var fullname = document.getElementById("txtfname").value;
    var emailaddress = document.getElementById("txtemail").value;
    var address = document.getElementById("adr").value;
    var contactnum = document.getElementById("contact").value;

    var cardname = document.getElementById("cname").value;
    var cardnum = document.getElementById("ccnum").value;
    var expiremonth = document.getElementById("expmonth").value;
    var expireyear = document.getElementById("expyear").value;
    var cvv = document.getElementById("cvv").value;



    if(fullname=="" || fullname.length<5 ){
        alert("Please enter your full name");
        document.getElementById("txtfname").focus();
        return false;
    }

    if(emailaddress.indexOf("@")==-1 || emailaddress.indexOf(".")==-1){
        alert("Please enter valid email address");
        document.getElementById("txtemail").focus();
        return false;
    }

    if(address=="" ){
        alert("Please enter the home address");
        document.getElementById("adr").focus();
        return false;
    }

    if(contactnum=="" ){
        alert("Please enter contact number");
        document.getElementById("contact").focus();
        return false;
    }

    
    var donationamount = document.getElementById("cmbdonationamount").value;

    //If donation amount is not choosen
    if(donationamount == " "){
        //Show message
        alert("PLEASE SELECT A SPECIFIC DONATION AMOUNT !");
        document.getElementById("cmbdonationamount").focus();
        return;
    }

    if(cardname=="" || cardname.length<5 ){
        alert("Please enter your full name on card");
        document.getElementById("cname").focus();
        return false;
    }

    if(cardnum=="" || cardnum.length<5 ){
        alert("Please enter valid credit card number");
        document.getElementById("ccnum").focus();
        return false;
    }

    if(expiremonth == " ")
    {
        alert("Please Enter the expire month");
        document.getElementById("expmonth").focus();
        return false;
    }

    if(expireyear == "" || expireyear.length <= 2)
    {
        alert("Please enter the expire year");
        document.getElementById("expyear").focus();
        return false;
    }

    if(cvv == "" || cvv.length <= 3)
    {
        alert("Please enter the CVV number");
        document.getElementById("expyear").focus();
        return false;
    }


    var confirm_alert = confirm("Are You Sure You Want to Confirm the Payment? ");
    if(confirm_alert == true){
        
        alert("THANK YOU FOR SUPPORTING TO DEHIWALA ZOO !\n                               - DEHIWALA ZOO")
    }
    resetDonationForm();
}

function resetDonationForm(){
    document.getElementById("frmdonations").reset();
    document.getElementById("check1").checked = false;
} 

function checkExpireDate(){
    var expMonth = document.getElementById("expmonth").value;
    var expYear = document.getElementById("expyear").value;
    alert(expYear);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();
    
    if((expMonth > month) && (expYear > year)){
        alert("CREDIT CARD HAS BEEN EXPIRED ! \n CONTACT THE BANK AND CONTINUE FURTHER. ")
    }
}