document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const message = document.querySelector("#message").value;

    const whatsappMessage =
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Project Details: ${message}`;

    window.open(
        `https://wa.me/919704361888?text=${whatsappMessage}`,
        "_blank"
    );
});