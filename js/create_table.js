let controller = {
    model:{json: null, lang: document.documentElement.lang},
    getJson: function(json_string){
        try{

            this.model.json = JSON.parse(json_string);

        }
        catch (e) {
           alert( "Not valid Json");
        }
        finally{
            console.log("!in finaly");
            s=json_string.split("\n");
            console.log(s)

            if(!this.model.json){
               if( /,/.test(json_string) && /\n/.test(json_string)){
                   alert("check CSV")
                   let arr_csv =json_string.split("\n");
                   arr_csv[0] = arr_csv[0].split(",");
                   arr_csv[1] = arr_csv[1].split(",");
                   this.model.json = [];
                   let _lenght_max =arr_csv[0].length >  arr_csv[1].length ? arr_csv[0].length : arr_csv[1].length;
                   for (let i= 0; i <= _lenght_max; i++){
                       this.model.json.push({name: arr_csv[0][i], value: arr_csv[1][i]});
                   }

               }
            }
        }
    },
    create: function(){
    let json_string= document.querySelector('textarea').value;
    controller.getJson(json_string);
    controller.createTable();
},
// [{"name":"name1", "value":"value1"},{"name":"name2", "value":"value2"}]
createTable: function() {

     if(!this.model.json) {
         return;
     }

    let container = document.querySelector(".table_container")
    let fragment = document.createDocumentFragment();

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let head_tr = document.createElement("tr");
    let tbody = document.createElement("tbody");
    let body_tr = document.createElement("tr");
    tbody.appendChild(body_tr);

    thead.appendChild(head_tr);

    table.appendChild(thead);
    table.appendChild(tbody);
    console.log(this.model.json)
    this.create_table_structure(head_tr, body_tr, this.model.json);
    fragment.appendChild(table);
    container.innerHTML="";
    container.appendChild(fragment);
    },
    create_table_structure: function(head, body, _json){
        _json.forEach(function(item){

                let th_head =   document.createElement("th");
                th_head.textContent = item.name;
                th_head.setAttribute("title", item.name);
                    let th_body = document.createElement("th");
                    th_body.setAttribute("title", item.value);
                th_body.textContent = item.value;
                head.appendChild(th_head);
                body.appendChild(th_body);


        });
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = "./sounds/Sound_08029.mp3";
        audio.play();
    },



    createJsonString: function(){

        return JSON.stringify(this.model.json);



    },

    createStringCSV: function(_arr, paramName){
        let _string = "";
        _arr.forEach(function (item, index){
            console.log( _string, item[paramName])
            if(index){
                _string +=",";
            }
            _string =  _string +  item[paramName];

        });

        return _string;
    },

    createCSV: function(){
        let _string = "";

        _string += this.createStringCSV(this.model.json, "name");
        _string += "\n";
        _string += this.createStringCSV(this.model.json, "value");

        return _string;


    },
    addToTextArea: function(_string){
        document.querySelector('textarea').value = _string;
    },
    addTextAreaJson: function(){
        console.log(this)
        let _string = this.createJsonString();
        this.addToTextArea(_string);

    },
    addTextAreaCSV: function(){
        let _string =this.createCSV();
        this.addToTextArea(_string)
    },
    showHideMenu(ev){
        console.log(ev)
        let _menu = document.querySelector('.menu');
        console.log(ev)
        _menu.style.top = ev.offsetY + "px";
        _menu.style.left = ev.offsetX + "px";
        if(!controller.model.showMenu) {
            _menu.style.display = "block";
            controller.model.showMenu = true;
        } else{
            _menu.style.display = "none";
            controller.model.showMenu = false;
        }


    }
};
