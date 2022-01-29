const loginForm = $(`#login-form`);

const signupForm = $(`#signup-form`);

const logoutYesBtn = $(`#yes-logout`);

const logoutNoBtn = $(`#no-logout`);

const signUpConfirmationModal = $("#sign-up-confirmation-modal");

const newPostForm = $(`#post-form`);

const errorMessageDiv = $("#error-message");

const renderError = (message) => {
  errorMessageDiv.empty();

  const errorDiv = `<div class="form-text text-danger"><span class="mx-2">${message}</span><i class="fas fa-exclamation-circle"></i></div>`;

  errorMessageDiv.append(errorDiv);
};

const makeRequest = async (url, method, body = {}) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $(`#email-input`).val();
  const password = $(`#password-input`).val();

  if (email && password) {
    try {
      const data = await makeRequest("/auth/login", "POST", {
        email,
        password,
      });

      if (data.success) {
        window.location.replace("/dashboard");
      } else {
        renderError("Failed to login");
      }
    } catch (error) {
      renderError("Failed to login");
    }
  } else {
    renderError("Failed to login");
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
  }

  if (!confirmPassword || password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
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
    "title",
    "content",
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
    try {
      const data = await makeRequest("/auth/signup", "POST", {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      if (data.success) {
        signUpConfirmationModal.modal("show");
        signUpConfirmationModal.on("hide.bs.modal", () => {
          window.location.replace("/login");
        });
      } else {
        renderError("Failed to sign up");
      }
    } catch (error) {
      renderError("Failed to sign up");
    }
  } else {
    renderError("Failed to sign up");
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

const getErrorsAddNewPost = ({ title, content }) => {
  const errors = {};

  if (!title) {
    errors.title = "Please add a title to your Post";
  }

  if (!content) {
    errors.content = "Please add a content to your Post";
  }

  return errors;
};

const handleAddNewPost = async (event) => {
  event.preventDefault();

  const title = $(`#title`).val();
  const content = $(`#content`).val();

  const errors = getErrorsAddNewPost({
    title,
    content,
  });

  renderErrorMessages(errors);

  if (!Object.keys(errors).length) {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
      redirect: "follow",
    });

    const data = await response.json();

    if (data.success) {
      window.location.reload(true);
    }
  }
};

const removePost = async (event) => {
  const target = $(event.target);

  if (target.is("button") && target.attr("id") === "remove-post-btn") {
    const postId = target.attr("data");

    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });

    const data = await response.json();

    if (data.success) {
      window.location.reload(true);
    }
  }
};

const onReady = () => {
  signUpConfirmationModal.modal("hide");
};

loginForm.on("submit", handleLogin);

signupForm.on("submit", handleSignup);

logoutYesBtn.on("click", handleYesLogout);

logoutNoBtn.on("click", handleNoLogout);

newPostForm.on("submit", handleAddNewPost);

$(`.post-container`).on("click", removePost);

$(document).ready(onReady);
