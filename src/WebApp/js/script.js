window.addEventListener("DOMContentLoaded", () => {
  const applicantForm = document.getElementById("choose-game__form");

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    //   toggleLoader();

    const response = await sendData(data);
    console.log(Array.from(data.entries()));

    //   toggleLoader();
  }

  //   applicantForm.addEventListener("submit", handleFormSubmit);

  async function sendData(data) {
    return await fetch("src/WebApp", {
      method: "POST",
      body: data,
    });
  }

  //   function toggleLoader() {
  //     const loader = document.getElementById("loader");
  //     loader.classList.toggle("hidden");
  //   }

  function checkValidity(event) {
    const formNode = event.target.form;
    const isValid = formNode.checkValidity();

    formNode.querySelector(".choose-game__form__btn__input").disabled =
      !isValid;
  }

  applicantForm.addEventListener("input", checkValidity);
});
