const loginForm = $(`#login-form`);

const signupForm = $(`#signup-form`);

const logoutBtn = $(`#signup-form`);

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $(`#email-input`).val();

  const password = $(`#password-input`).val();

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
  }
};

const handleSignup = async (event) => {
  event.preventDefault();

  const username = $(`#username-input`).val();
  const email = $(`#email-input`).val();
  const password = $(`#password-input`).val();
  const firstName = $(`#first-name`).val();
  const lastName = $(`#last-name`).val();

  console.log(username, email, password, firstName, lastName);
  const response = await fetch("http://localhost:3000/auth/signup", {
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
  console.log(response);

  const data = await response.json();

  if (data.success) {
    window.location.replace("/login");
  }
};

loginForm.on("submit", handleLogin);

signupForm.on("submit", handleSignup);
