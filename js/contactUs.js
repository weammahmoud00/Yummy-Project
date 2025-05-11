const displayForm = () => {
    mealsContainer.innerHTML = "";
    mealsContainer.innerHTML = `
        <form>
            <div class="row w-75 mx-auto mt-5">
                <div class="col-6">
                    <input type="text" id="name" class="form-control my-3" placeholder="Enter Your Name">
                </div>
                <div class="col-6">
                    <input type="email" id="email" class="form-control my-3" placeholder="Enter Your Email">
                </div>
                <div class="col-6">
                    <input type="text" id="phone" class="form-control my-3" placeholder="Enter Your Phone">
                </div>
                <div class="col-6">
                    <input type="number" id="age" class="form-control my-3" placeholder="Enter Your Age">
                </div>
                <div class="col-6">
                    <input type="password" id="password" class="form-control my-3" placeholder="Enter Your Password">
                </div>
                <div class="col-6">
                    <input type="password" id="repassword" class="form-control my-3" placeholder="Repassword">
                </div>
            </div>
            <div class="text-center mt-3">
                <button type="submit" id="submit" class="btn bg-transparent border-danger text-danger">Submit</button>
            </div>
        </form>
    `;
};

const validateField = (input, validator) => {
    if (!validator()) {
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        return true;
    }
};

const validateName = () => /^[a-zA-Z ]+$/.test(document.getElementById('name').value.trim());
const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value.trim());
const validatePhone = () => /^\d{10,15}$/.test(document.getElementById('phone').value.trim());
const validateAge = () => {
    const age = document.getElementById('age').value.trim();
    return /^\d+$/.test(age) && age >= 1 && age <= 120;
};
const validatePassword = () => document.getElementById('password').value.trim().length >= 6;
const validateRePassword = () => document.getElementById('password').value.trim() === document.getElementById('repassword').value.trim();

const validateForm = () => {
    const validators = {
        name: validateName,
        email: validateEmail,
        phone: validatePhone,
        age: validateAge,
        password: validatePassword,
        repassword: validateRePassword
    };

    return Object.keys(validators).every(key => {
        const input = document.getElementById(key);
        return validateField(input, validators[key]);
    });
};

const ContactUs = () => {
    const form = document.querySelector('form');

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Please correct the errors in the form.');
        }
    });
};

const contactUs = document.getElementById("contactUs");
contactUs.addEventListener("click", () => {
    displayForm();
    ContactUs();

    const sidebar = $(".sidebar");
    if (sidebar.css("left") === "0px") {
        sidebar.animate({ left: `-138.6px` }, 500);
    }
});