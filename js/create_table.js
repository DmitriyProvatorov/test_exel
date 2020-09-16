let creater = {
    getJson: function(json_string){
        try{
            this.model = JSON.parse(json_string);

        }
        catch (e) {
           alert( "Not valid Json")
        }
        finally{
            console.log("!in finaly")
            if(!this.model){
               if( /,/.test(json_string)){
                   let arr_csv =json_string.split(",");
                   this.model = [];
                   for (item of arr_csv){
                       this.model.push({name: null, value: item})
                   }
               }
            }
        }
    },
    create: function(){
    let json_string= document.querySelector('textarea').value;
    creater.getJson(json_string);
    creater.createTable();
},
// [{"name":"name1", "value":"value1"},{"name":"name2", "value":"value2"}]
createTable: function() {

     if(!this.model) {
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
    console.log(this.model)
    this.create_table_structure(head_tr, body_tr, this.model);
    fragment.appendChild(table);
    container.innerHTML="";
    container.appendChild(fragment);
    },
    create_table_structure: function(head, body, _json){
        _json.forEach(function(item){

                let th_head =   document.createElement("th");
                th_head.textContent = item.value;
                    let th_body = document.createElement("th");
                th_body.textContent = item.name;
                head.appendChild(th_head);
                body.appendChild(th_body);


        });
    }
};
