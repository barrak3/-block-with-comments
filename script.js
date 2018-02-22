class Container {  //класс контейнер для блока с комментариями 
  constructor(field){
    this.count = 0;
    this.field = field;
  }

  create(){

    var p = document.createElement("p");
    p.id = "count";
    p.textContent = "Количество комментариев " + this.count;
    this.field.appendChild(p);
    
    var Build = new FormBuild(this.field,0); //создание первого объекта для добавления комментариев 
    Build.create(); 


  }



}



class FormBuild extends Container { //класс для создания формы для ввода сообщения
	constructor(field, lvl){
	super(field);
    this.lvl = lvl; // переменная служит для определения уровня коментариев
    }
   
    create(){

      var that = this;

      var div = document.createElement("div");
      var p = document.createElement("p");
      p.textContent = "Добавить новый комментарий";
      var input = document.createElement("input");
      var button = document.createElement("button");  

      button.textContent = "Отправить";
      
      
      button.addEventListener("click", function (argument) {
      	
      	var text = input.value;
      	
      	if (text == "") return;  //проверка введен ли комментарий
      	
      	input.value = "";  //очиста импута после добавления комментария
      	
      	var comment = new AddComment(div, that.lvl, text);  //создание объекта комментария
      	
      	comment.create();

      	var p = document.getElementById("count");  // обновление кол-ва комментариев после добавления нового
        var count = +p.textContent[p.textContent.length-1];
      	p.textContent =  "Количество комментариев " + ++count;

      } ); 
    
 

      div.appendChild(p);
      div.appendChild(input);
      div.appendChild(button);
      
      div.style.margin = "5px";
      div.style.border = "1px solid black";

      if(this.lvl == 1) {div.style.marginLeft = "20px";} // показываем что новый коментарий лежит ниже уровнем

      this.field.appendChild(div);

    }
}

class AddComment extends FormBuild { //класс создания новых комментариев
	constructor(field, lvl,text){
	  super(field,lvl);
      this.like = 0;  //кол-во лайков у комментария, тк в программа работает  без запросов к веб сервисов была добавлена воможность только приболять один лайк или убавлять если вы его уже поставили
      this.text = text;
    }

    create(){

      var that = this;

      var flag = true; //флаг для определения увеличивать или уменьшать лайк при нажатии 

      var div = document.createElement("div");
      
      var span = document.createElement("span");

      span.innerHTML = "&#9829; " + this.like;
      span.style.float = "right";

      span.addEventListener("click", function (event) {
     
      	if (flag){ 
      	  that.like++;
      	} else {  
      	  that.like--;
      	}
        
        flag = !flag;
      	span.innerHTML = "&#9829; " + that.like;

      });

      div.style.margin = "5px";
      div.style.border = "1px solid black";

      div.appendChild(span);

      var p = document.createElement("p");
      p.textContent = this.text;
      div.appendChild(p);

      if (this.lvl == 0){ // если уровень нулевой то тогда у наших коментариев будет кнопка "Ответить"

        var button = document.createElement("button");  
        button.textContent = "Ответить";	

        button.addEventListener("click", function (event) {
        	button.disabled = true;
        	var form = new FormBuild( div, 1);
        	form.create();
        } ); 

        div.appendChild(button);

      }

      else{ div.style.marginLeft = "20px"; } // иначе показывает с помощью отступа что уровень ниже
     
     
      
     
      this.field.parentNode.insertBefore(div, this.field);
 

    }
 
  }
  
  


var block = document.getElementById("block");
var content = new Container(block);
content.create();

   
  

