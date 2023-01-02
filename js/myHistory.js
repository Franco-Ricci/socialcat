const myHistory = document.querySelector(".history__add");
let openHis = document.querySelector(".history__myImg");
let hisBg = document.querySelector(".history__load");
let formHis = document.querySelector(".form__add");
let formContent = document.querySelectorAll(".form__content");
let inputAdd = document.querySelectorAll(".input__add");
let btnGuardar = document.querySelectorAll(".btn__add");
let check = document.querySelectorAll(".check");
let btnAceptar = document.querySelector(".btn__aceptar");
let btnCancelar = document.querySelector(".btn__cancelar");
let btnEnviar = document.querySelector(".btn__enviar");
let urlError = document.querySelectorAll(".url__error");

let dataImg;

//traigo el nombre de usuario desde el localStorage
let userName = document.querySelector(".menu__link--nameUser");
let userOnline = JSON.parse(localStorage.getItem("UserLogged")) || [];

console.log(userOnline);
for (let i = 0; i < userOnline.length; i++) {
  userName.innerHTML =
    userOnline[i].name.toLowerCase() +
    `<i class="fa-solid fa-chevron-down"></i>`;
}

//boton de usuario y cierro de sesion, limpio datos de localStorage
let arrowSet = document.querySelector(".fa-solid fa-chevron-down");
let menuLog = document.querySelector(".menu__log");
userName.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("si anda");
  menuLog.classList.toggle("menu__log--show");
});

menuLog.addEventListener("click", () => {
  console.log(window.location);
  window.location.href = "../index.html";
  data = [];
  localStorage.setItem("History", JSON.stringify(data));
});

//modal de history
let data = JSON.parse(localStorage.getItem("History")) || [];

for (let i = 0; i < data.length; i++) {
  inputAdd[i].value = data[i].img;
  btnGuardar[i].disabled = true;
  console.log(data[data.length - 1].img);
  inputAdd[i].addEventListener("keyup", (e) => {
    if (e.keyCode == 8) {
      UploadImg(i);
      data.splice(
        data.findIndex((url) => url.id === i),
        1
      );
      localStorage.setItem("History", JSON.stringify(data));
    }
  });
}

myHistory.addEventListener("click", (e) => {
  console.log("si");
  console.log(e.target);
  console.log(userOnline);

  formHis.classList.toggle("form__add-active");
});
btnAceptar.addEventListener("click", () => {
  formHis.classList.remove("form__add-active");
  console.log(data.length);
  if (data.length == 0) {
    openHis.src = "../images/avatar-default.jpg";
    openHis.classList.remove("history__active");
  }
});
btnCancelar.addEventListener("click", () => {
  formHis.classList.remove("form__add-active");
  inputAdd.forEach((e) => {
    e.value = "";
    data = [];
    localStorage.setItem("History", JSON.stringify(data));
    openHis.src = "../images/avatar-default.jpg";
  });
  btnGuardar.forEach((e) => {
    e.disabled = false;
  });
  urlError.forEach((e) => {
    e.classList.remove("url__error-show");
  });
  check.forEach((e) => {
    e.classList.remove("check-show");
  });
});

//función de validación de url img ingresada por usuario

function val() {
  dataImg = [];
  let regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  let traer = JSON.parse(localStorage.getItem("History"));
  console.log(traer);
  console.log(data.length);
  for (let i = 0; i < btnGuardar.length; i++) {
    btnGuardar[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (regexp.test(inputAdd[i].value) && data.length < 3) {
        console.log(inputAdd[i].value);
        check[i].classList.add("check-show");
        console.log(check[i]);
        urlError[i].classList.remove("url__error-show");
        data.push({ img: inputAdd[i].value, id: i });
        btnGuardar[i].disabled = true;
        //guardo imagen validada en localStorage
        localStorage.setItem("History", JSON.stringify(data));

        //borro la url del campo del input y desde Ls<
        inputAdd[i].addEventListener("keyup", (e) => {
          let key = e.keyCode;
          if (key == 8 && regexp.test(inputAdd[i].value)) {
            console.log(key);
            UploadImg(i);
            data.splice(
              data.findIndex((url) => url.id === i),
              1
            );
            localStorage.setItem("History", JSON.stringify(data));
          } else if (key == 8) {
            inputAdd[i].value = "";
          }
        });
      } else {
        urlError[i].classList.add("url__error-show");
        console.log("maximo de imagenes agregado");
      }
    });
  }
}
val();

