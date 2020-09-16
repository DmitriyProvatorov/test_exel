let creater = {
    getJson: function(json_string){
        try{
            this._json = JSON.parse(json_string);

        }
        catch (e) {
           alert( "Not valid Json")
        }
    },
    create: function(){
    let json_string= document.querySelector('textarea').value;
    creater.getJson(json_string);
    creater.createTable();
},

createTable: function() {

    let container = document.querySelector(".table_container")
    let fragment = document.createDocumentFragment();

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let head_tr = document.createElement("tr");
    let tbody = document.createElement("body");

    thead.appendChild(head_tr);

    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tbody);
    this.create_table_structure(head_tr, tbody, this._json);
    fragment.appendChild(table);
    container.innerHTML="";
    container.appendChild(fragment);
    },
    create_table_structure: function(head, body, _json){
        _json.forEach(function(item){
            if(item.isArray()){
                create_table_structure(head, body, _json);
            }
            else{

            }
        });
    }
};
