const loginForm = $(`#login-form`);

const signupForm = $(`#signup-form`);

const logoutYesBtn = $(`#yes-logout`);

const logoutNoBtn = $(`#no-logout`);

const signUpConfirmationModal = $("#sign-up-confirmation-modal");

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $(`#email-input`).val();

  const password = $(`#password-input`).val();

  $("#login-error").text("");

  if (!email || !password) {
    $("#login-error").text("Login failed, please try again");
  } else {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      redirect: "follow",
    });

    const data = await response.json();

    if (data.success) {
      window.location.replace("/dashboard");
    } else {
      $("#login-error").text("Login failed, please try again");
    }
  }
};

const getErrorsSignUp = ({
  username,
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}) => {
  const errors = {};

  if (!username) {
    errors.username = "Username is required";
    console.log(username);
  }

  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (
    !password ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    errors.password = "Invalid password";
    console.log(password);
  }

  if (!confirmPassword || password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    console.log(confirmPassword);
  }

  if (!firstName) {
    errors.firstName = "First name is required";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  }

  return errors;
};

const renderErrorMessages = (errors) => {
  const fields = [
    "username",
    "email",
    "password",
    "confirmPassword",
    "firstName",
    "lastName",
  ];
  fields.forEach((field) => {
    const errorDiv = $(`#${field}-error`);

    if (errors[field]) {
      errorDiv.text(errors[field]);
    } else {
      errorDiv.text("");
    }
  });
};

const handleSignup = async (event) => {
  event.preventDefault();

  const username = $(`#username-input`).val();
  const email = $(`#email-input`).val();
  const password = $(`#password-input`).val();
  const confirmPassword = $("#confirm-password").val();
  const firstName = $(`#first-name`).val();
  const lastName = $(`#last-name`).val();

  const errors = getErrorsSignUp({
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  });

  renderErrorMessages(errors);

  if (!Object.keys(errors).length) {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      redirect: "follow",
    });
    console.log(response.body);
    console.log(username, email, password, firstName, lastName);

    const data = await response.json();

    console.log(data);

    if (data.success) {
      signUpConfirmationModal.modal("show");
      signUpConfirmationModal.on("hide.bs.modal", () => {
        window.location.replace("/login");
      });
    }
  }
};

const handleYesLogout = async () => {
  const response = await fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.success) {
    window.location.replace("/");
  }
};

const handleNoLogout = () => {
  window.location.replace("/dashboard");
};

loginForm.on("submit", handleLogin);

signupForm.on("submit", handleSignup);

logoutYesBtn.on("click", handleYesLogout);

logoutNoBtn.on("click", handleNoLogout);
