<template>
  <div class="parent-wrapper">
    <div class="forms-container">
      <div class="signin-signup">
        <form class="sign-in-form">
          <h2 class="title">sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              v-model="user.name"
              required
            />
            <p
              v-show="usernameError"
              class="text-danger text-left error-message"
            >
              error name is to short
            </p>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <p
              v-show="userpasswordError"
              class="text-danger text-left error-message"
            >
              error password must be greater than 6
            </p>
            
          </div>
          <input
            type="button"
            @click="login"
            value="login"
            class="btn solid"
          />
          <p class="social-text">or sign in with social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>

        <form class="sign-up-form">
          <h2 class="title">sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              v-model="user.name"
              required
            />
            <p
              v-show="usernameError"
              class="text-danger text-left error-message"
            >
              name is to short must be more than 4
            </p>
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              v-model="user.email"
              required
            />
            <p v-show="emailError" class="text-danger text-left error-message">
              email is not valid
            </p>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="text"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <p
              v-show="userpasswordError"
              class="text-danger text-left error-message"
            >
              password must be greater than 6
            </p>
          </div>
          <input
            type="button"
            @click="register"
            value="sign up"
            class="btn solid"
            :disabled="!isValidForm"
          />
          <p class="social-text">or sign up with social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
            reiciendis amet odit?
          </p>
          <button
            @click="addSignUpMode"
            class="btn transparent"
            id="sign-up-btn"
          >
            sign up
          </button>
        </div>
        <img
          src="../../assets/undraw_online_ad_re_ol62.svg"
          class="image"
          alt="a person creating an coount to sign up"
        />
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
            reiciendis amet odit?
          </p>
          <button
            @click="removeSignUpMode"
            class="btn transparent"
            id="sign-in-btn"
          >
            sign in
          </button>
        </div>
        <img
          src="../../assets/undraw_login_re_4vu2.svg"
          class="image"
          alt="a person logging in "
        />
      </div>
    </div>
  </div>
</template>
<script>
// import { toStatement } from "@babel/types";
import axios from "axios";
// import { EqualStencilFunc } from "three";

export default {
  name: "UserRegister",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      error: false,
    };
  },
  methods: {
    register() {
      axios
        .post("http://127.0.0.1:8000/api/user/register", this.user)
        .then((res) => {
          console.log("user created successfully");
        });
    },
    login() {
      axios
        .post("http://127.0.0.1:8000/api/user/login", {
          name: this.user.name,
          password: this.user.password,
        })
        .then((res) => {
          if ((res.data.status === "success")) {
            let token = res.data.token;
            console.log(token);
            localStorage.setItem("token", token);
          } else {
            console.log("Not Authintcated");
          }
        });
    },
    removeSignUpMode() {
      document
        .querySelector(".parent-wrapper")
        .classList.remove("sign-up-mode");
    },
    addSignUpMode() {
      document.querySelector(".parent-wrapper").classList.add("sign-up-mode");
    },
  },
  computed: {
    usernameError() {
      return this.user.name.length > 0 && this.user.name.length < 4;
    },
    userpasswordError() {
      return this.user.password.length > 0 && this.user.password.length < 6;
    },
    emailError() {
      let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return !this.user.email.match(validRegex) && this.user.email.length > 0;
    },
    isValidForm() {
      return (
        this.user.name &&
        this.usernameError === false &&
        this.user.password &&
        this.userpasswordError === false &&
        this.user.email &&
        this.emailError === false
      );
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.parent-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
}
.parent-wrapper::before {
  position: absolute;
  content: "";
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #4481eb, #04befe);
  right: 48%;
  top: -10%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}
.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  padding: 0 5rem;
  overflow: hidden;
  transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  z-index: 1;
  opacity: 0;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.input-field {
  max-width: 380px;
  width: 100%;
  height: 55px;
  background-color: #f0f0f0;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
}

.input-field > i {
  text-align: center;
  line-height: 55px;
  font-size: 1.1rem;
  color: #acacac;
}

.input-field input {
  background: none;
  border: none;
  outline: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.btn {
  width: 150px;
  height: 49px;
  border: none;
  outline: none;
  color: #fff;
  background-color: #5995fd;
  margin: 20px 0;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.5s;
  cursor: pointer;
  border-radius: 49px;
}
.input-field .error-message {
  min-width: 300px;
}
.btn:hover,
.btn:focus {
  background-color: #4d84e2;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
  text-transform: capitalize;
}

.social-media {
  display: flex;
}

.social-media .social-icon {
  width: 44px;
  height: 44px;
  text-align: center;
  border: 1px solid #333;
  margin: 0 0.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #333;
  font-size: 1.1rem;
  cursor: pointer;
}

.social-media .social-icon:hover,
.social-media .social-icon:focus {
  color: #4d84e2;
  border-color: #4d84e2;
}

.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.image {
  width: 100%;
  transition: 1.1s 0.4s ease-in-out;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}

.panel h3 {
  line-height: 1;
  font-size: 1.5rem;
  font-weight: 600;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  background-color: transparent;
  border: 2px solid #fff;
  margin: 0;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.panel .content {
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}

.left-panel {
  padding: 3rem 17% 2rem 12%;
  pointer-events: all;
}

.right-panel {
  padding: 3rem 12% 2rem 17%;
  pointer-events: none;
}

.right-panel .content,
.right-panel .image {
  transform: translateX(800px);
}

.parent-wrapper.sign-up-mode::before {
  transform: translate(100%, -50%);
  right: 52%;
}

.parent-wrapper.sign-up-mode .left-panel .image,
.parent-wrapper.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.parent-wrapper.sign-up-mode .right-panel .image,
.parent-wrapper.sign-up-mode .right-panel .content {
  transform: translateX(0px);
}

.parent-wrapper.sign-up-mode .left-panel {
  pointer-events: none;
}

.parent-wrapper.sign-up-mode .right-panel {
  pointer-events: all;
}

.parent-wrapper.sign-up-mode .signin-signup {
  left: 25%;
}

.parent-wrapper.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

.parent-wrapper.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}

@media (max-width: 870px) {
  .parent-wrapper {
    min-height: 800px;
    height: 100vh;
  }

  .signin-signup {
    width: 100%;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .parent-wrapper::before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 68%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .panel .content {
    padding-right: 15%;
    transition: 0.9s 0.8s ease-in-out;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .image {
    width: 200px;
    transition: 0.9s 0.6s ease-in-out;
  }

  .right-panel .content,
  .right-panel .image {
    transform: translateX(300px);
  }

  .parent-wrapper.sign-up-mode::before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .parent-wrapper.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .parent-wrapper.sign-up-mode .left-panel .image,
  .parent-wrapper.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .parent-wrapper.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }

  .signin-signup,
  .parent-wrapper.sign-up-mode .signin-signup {
    left: 50%;
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .parent-wrapper {
    padding: 1.5rem;
  }

  .parent-wrapper::before {
    bottom: 72%;
    left: 50%;
  }

  .parent-wrapper.signin-signup::before {
    bottom: 28%;
    left: 50%;
  }
}
</style>
