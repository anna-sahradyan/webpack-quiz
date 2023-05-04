const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
let formData = {};
const form = document.querySelector("form");
const formId = document.getElementById('myForm');

formId.addEventListener('submit', (event) => {
    event.preventDefault();
})
form.addEventListener("input", function (e) {

})

let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
})

if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}
multiStepForm.addEventListener("click", e => {
    let incrementor = 0;
    if (e.target.matches("[data-next]")) {
        incrementor = 1;
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1;
    }

    if (incrementor == null) return
    const inputs = [...formSteps[currentStep].querySelectorAll("input")];

    const allValid = inputs.every(input => input.checkValidity())
    if (allValid) {
        currentStep += incrementor;
        showCurrentStep();
    }


});


function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);

    })

}

/*select part*/

const selectContainers = document.querySelectorAll(".select-container"),
    selectTexts = document.querySelectorAll('.li-text'),
    itemTexts = document.querySelectorAll('.item-text');

selectContainers.forEach(container => {
    container.addEventListener("click", () => {
        container.classList.toggle("open");
        selectTexts.forEach(text => text.textContent = "");
    });
});

itemTexts.forEach(itemText => {
    itemText.addEventListener('click', () => {
        itemText.closest('.select-group').querySelector('.li-text').textContent = itemText.textContent;
    });
});


/*last part*/
const authBtns = document.querySelectorAll(".auth-btn");

authBtns.forEach(function(authBtn) {
    authBtn.addEventListener("click", function() {
        const authContainer = authBtn.parentElement;
        const authInput = authContainer.querySelector(".auth-input");
        const inputField = authInput.querySelector(".input-field");

        authBtn.style.display = "none";
        authInput.style.display = "inline-block";
        inputField.focus(); // automatically focus on the input field when it appears

        inputField.addEventListener("blur", function() {
            authBtn.textContent = inputField.value ? inputField.value : authBtn.textContent;
            authBtn.style.display = "inline-block";
            authInput.style.display = "none";
        });
    });
});
