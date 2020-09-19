let controller = {
    model: {json: null, lang: document.documentElement.lang},
    createAudio: function () {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = "./sounds/Sound_08029.mp3";
        this.audio = audio;
    },
    getJson: function (jsonString) {

        try {
            this.model.json = JSON.parse(jsonString);

        } catch (e) {
            alert(getWord("Not valid Json"));
        } finally {
            s = jsonString.split("\n");


            if (!this.model.json) {
                if (/,/.test(jsonString) && /\n/.test(jsonString)) {
                    alert(getWord("check CSV"))
                    let arrCsv = jsonString.split("\n");
                    arrCsv[0] = arrCsv[0].split(",");
                    arrCsv[1] = arrCsv[1].split(",");
                    this.model.json = [];
                    let _lenghtMax = arrCsv[0].length > arrCsv[1].length ? arrCsv[0].length : arrCsv[1].length;
                    for (let i = 0; i <= _lenghtMax; i++) {
                        this.model.json.push({name: arrCsv[0][i], value: arrCsv[1][i]});
                    }
                }
            }
        }
    },
    create: function () {
        let jsonString = document.querySelector('textarea').value;
        controller.model.json = false;
        controller.getJson(jsonString);
        controller.createTable();

    },
// [{"name":"name1", "value":"value1"},{"name":"name2", "value":"value2"}]
    createTable: function () {
        if(!this.model.json) {
            return;
        }
        let container = document.querySelector(".table_container")
        let fragment = document.createDocumentFragment();
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let headTr = document.createElement("tr");
        let tbody = document.createElement("tbody");
        let bodyTr = document.createElement("tr");


        tbody.appendChild(bodyTr);
        thead.appendChild(headTr);
        table.appendChild(thead);
        table.appendChild(tbody);
        this.createTableStructure(headTr, bodyTr, this.model.json);
        fragment.appendChild(table);
        container.innerHTML = "";
        container.appendChild(fragment);
        this.downloadJson();
        this.downloadCsv();
    },
    createTableStructure: function (head, body, _json) {
        _json.forEach(function (item, index) {

            let thHead = document.createElement("th");
            thHead.textContent = item.name;
            thHead.dataset.cellNum = index;
            thHead.dataset.fieldName = "name";
            thHead.setAttribute("title", item.name);
            let thBody = document.createElement("th");
            thBody.setAttribute("title", item.value);
            thBody.textContent = item.value;
            thBody.dataset.cellNum = index;
            thBody.dataset.fieldName = "value";
            head.appendChild(thHead);
            body.appendChild(thBody);
        });
        this.soundPlay();
    },
    createJsonString: function () {

        return JSON.stringify(this.model.json);
    },
    createStringCSV: function (_arr, paramName) {
        let _string = "";
        _arr.forEach(function (item, index) {

            if (index) {
                _string += ",";
            }
            _string = _string + item[paramName];

        });
        return _string;
    },
    createCSV: function () {
        let _string = "";

        _string += this.createStringCSV(this.model.json, "name");
        _string += "\n";
        _string += this.createStringCSV(this.model.json, "value");

        return _string;
    },
    addToTextArea: function (_string) {
        document.querySelector('textarea').value = _string;
    },
    addTextAreaJson: function () {
        let _string = this.createJsonString();
        this.addToTextArea(_string);


    },
    addTextAreaCSV: function () {
        let _string = this.createCSV();
        this.addToTextArea(_string)

    },
    showHideMenu(ev) {

        if (ev.srcElement.nodeName != "TH") {
            return;
        }
        let _menu = document.querySelector('.menu');
        _menu.style.top = ev.clientY + "px";
        _menu.style.left = ev.clientX + "px";
        if(this.model.cellNumForChange){
            this.changeFields(ev);
            return;
        }

        if (!this.model.cellectedField) {
            _menu.style.display = "block";
            controller.model.showMenu = true;
            this.model.cellectedField = ev.target;
        } else if (this.model.cellectedField.isEqualNode(ev.target)) {
            _menu.style.display = "none";
            controller.model.showMenu = false;
            this.model.cellectedField = false;


        } else {

            _menu.style.display = "block";
            controller.model.showMenu = true;

            this.model.cellectedField = ev.target;
        }



        this.selectСell(ev);


    },

    changeFields(ev){

        if(!this.model.cellNumForChange){
            return;
        }

        let cellNum = ev.target.dataset.cellNum;
        let fieldName = ev.target.dataset.fieldName;

        let _dataChange = JSON.parse(JSON.stringify(this.model.json[cellNum]));

        this.model.json[cellNum]= this.model.json[this.model.cellNumForChange];
          this.model.json[this.model.cellNumForChange] = _dataChange;

        this.model.cellNumForChange = false;
        this.model.fieldNameForChange = false;

        this.createTable();

    },
    selectСell(ev) {

        if (this.model.json) {

            let _th = document.querySelectorAll("th");

            _th.forEach(function (item) {

                item.classList.remove("active");

            });


        }

        if (this.model.showMenu) {
            ev.target.classList.add("active")
            this.model.cellNum = ev.target.dataset.cellNum;
            this.model.fieldName = ev.target.dataset.fieldName;
        } else {
            this.changeModelRemoveSelectField(ev)
        }
    },
    soundPlay() {
        this.audio.play();
        let that = this;
        setTimeout(function () {
            that.audio.currentTime = 0.0;
        }, 2000)
    },
    changeModelRemoveSelectField(ev) {
        this.model.cellNum = false;
        this.model.fieldName = false;
        if (this.model.cellectedField) {
            this.model.cellectedField.classList.remove("active")
        }
    },
    events(ev) {
        switch (ev.target.dataset.event) {
            case "add":
                this.model.json.splice(this.model.cellNum, 0, {name: "new", value: "new"});
                //this.model.showMenu = false;
                controller.createTable();
                this.changeModelRemoveSelectField();
                break;
            case "change":
                let _input = document.createElement("input");
                //_input.type = "string";
                _input.addEventListener("keyup", function (ev) {

                    if (ev.keyCode === 13) {
                        // Cancel the default action, if needed
                        ev.preventDefault();

                        controller.model.json[controller.model.cellNum][controller.model.fieldName] = ev.target.value;

                        controller.changeModelRemoveSelectField(ev);
                        controller.createTable();
                    }

                });
                this.model.cellectedField.classList.remove("active");

                this.model.cellectedField.innerHTML = "";
                this.model.cellectedField.appendChild(_input);
                break;
            case "delete":
                this.model.json.splice(this.model.cellNum, 1);
                // this.model.showMenu = false;
                this.changeModelRemoveSelectField();
                this.createTable();
                break;
            case "change-order":


                this.model.cellNumForChange =  this.model.cellNum;
                this.model.fieldNameForChange =  this.model.fieldName;
                break;
        }

        document.querySelector('.menu').style.display = "none";

    },
    downloadJson(){
        let a = document.querySelectorAll("a")[0];
        var file = new Blob([this.createJsonString()], {type:  'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'table.json';
    },
    downloadCsv(){
        let a = document.querySelectorAll("a")[1];
        var file = new Blob([this.createCSV()], {type:  'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'table.csv';
    },
    loadFile(){
        let inputFile = document.querySelector("#input_file");
        inputFile.click();

        inputFile.onchange =function() {


            var reader = new FileReader();
            reader.addEventListener('load', function () {

                controller.getJson(this.result);
                controller.createTable();

            });
            reader.readAsText(inputFile.files[0]);
        }
    }

};
