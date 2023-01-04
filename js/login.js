let registro = document.querySelector(".link__registro");
const form = document.querySelector(".form");
let iniciarSesion = document.querySelector(".btn__sesion");
let dataInf;

iniciarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  dataLog();
});

//Funcion para comprobar si hay datos en localStorage
function getDatos() {
  dataInf = JSON.parse(localStorage.getItem("Usuario")) || [];
}
getDatos();

//funcion para comprobar si los datos coinciden y iniciar sesion

function dataLog(e) {
  getDatos();

  let email = document.querySelector(".email__input");
  let pass = document.querySelector(".pass__input");
  let errorData = document.querySelector(".textLog__warn");

  console.log("adentro");
  if (dataInf.length > 0) {
    const found = dataInf.find(
      (element) =>
        element.email == email.value && element.contraseña == pass.value
    );

    console.log(dataInf);
    if (found !== undefined) {
      errorData.classList.remove("text__warn--show");
      console.log(found);
      console.log(window.location);
      console.log(dataInf);
      console.log(dataInf);
      localStorage.setItem("UserLogged", JSON.stringify(dataInf));
      window.location.href = "./html/logeado.html";
    } else {
      errorData.classList.add("text__warn--show");
      console.log(found);
    }
  } else {
    console.log("no hay datos");
    console.log(email.value);
    errorData.classList.add("text__warn--show");
  }
}

//creo card de inicio de sesión

function modalLog() {
  form.innerHTML = `
   
  <form class="form">
  <label for="email">
    <input
      type="email"
      id="email"
      class="email__input"
      placeholder="Ingrese su email"
      required
    />
  </label>
  <label for="password">
    <input
      type="password"
      id="password"
      class="pass__input"
      placeholder="Ingrese su contraseña"
      required
    />
  </label>
  <p class="textLog__warn">El email o contraseña son incorrectos</p>
  <input type="button" class="btn__sesion" Onclick="dataLog()" value="Iniciar Sesión" />
  <span class="msg__span">¿No tienes cuenta? <a href="#" Onclick="regForm()" class="link__registro">Regístrate</a></span> 
  </form>
  `;
}

registro.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("yes");
  regForm(e);
});

//modal de registro de usuario

const regForm = (e) => {
  form.innerHTML = `    <form class="form">
            <label for="nombre">
              <input
                type="name"
                id="nombre-reg"
                class="email__input"
                placeholder="Ingrese su Nombre"
                required
              />
            </label>
            <label for="email">
              <input
                type="email"
                id="email-reg"
                class="email__input"
                placeholder="Ingrese su Email"
                required
              />
            </label>
            <label for="password">
            <input
              type="password"
              id="password"
              class="pass__log"
              placeholder="Ingrese su Contraseña"
              required
            />
          </label>
          <label for="Cpassword">
            <input
              type="password"
              id="Cpassword"
              class="pass__log2"
              placeholder="Confirme su Contraseña"
              required
            />
            <p class="text__error">Las contraseñas no coinciden, ingrese de nuevo</p>
            <p class="text__warn">Complete todos los campos</p>
            <p class="text__emailWarn">El correo ya se encuentra registrado</p>
          </label>
  
            <input type="submit" class="btn__reg" value="Registrarse" />
              <input type="submit" class="btn__sesion--log" value="Iniciar Sesion" />
     `;

  //cargo modal de iniciar sesion

  let btnInicia = document.querySelector(".btn__sesion--log");
  console.log(btnInicia);
  btnInicia.addEventListener("click", (e) => {
    modalLog();
    e.preventDefault();
  });

  //comprobación de datos ingresados

  let contraseña = document.querySelector(".pass__log");
  let confirm = document.querySelector(".pass__log2");
  let dataName = document.getElementById("nombre-reg");
  let dataEmail = document.getElementById("email-reg");
  const dataEmpty = document.querySelector(".text__warn");
  const error = document.querySelector(".text__error");
  const checkEmail = document.querySelector(".text__emailWarn");
  let conta = 0;
  let dataUsers = JSON.parse(localStorage.getItem("Usuario")) || [];

  let validData = document.querySelector(".btn__reg");

  validData.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(dataUsers);
    if (dataUsers.length > 0) {
      for (let i = 0; i < dataUsers.length; i++) {
        if (dataEmail.value == dataUsers[i].email) {
          console.log("el correo ingresado ya fue registrado");
          checkEmail.classList.add("text__warn--show");
          dataEmpty.classList.remove("text__success");
          return;
        }
      }
    }

    if (
      dataName.value == "" ||
      dataName.value < 3 ||
      dataEmail.value == "" ||
      contraseña.value == ""
    ) {
      console.log("esta vacio");
      dataEmpty.classList.add("text__warn--show");
      error.classList.remove("text__error--show");
      checkEmail.classList.remove("text__warn--show");
    } else if (contraseña.value == confirm.value && contraseña.value != "") {
      console.log("si");
      JSON.parse(localStorage.getItem("Usuario"));
      console.log(contraseña.value);
      console.log(confirm.value);
      dataEmpty.classList.remove("text__warn--show");
      error.classList.remove("text__error--show");
      checkEmail.classList.remove("text__warn--show");
      dataEmpty.classList.add("text__success");
      dataEmpty.innerHTML = "Registro completado";
      dataUsers.push({
        id: conta,
        email: dataEmail.value,
        contraseña: contraseña.value,
        name: dataName.value,
        img: "",
      });
      localStorage.setItem("Usuario", JSON.stringify(dataUsers));
      console.log(dataUsers);
      conta++;
    } else {
      console.log("no");
      console.log(confirm.value);
      error.classList.add("text__error--show");
      dataEmpty.classList.remove("text__warn--show");
      checkEmail.classList.remove("text__warn--show");
    }
  });
};
