const main = document.querySelector(".card__content");
const historias = document.querySelector(".history");
const historyContent = document.querySelector(".history__container")
const suggest = document.querySelector(".main__suggest");
let page = 1;
const nicknames = [
  {
    "name": "Oliver"
  },
  {
    "name": "Leo"
  },
  {
    "name": "Smokey"
  },
  {
    "name": "Toby"
  },
  {
    "name": "Buddy"
  },
  {
    "name": "Leo"
  },
  {
    "name": "Felix"
  },
  {
    "name": "George"
  },
  {
    "name": "Salem"
  },
  {
    "name": "Binx"
  },
  {
    "name": "Dexter"
  },
  {
    "name": "Gus"
  },
  {
    "name": "Luna"
  },
  {
    "name": "Bella"
  },
  {
    "name": "Lucy"
  },
  {
    "name": "Kitty"
  },
  {
    "name": "Nala"
  },
  {
    "name": "Stella"
  },
  {
    "name": "Daisy"
  },
  {
    "name": "Mia"
  },
  {
    "name": "Gracie"
  },
  {
    "name": "Callie"
  },
  {
    "name": "willow"
  },
  {
    "name": "kiki"
  },
  {
    "name": "coco"
  },
  {
    "name": "Minnie"
  }
]

let randomName = Math.floor(Math.random() * nicknames.length)
let likeCont = Math.floor(Math.random() *100)

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

// const getData = () =>{
//     let page = `https://cataas.com/`
//     fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc`)
//     .then(result => result.json())
//     .then(data => {
//         data.forEach(e =>{
//             console.log(e)
//             showPostData(e)

//         })
//     })
// }

let dataImages = []
let add = 0
let contHist = document.querySelectorAll(".history__content")
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
      historyContent.classList.add("history__show")
      dataHis.forEach((e) => {
        dataImages = dataHis
        console.log(dataImages)
        showHistory(e);
 
        hideLoadingHist()
        
        // console.log(e)
      });
      modalHist()


      dataSug.forEach((e) => {
        showSuggest(e);
        hideLoadSug()

        // console.log(e)
      });
    });
};

const getPost = async () => {

  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
  )
  
    .then((result) => result.json())

    .then(async(data) => {
    
      data.forEach((e) => {
        
        console.log(e);
        showPostData(e);
        hideLoading()
    

      })
  

      const traer = document.querySelectorAll(".main__card");
      let ultimacard = traer[traer.length - 1];
      console.log(ultimacard);
      observer.observe(ultimacard);
    })
   
};

const hideLoading = () =>{
  let skeleton = document.querySelectorAll(".card__img")
  setTimeout(() => {
    for(let i = 0; i < skeleton.length; i++){
      skeleton[i].classList.add("skeleton__off")
      console.log("hola")
    }
  }, 3000);

}

const hideLoadingHist = () =>{
  let historyImg = document.querySelectorAll(".history__img")
  setTimeout(() => {
    for(let i = 0; i < historyImg.length; i++){
      historyImg[i].classList.remove("skeleton")
    }  
  }, 3000);
  
}

