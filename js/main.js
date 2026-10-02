// Sai Prashanth Electricals - main.js v2.0
(function(){
  var WA_NUMBER = "919704361888";
  // Mobile nav
  var burger = document.getElementById("hamburger");
  var nav = document.getElementById("navLinks");
  if(burger && nav){ burger.addEventListener("click", function(){ nav.classList.toggle("open"); }); }
  // Year
  var y = document.getElementById("year"); if(y){ y.textContent = new Date().getFullYear(); }
  // All lead forms -> WhatsApp + thank-you redirect
  function handleForm(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var fd = new FormData(form);
      var name = (fd.get("name")||"").toString().trim();
      var phone = (fd.get("phone")||"").toString().trim();
      var service = (fd.get("service")||"").toString().trim();
      var location = (fd.get("location")||"").toString().trim();
      var message = (fd.get("message")||"").toString().trim();
      if(!name || !phone){ alert("Please enter your name and phone number."); return; }
      if(!/^[6-9]\d{9}$/.test(phone.replace(/\D/g,"").slice(-10))){ alert("Please enter a valid 10-digit mobile number."); return; }
      var text = "New Lead - Sai Prashanth Electricals%0A----------------%0AName: "+encodeURIComponent(name)+"%0APhone: "+encodeURIComponent(phone)+"%0AService: "+encodeURIComponent(service||"General")+"%0ALocation: "+encodeURIComponent(location||"Hyderabad")+"%0ADetails: "+encodeURIComponent(message)+"%0APage: "+encodeURIComponent(location.pathname||window.location.href);
      window.open("https://wa.me/"+WA_NUMBER+"?text="+text,"_blank");
      window.location.href = "thank-you.html";
    });
  }
  document.querySelectorAll("form.lead-form").forEach(handleForm);
})();