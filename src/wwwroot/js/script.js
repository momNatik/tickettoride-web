window.addEventListener("DOMContentLoaded", () => {
  const applicantForm = document.getElementById("choose-game__form");

  function checkValidity(event) {
    const formNode = event.target.form;
    const isValid = formNode.checkValidity();

    formNode.querySelector(".choose-game__form__btn__input").disabled =
      !isValid;
  }

  applicantForm.addEventListener("input", checkValidity);
});
