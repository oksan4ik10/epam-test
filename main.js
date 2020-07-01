'use strict';

const btnAdd = document.getElementById("add"),
        main = document.querySelector("main"),
        formEditor = document.querySelector("form"),
        editorHead = document.getElementById("editor-head"),
        btnZ = document.getElementById("btn-z");



const appData = [{
        img:"./img/Digital-Harry-Potter-1.jpg",
        head:"Гарри Поттер и философский камень",
        author:"Джоан Роулинг",
        year:"1997",
    },
    {
        img:"./img/Digital-Harry-Potter-2.jpg",
        head:"Гарри Поттер и Тайная комната",
        author:"Джоан Роулинг",
        year:"1998",
    }
];        
//чтение данных из формы
 const readForm = (form) =>{
    let body={};
                formData.forEach((val, key) => {
                    body[key] = val;
    });
    return body;
 };
 

//функция для редактирования формы
const editorBooks = (target) =>{
    main.classList.add("none");
    formEditor.classList.remove("none");
    editorHead.textContent="Редактирование книги";
    const dataLi = target.closest("li");

    appData.forEach((elem) =>{
      if((dataLi.querySelector("img").getAttribute("src")===elem.img)&&(dataLi.querySelector("h2").textContent===elem.head)){
        formEditor.querySelectorAll("input").forEach((e) => {
            e.value = elem[e.getAttribute("name")];
        });
       return;
      }  
    })
    
};

//рендер
const mainUl = document.querySelector("main ul");
const render = () =>{
    mainUl.textContent = "";
    appData.forEach((elem) =>{
        const li = document.createElement("li");
        li.innerHTML=`<img src=${elem.img} alt="Harry Potter 2">
                    <div class="about-book">
                        <h2>${elem.head}</h2>
                        <p>${elem.author}</p>
                        <p>${elem.year}</p>
                    </div>
                    <div class="change">
                        <button class="btn-editor">Редактировать</button>
                        <button class="btn-delete">Удалить</button>
                    </div>`
        mainUl.append(li);
    });  
};

render();



//кнопка Отмена
btnZ.addEventListener("click", (event)=>{
    event.preventDefault();
    formEditor.querySelectorAll("input").forEach((item) => {
        item.value="";
    });
    main.classList.remove("none");
    formEditor.classList.add("none");
})



//замена формы "Добавить книгу"        
btnAdd.addEventListener("click", ()=>{
    editorHead.textContent="Добавить книгу";
    main.classList.add("none");
    formEditor.classList.remove("none");

});

main.addEventListener("click",(event)=>{
    const target = event.target;

    //редактирование 
    if (target.matches(".btn-editor")) {
        
        
        editorBooks(target);
    }
    
});



