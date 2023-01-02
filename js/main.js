const main = document.querySelector(".card__content");
const historias = document.querySelector(".history");
const historyContent = document.querySelector(".history__container");
const suggest = document.querySelector(".main__suggest");
let modalContainer = document.querySelector(".modal__bg");
let page = 1;

//nombres aleatorios para los usuarios de ejemplos
const nicknames = [
  {
    name: "Oliver",
  },
  {
    name: "Leo",
  },
  {
    name: "Smokey",
  },
  {
    name: "Toby",
  },
  {
    name: "Buddy",
  },
  {
    name: "Leo",
  },
  {
    name: "Felix",
  },
  {
    name: "George",
  },
  {
    name: "Salem",
  },
  {
    name: "Binx",
  },
  {
    name: "Dexter",
  },
  {
    name: "Gus",
  },
  {
    name: "Luna",
  },
  {
    name: "Bella",
  },
  {
    name: "Lucy",
  },
  {
    name: "Kitty",
  },
  {
    name: "Nala",
  },
  {
    name: "Stella",
  },
  {
    name: "Daisy",
  },
  {
    name: "Mia",
  },
  {
    name: "Gracie",
  },
  {
    name: "Callie",
  },
  {
    name: "willow",
  },
  {
    name: "kiki",
  },
  {
    name: "coco",
  },
  {
    name: "Minnie",
  },
];

let randomName = Math.floor(Math.random() * nicknames.length);
let likeCont = Math.floor(Math.random() * 100);

//funcion que trae más imagenes desde la api a medida que se desplaza por la pag
let observer = new IntersectionObserver(
  (entry, observador) => {
    console.log(entry);
    entry.forEach((e) => {
      if (e.isIntersecting) {
        page++;
        getPost();
      }
    });
  },
  {
    rootMargin: "0px 0px 200px 0px",
    threshold: 1.0,
  }
);

//Consumo de API de gatos usando fetch
let dataImages = [];
let add = 0;
let contHist = document.querySelectorAll(".history__content");
const getData = async () => {
  await Promise.all([
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=3&page=1&order=Desc?mime_types=jpg,png?`
    ),
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc?mime_types=jpg,png?`
    ),
  ])
    .then((result) =>
      Promise.all(
        result.map(async function (result) {
          return await result.json();
        })
      )
    )

    .then(([dataHis, dataSug]) => {
      historyContent.classList.add("history__show");
      dataHis.forEach((e) => {
        dataImages = dataHis;
        showHistory(e);
        hideLoadingHist();
      });
      modalHist();

      dataSug.forEach((e) => {
        showSuggest(e);
        hideLoadSug();
      });
    });
};

//consumo de api para las imagenes de los posts de usuarios
const getPost = async () => {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
  )
    .then((result) => result.json())

    .then(async (data) => {
      data.forEach((e) => {
        showPostData(e);
        hideLoading();
      });

      //observer detecta la ultima card y hace una nueva petición
      const traer = document.querySelectorAll(".main__card");
      let ultimacard = traer[traer.length - 1];
      console.log(ultimacard);
      observer.observe(ultimacard);
    });
};

//efecto skeleton de pre carga de imagenes
const hideLoading = () => {
  let skeleton = document.querySelectorAll(".card__img");
  setTimeout(() => {
    for (let i = 0; i < skeleton.length; i++) {
      skeleton[i].classList.add("skeleton__off");
    }
  }, 3000);
};

//remuevo efecto skeleton
const hideLoadingHist = () => {
  let historyImg = document.querySelectorAll(".history__img");
  setTimeout(() => {
    for (let i = 0; i < historyImg.length; i++) {
      historyImg[i].classList.remove("skeleton");
    }
  }, 3000);
};

//skeleton en imagenes de usuarions sugeridos
const hideLoadSug = () => {
  let suggestImg = document.querySelectorAll(".img__suggest");
  setTimeout(() => {
    for (let i = 0; i < suggestImg.length; i++) {
      suggestImg[i].classList.remove("skeleton");
    }
  }, 3000);
};