//limpio campo del input de history
const UploadImg = (i) => {
  inputAdd[i].value = "";
  console.log(data);
  console.log(inputAdd[i].value);
  btnGuardar[i].disabled = false;
  urlError[i].classList.add("url__error-show");
  check[i].classList.remove("check-show");
};

//Cargo modal imagen de la history
const fecha = new Date();
openHis.addEventListener("click", (e) => {
  document.body.classList.toggle("bodyHide");
  console.log(fecha.toLocaleDateString("es-ES"));
  let numb = 0;

  if (data.length > 0) {
    hisBg.classList.add("history__bg");
    let open = `
    <div class="modal__show--myHis">
    <div class="bar__container"></div>
   
    <img class="modal__img--myHis" src=${data[numb].img} ></img>
        <div class="modal__info">
    
            <div class="modal__time">${fecha.toLocaleDateString("es-ES")}</div>
            <div class="modal__icon">
                <span class="modal__media"><i class="far fa-heart"></i><span>
            </div>
            </div>
        <i class="fas fa-times modal__close"></i>
        <i class="fas fa-chevron-right next"></i>
        <i class="fas fa-chevron-left prev"></i>
    </div>
    </div>`;
    hisBg.innerHTML = open;
    //agrego barra de estado a history
    openHis.src = data[data.length - 1].img;
    openHis.classList.add("history__active");
    let modalS = document.querySelector(".bar__container");
    for (let i = 0; i < data.length; i++) {
      let barP = document.createElement("span");

      barP.classList.add("modal__bar");
      modalS.prepend(barP);
    }

    //funcion de modal automatico que cambia de imagen

    function load() {
      if (numb < data.length - 1) {
        modalImg.src = data[numb + 1].img;
        numb++;
        console.log("siguiente");
        barraHist[numb - 1].classList.remove("bar__show");
        barraHist[numb].classList.add("bar__show");
      } else {
        clearInterval(auto);
        console.log("imagen ultima");
        hisBg.classList.remove("history__bg");
        document.body.classList.remove("bodyHide");
        HisShow.classList.add("modal__show--close");
      }
    }

    //cambio de imagen con botones prev y next
    let modalImg = document.querySelector(".modal__img--myHis");
    let HisShow = document.querySelector(".modal__show--myHis");
    let auto = setInterval(load, 3000);
    let next = document.querySelector(".next");
    next.addEventListener("click", () => {
      if (numb < data.length - 1) {
        modalImg.src = data[numb + 1].img;
        barraHist[numb].classList.remove("bar__show");
        barraHist[numb + 1].classList.add("bar__show");
        console.log("siguiente");
        numb++;
        clearInterval(auto);
        auto = setInterval(load, 3000);
      } else {
        clearInterval(auto);
        hisBg.classList.remove("history__bg");
        document.body.classList.remove("bodyHide");
        HisShow.classList.add("modal__show--close");
      }
    });

    let prev = document.querySelector(".prev");
    prev.addEventListener("click", () => {
      if (numb > 0) {
        barraHist[numb].classList.remove("bar__show");
        barraHist[numb - 1].classList.add("bar__show");

        modalImg.src = data[numb - 1].img; //2
        console.log("Atras");
        numb--;
        clearInterval(auto);
        auto = setInterval(load, 3000);
      } else {
        barraHist[numb].classList.remove("bar__show");

        modalImg.src = data[data.length - 1].img;
        console.log("prev ultima");
        numb = data.length - 1;
        clearInterval(auto);
        hisBg.classList.remove("history__bg");
        document.body.classList.remove("bodyHide");
        HisShow.classList.add("modal__show--close");
      }
    });

    //cierro modal cuando usuario hace click en x o fuera del modal

    hisBg.addEventListener("click", (e) => {
      console.log(barraHist[numb]);
      if (e.target.classList.contains("modal__close") || e.target == hisBg) {
        clearInterval(auto);
        hisBg.classList.remove("history__bg");
        HisShow.classList.add("modal__show--close");
        document.body.classList.remove("bodyHide");
      }
    });
  }

  //actualizo barra de estado con la imagen actual
  let barraHist = document.querySelectorAll(".modal__bar");
  for (let i = 0; i < data.length; i++) {
    barraHist[numb].classList.add("bar__show");
  }
  console.log(barraHist);
});