const hideLoadSug =() =>{
  let suggestImg = document.querySelectorAll(".img__suggest")
  setTimeout(() => {
    for(let i = 0; i < suggestImg.length; i++){
      suggestImg[i].classList.remove("skeleton")
    }  
  }, 3000);
  
}
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
randomName = Math.floor(Math.random() * nicknames.length)
likeCont = Math.floor(Math.random() *100)
  main.innerHTML += catData;
}
let con = 0
const showHistory = (his) => {
  
  let imgHis
  // for(let i = 0; i< nicknames.length; i++){
  //   console.log(nicknames[i].name)
  // }
  
 imgHis = `
    <div class="history__content">
        <img src=${his.url} data-pic=${add}  class="history__img history__active skeleton "></img>
        <p class="history__name">${nicknames[randomName].name}</p>
    </div>
     
</div>
    `;
//     <div class="modal__info">
  
//     <div class="modal__time">12/08/2021</div>
//     <div class="modal__icon">
//         <span class="modal__media"><i class="far fa-heart"></i><span>
//     </div>
//     </div>
// <i class="fas fa-times modal__close"></i>
// <i class="fas fa-chevron-right next"></i>
// <i class="fas fa-chevron-left prev"></i>
// </div>
randomName = Math.floor(Math.random() * nicknames.length)
 
  historias.innerHTML += imgHis;

let historyImg = document.querySelectorAll(".history__img")
let nexaHis

historyImg.forEach((e =>{
     
  const fecha = new Date()
  e.addEventListener("click", () =>{
    document.body.classList.toggle("bodyHide")
      modalContainer.classList.add("modal__bg-on")
console.log(e.src)
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
</div>`

  modalContainer.innerHTML = mostrar
  

  for(let i = 0; i < historyImg.length; i++){
    console.log(historyImg[i].getAttribute("data-pic"))
    console.log(historyImg[i].getAttribute("src"))
     console.log(historyImg[i].dataset.pic)

  }
  

  console.log(e.getAttribute("data-pic"))
  console.log(e.dataset.pic)
nexaHis  = document.querySelectorAll(".next")
prevHis = document.querySelectorAll(".prev")
let asdx = parseInt(e.dataset.pic) 
let mimg = document.querySelector(".modal__img")
    for(let j = 0; j < nexaHis.length; j++){
      
      console.log(historyImg[j].dataset.pic)
     
  nexaHis[j].addEventListener("click", function (){
  
    for(let i = 0; i < historyImg.length; i++){
      if(i == j){
        console.log(historyImg[i+1].src)
        console.log(j)
        console.log(i)
      }
    }
    if(asdx < historyImg.length-1){
      console.log(e.getAttribute("data-pic"))
      console.log(e.dataset.pic)
    
      console.log(asdx + 1)
      mimg.src = historyImg[asdx + 1].src
      console.log(historyImg[asdx + 1].src)
      historyImg[asdx + 1].classList.remove("history__active")
      asdx++

      console.log(e)

 
      // console.log(historyImg[add].src)
      console.log(add)
    }else{
      console.log("asdx es mas grande")
    
      modalContainer.classList.remove("modal__bg-on")
    
    }
 

  })
}

prevHis.forEach((e) =>{
  e.addEventListener("click", () =>{
     console.log("qweas")
    if(asdx > 0){
      mimg.src = historyImg[asdx - 1].src
      console.log(historyImg[asdx - 1].src)
      historyImg[asdx - 1].classList.remove("history__active")
      asdx--
    }else{
      modalContainer.classList.remove("modal__bg-on")
    }
  })
})
})

})
)


// imgHis.forEach((e) =>{
//   modalContainer.classList.add("modal__bg-on")
//   e.addEventListener("click", () =>{
//     let mostrar = `
//     <div class="modal__show">
  
//     <img class="modal__img" src=${his.src} data-img=${add} data-exa=${add}></img>
//         <div class="modal__info">
  
//             <div class="modal__time">12/08/2021</div>
//             <div class="modal__icon">
//                 <span class="modal__media"><i class="far fa-heart"></i><span>
//             </div>
//             </div>
//         <i class="fas fa-times modal__close"></i>
//         <i class="fas fa-chevron-right next"></i>
//         <i class="fas fa-chevron-left prev"></i>
//     </div>
//   </div>`
  
//     modalContainer.innerHTML = mostrar
//   })
// })

 
//   let asdaxzc = document.querySelectorAll(".history__img")
//   let nexta = document.querySelector(".next")
//   console.log(modalImg)
//   console.log(his)
//   // let conta = {...asdaxzc.dataset.img}
//   // console.log(conta)
//    nexta.addEventListener("click", () =>{
//      asdaxzc.forEach((e) =>{
//       e.addEventListener("click", () =>{
//         console.log(e)
   
  
//        console.log(modalImg.src)
//        console.log(dataImages)
//        for(let i = 0; i < dataImages.length; i++){
//          console.log(dataImages[i].url)
//          asdaxzc.src = dataImages[i].url
//          console.log(modalImg)
//          console.log(asdaxzc)
//        }
   
//        console.log(dataImages[2].url)
//         console.log(asdaxzc)
//      })
//     })
//     })
     add++
};
let histContent = document.querySelectorAll(".history__content")
const namesHist = (e) =>{
let name =  `<p class="history__name">${e}</p>`
histContent.appendChild(name)
}

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
    randomName = Math.floor(Math.random() * nicknames.length)
  suggest.innerHTML += carSug;
  let x = document.querySelectorAll(".close")
  let info = document.querySelectorAll(".info__suggest")
  
  let cont = 10

  
  for(let i = 0; i < info.length; i++){
  

    x[i].addEventListener("click", ()=>{
      console.log("aqui")
      info[i].remove()
       console.log(info.length)
       console.log(info[i])
       cont--
       console.log(cont)
       if(cont == 0){
        console.log("no hay sugerencias")
        console.log(cont)
        suggest.classList.add("main__suggest--close")
      }
      })

    }
  
};


// const names = async () => {
//   fetch(`https://api.fungenerators.com/name/generate?category=cat&limit=6`)

//   .then((result) => result.json())
//   .then(data => {
//       console.log(data)
//    data.contents.names.forEach((e) => {
//       console.log(data)

//     }
//    )
//   })
// }



let modalImg = document.querySelectorAll(".modal__img")

let modalContainer = document.querySelector(".modal__bg")

const modalHist = () =>{
  let openHis = document.querySelectorAll(".history__img")
      contHist.forEach(cont => {
           cont.classList.add("modal__show")
           console.log(cont)
         })
  openHis.forEach(e => {
    console.log(e)

      e.addEventListener("click", () =>{
          console.log("puede ser")
          console.log(e)
         
       modalshow(e)
         e.classList.remove("history__active")
         modalContainer.classList.add("modal__bg-on")
      
       
        
      })
      if(modalContainer.classList.contains(".modal__bg")){
        e.classList.remove("modal__img")
        console.log("asdf")
       }
      let datos = []
      for(let i =0; i < openHis.length; i++){
        datos.push({"id":[i], "images":openHis[i]})
      }
     
      let cont =0;

      console.log(datos)
      // let nexta = document.querySelectorAll(".next")
      // console.log(modalImg)
   
      //  nexta.forEach(e => {
      //    e.addEventListener("click", () =>{
      //      modalImg.src = openHis[cont].img
      //      console.log(modalImg.src)
      //      console.log(dataImages)
      //      for(let i = 0; i < dataImages.length; i++){
      //        console.log(dataImages[i].url)
             
      //        console.log(modalImg)
      //      }
      //      modalImg.src = dataImages[2].url
      //      console.log(dataImages[2].url)
      //    })
  
      //  })
      modalContainer.addEventListener("click", (e) =>{
        console.log(e.target)
       
        // if (e.target.classList.contains("prev")) {
        //   if (cont > 0) {
        //     modalImg.src = openHis[cont - 1].img;

        //     cont--;
        //   } else {
        //     let mostrar = `
        //     <div class="modal__show">
          
        //     <img class="modal__img" src=${openHis[6].src} ></img>
        //         <div class="modal__info">
          
        //             <div class="modal__time">12/08/2021</div>
        //             <div class="modal__icon">
        //                 <span class="modal__media"><i class="far fa-heart"></i><span>
        //             </div>
        //             </div>
        //         <i class="fas fa-times modal__close"></i>
        //         <i class="fas fa-chevron-right next"></i>
        //         <i class="fas fa-chevron-left prev"></i>
        //     </div>
        // </div>`;
        //     modalContainer.innerHTML = mostrar;

        //     cont = openHis.length - 1;
        //   }
        // // } else if (e.target.classList.contains("next")) {
        // //   if (cont < openHis.length - 1) {
        // //     console.log(modalImg);
        // //     console.log(openHis[cont].src);
        // //     modalImg.src = dataImages[cont].url;
        // //     console.log(modalImg.src);

        // //     cont++;
        // //     console.log(cont);
        // //     console.log("primer next");
        // //   } else {
        // //     let mostrar = `
        // //     <div class="modal__show">
          
        // //     <img class="modal__img" src=${openHis[0].src} ></img>
        // //         <div class="modal__info">
          
        // //             <div class="modal__time">12/08/2021</div>
        // //             <div class="modal__icon">
        // //                 <span class="modal__media"><i class="far fa-heart"></i><span>
        // //             </div>
        // //             </div>
        // //         <i class="fas fa-times modal__close"></i>
        // //         <i class="fas fa-chevron-right next"></i>
        // //         <i class="fas fa-chevron-left prev"></i>
        // //     </div>
        // // </div>`;
        // //     modalContainer.innerHTML = mostrar;
        // //     cont = 0;

        // //     modalContainer.classList.remove("modal__bg-on");
        // //   }
        // }

        if(e.target.classList.contains("modal__close") || e.target == modalContainer){
          modalContainer.classList.remove("modal__bg-on")
          openHis.forEach(e =>{
            e.classList.remove("modal__img")
          })
        }
        
      })
  })

}
let exa = 1
  const modalshow = (e) =>{
    
//     modalContainer.classList.add("modal__bg-on")

//     for(let i = 0; i < e.length; i++){
//       console.log(e.src)
//     }

//     let mostrar = `
//     <div class="modal__show">
  
//     <img class="modal__img" src=${e.src} data-img=${add} data-exa=${add}></img>
//         <div class="modal__info">
  
//             <div class="modal__time">12/08/2021</div>
//             <div class="modal__icon">
//                 <span class="modal__media"><i class="far fa-heart"></i><span>
//             </div>
//             </div>
//         <i class="fas fa-times modal__close"></i>
//         <i class="fas fa-chevron-right next"></i>
//         <i class="fas fa-chevron-left prev"></i>
//     </div>
// </div>`

//     modalContainer.innerHTML = mostrar
//     let asdaxzc = document.querySelector(".modal__img")
//     let nexta = document.querySelector(".next")
//     console.log(modalImg)
//     console.log(e)
//     let conta = {...asdaxzc.dataset.img}
//     console.log(conta)
//      nexta.addEventListener("click", () =>{
       
//          console.log(modalImg.src)
//          console.log(dataImages)
//          for(let i = 0; i < dataImages.length; i++){
//            console.log(dataImages[i].url)
//            asdaxzc.src = dataImages[i].url
//            console.log(modalImg)
//            console.log(asdaxzc)
//          }
     
//          console.log(dataImages[2].url)
//           console.log(asdaxzc)
//        })

     }
     
  

 
getPost();
getData();