//funcion que muestra cards con img de post de usuarios ejemplo
function showPostData(data) {
  let catData = `<div class="main__card">
    <div class="card">
        <img class="card__img skeleton" src=${data.url}>
            
    </img>
        <div class="card__desc">
        <div class="card__title">
            <p class="card__name">${nicknames[randomName].name}</p>
        </div>
        <div class="card__media">
           <span class="contador">${likeCont}</span>
           <span class="media"><i class="far fa-heart"></i><span>
           <span class="media"><i class="far fa-star"></i></span>
            <span class="media"><i class="far fa-comment"></i></span>
        </div>
    </div>
    <div class="card__text">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia similique alias dolores fugit. Iure itaque vero architecto earum pariatur.</p>
    </div>
    <form class="form__comment">
        <input class="comment" type="text" placeholder="Agrega un comentario...">
        <input class="btn__send" type="button" value="Enviar">
    </form>
    </div>

</div>`;
  randomName = Math.floor(Math.random() * nicknames.length);
  likeCont = Math.floor(Math.random() * 100);
  main.innerHTML += catData;
}
let con = 0;
const showHistory = (his) => {
  let imgHis = `
    <div class="history__content">
        <img src=${his.url} data-pic=${add}  class="history__img history__active skeleton "></img>
        <p class="history__name">${nicknames[randomName].name}</p>
    </div>
     
</div>
    `;

  randomName = Math.floor(Math.random() * nicknames.length);

  historias.innerHTML += imgHis;

  let historyImg = document.querySelectorAll(".history__img");
  let nexaHis;

  //carga de modal con imagen
  historyImg.forEach((e) => {
    const fecha = new Date();
    e.addEventListener("click", () => {
      document.body.classList.toggle("bodyHide");
      modalContainer.classList.add("modal__bg-on");
      console.log(e.src);
      let mostrar = `
  <div class="modal__show">

  <img class="modal__img" src=${e.src} data-img:${add}></img>
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

      modalContainer.innerHTML = mostrar;
      console.log(e.getAttribute("data-pic"));
      console.log(e.dataset.pic);

      //cambio de imagen del modal con los botones prev y next

      nexaHis = document.querySelectorAll(".next");
      prevHis = document.querySelectorAll(".prev");
      let imgIndex = parseInt(e.dataset.pic);
      let mimg = document.querySelector(".modal__img");
      for (let j = 0; j < nexaHis.length; j++) {
        console.log(historyImg[j].dataset.pic);

        nexaHis[j].addEventListener("click", function () {
          if (imgIndex < historyImg.length - 1) {
            console.log(e.getAttribute("data-pic"));
            console.log(e.dataset.pic);

            console.log(imgIndex + 1);
            mimg.src = historyImg[imgIndex + 1].src;
            console.log(historyImg[imgIndex + 1].src);
            historyImg[imgIndex + 1].classList.remove("history__active");
            imgIndex++;

            console.log(add);
          } else {
            console.log("imgIndex es mas grande");

            modalContainer.classList.remove("modal__bg-on");
          }
        });
      }

      prevHis.forEach((e) => {
        e.addEventListener("click", () => {
          if (imgIndex > 0) {
            mimg.src = historyImg[imgIndex - 1].src;
            console.log(historyImg[imgIndex - 1].src);
            historyImg[imgIndex - 1].classList.remove("history__active");
            imgIndex--;
          } else {
            modalContainer.classList.remove("modal__bg-on");
          }
        });
      });
    });
  });
  add++;
};
let histContent = document.querySelectorAll(".history__content");
const namesHist = (e) => {
  let name = `<p class="history__name">${e}</p>`;
  histContent.appendChild(name);
};

//card de usuarios sugeridos
const showSuggest = (sug) => {
  let carSug = `
    
    <div class="info__suggest">
        <img src=${sug.url} class="img__suggest skeleton"></img>
        <div class="name__suggest ">
            <p>${nicknames[randomName].name}</p>
            <span class="follow" href="">Seguir</span>
        </div>
        <button class="close"><i class="fas fa-times"></i></button>
       
    `;
  randomName = Math.floor(Math.random() * nicknames.length);
  suggest.innerHTML += carSug;
  let x = document.querySelectorAll(".close");
  let info = document.querySelectorAll(".info__suggest");

  let cont = info.length;

  for (let i = 0; i < info.length; i++) {
    x[i].addEventListener("click", () => {
      info[i].remove();
      console.log(info.length);
      cont--;
      console.log(cont);
      if (cont == 0) {
        console.log("no hay sugerencias");
        console.log(cont);
        suggest.classList.add("main__suggest--close");
      }
    });
  }
};

//modal de las stories ejemplo
let modalImg = document.querySelectorAll(".modal__img");

const modalHist = () => {
  let openHis = document.querySelectorAll(".history__img");
  contHist.forEach((cont) => {
    cont.classList.add("modal__show");
    console.log(cont);
  });
  openHis.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.remove("history__active");
      modalContainer.classList.add("modal__bg-on");
    });

    modalContainer.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__close") ||
        e.target == modalContainer
      ) {
        modalContainer.classList.remove("modal__bg-on");
        openHis.forEach((e) => {
          e.classList.remove("modal__img");
        });
      }
    });
  });
};

getPost();
getData();

