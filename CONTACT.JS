document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#contact-status");
  const submit = form?.querySelector('button[type="submit"]');

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const originalButton = submit?.innerHTML;
    if (status) {
      status.textContent = "Sending your enquiry…";
      status.dataset.state = "sending";
    }
    if (submit) {
      submit.disabled = true;
      submit.setAttribute("aria-busy", "true");
      submit.textContent = "Sending…";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const replyText = await response.text();
      const reply = replyText ? JSON.parse(replyText) : {};
      if (!response.ok) {
        const message = Array.isArray(reply.errors)
          ? reply.errors.map((error) => error.message).filter(Boolean).join(" ")
          : reply.error;
        throw new Error(message || "The form service could not accept your message.");
      }

      form.reset();
      if (status) {
        status.textContent = "Thanks! Your enquiry was sent. I’ll reply to the email address you provided.";
        status.dataset.state = "success";
      }
    } catch (error) {
      if (status) {
        status.textContent = error instanceof SyntaxError
          ? "The form service returned an unreadable reply. Please try again in a moment."
          : `${error.message} Please try again or check your connection.`;
        status.dataset.state = "error";
      }
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
        submit.innerHTML = originalButton;
      }
    }
  });
});
