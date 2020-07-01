'use strict';

const btnAdd = document.getElementById("add"),
        main = document.querySelector("main"),
        formEditor = document.querySelector("form"),
        editorHead = document.getElementById("editor-head"),
        btnZ = document.getElementById("btn-z"),
        btnSave = document.getElementById("btn-save");



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
    const formData = new FormData(form);
        formData.forEach((val, key) => {
            body[key] = val;
    });
    return body;
 };
 //обнуление данных с формы после нажатия на кнопки
 const zeroForm = ()=>{
    formEditor.querySelectorAll("input").forEach((item) => {
        item.value="";
    });
    main.classList.remove("none");
    formEditor.classList.add("none");
    btnSave.removeEventListener("click", eSave);
 }




//функция для сохранения данных в объекте
const editorSave = (i)=>{
    event.preventDefault();
    // console.log(a);
    const newObj = readForm(formEditor);
    appData[i] = newObj;
    main.classList.remove("none");
    formEditor.classList.add("none");
    render();
    zeroForm();

};

let eSave; //вспомогательная переменная для удаления обработчика события сохранения

//функция для редактирования формы
const editorBooks = (dataLi) =>{
    main.classList.add("none");
    formEditor.classList.remove("none");
    editorHead.textContent="Редактирование книги";
    // const dataLi = target.closest("li");

    appData.some((elem, item) =>{
      if((dataLi.querySelector("img").getAttribute("src")===elem.img)&&(dataLi.querySelector("h2").textContent===elem.head)){
        formEditor.querySelectorAll("input").forEach((e) => {
            e.value = elem[e.getAttribute("name")];
        });
        eSave = editorSave.bind(this, item);
        btnSave.addEventListener("click",eSave, false);
        return elem;
      };
      
    });
};
//функция для удаления формы
const deleteBook = (dataLi)=>{
    appData.some((elem, item) =>{
        if((dataLi.querySelector("img").getAttribute("src")===elem.img)&&(dataLi.querySelector("h2").textContent===elem.head)){
            appData.splice(item,1);
        }
        return elem;
    });
    render();
    
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
    zeroForm();

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
    if (target.matches(".btn-editor")) editorBooks(target.closest("li"));


    //удаление
    if (target.matches(".btn-delete")) deleteBook(target.closest("li"));
    
});



