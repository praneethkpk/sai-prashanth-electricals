// Sai Prashanth Electricals - main.js v2.0
(function(){
  // Mobile nav
  var burger = document.getElementById("hamburger");
  var nav = document.getElementById("navLinks");
  if(burger && nav){ burger.addEventListener("click", function(){ var open = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", open ? "true" : "false"); }); }
  // Year
  var y = document.getElementById("year"); if(y){ y.textContent = new Date().getFullYear(); }
  var EMAIL = "saiprasanthelectricals.hyd@gmail.com";
  function status(form, msg, isError){
    var st = form.querySelector(".form-status");
    if(st){ st.textContent = msg; st.classList.toggle("error", !!isError); }
  }
  function invalidate(input, msg){
    var p = document.createElement("p");
    p.className = "field-error"; p.textContent = msg;
    var lab = input.closest("label"); if(lab){ lab.appendChild(p); }
    input.setAttribute("aria-invalid", "true");
  }
  function clearErrors(form){
    form.querySelectorAll(".field-error").forEach(function(n){ n.remove(); });
    form.querySelectorAll("[aria-invalid]").forEach(function(n){ n.removeAttribute("aria-invalid"); });
  }
  // Lead forms -> Netlify Forms backend (number stays server-side). Local preview falls back to email.
  function handleForm(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      clearErrors(form);
      var nameEl = form.querySelector('[name="name"]');
      var phoneEl = form.querySelector('[name="phone"]');
      var name = (nameEl.value || "").trim();
      var digits = (phoneEl.value || "").replace(/\D/g, "").slice(-10);
      var firstBad = null;
      if(name.length < 2){ invalidate(nameEl, "Enter your name."); firstBad = firstBad || nameEl; }
      if(!/^[6-9]\d{9}$/.test(digits)){ invalidate(phoneEl, "Enter a valid 10-digit mobile number."); firstBad = firstBad || phoneEl; }
      if(firstBad){ status(form, "Fix the highlighted fields and resubmit.", true); firstBad.focus(); return; }
      var honey = form.querySelector('[name="bot-field"]');
      if(honey && honey.value){ window.location.href = "thank-you.html"; return; }
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : "";
      if(btn){ btn.disabled = true; btn.classList.add("is-loading"); btn.textContent = "Sending…"; }
      status(form, "Sending your request…", false);
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body })
        .then(function(res){ if(!res.ok){ throw new Error("netlify-offline"); } window.location.href = "thank-you.html"; })
        .catch(function(){
          var fd = new FormData(form);
          var subject = encodeURIComponent("Quote request - " + (fd.get("service") || "Electrical work"));
          var text = encodeURIComponent("Name: " + name + "\nPhone: " + digits + "\nService: " + (fd.get("service") || "") + "\nLocation: " + (fd.get("location") || "") + "\nDetails: " + (fd.get("message") || ""));
          status(form, "Online form unavailable in preview — opening your email app instead.", false);
          if(btn){ btn.disabled = false; btn.classList.remove("is-loading"); btn.textContent = label; }
          window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + text;
        });
    });
  }
  document.querySelectorAll("form.lead-form").forEach(handleForm);
})();