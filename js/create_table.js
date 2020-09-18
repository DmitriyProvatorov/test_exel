let controller = {
    model: {json: null, lang: document.documentElement.lang},
    createAudio: function () {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = "./sounds/Sound_08029.mp3";
        this.audio = audio;
    },
    getJson: function (json_string) {
        console.log('in get');
        try {
            this.model.json = JSON.parse(json_string);
            console.log( this.model.json)
        } catch (e) {
            alert("Not valid Json");
        } finally {
            s = json_string.split("\n");


            if (!this.model.json) {
                if (/,/.test(json_string) && /\n/.test(json_string)) {
                    alert("check CSV")
                    let arr_csv = json_string.split("\n");
                    arr_csv[0] = arr_csv[0].split(",");
                    arr_csv[1] = arr_csv[1].split(",");
                    this.model.json = [];
                    let _lenght_max = arr_csv[0].length > arr_csv[1].length ? arr_csv[0].length : arr_csv[1].length;
                    for (let i = 0; i <= _lenght_max; i++) {
                        this.model.json.push({name: arr_csv[0][i], value: arr_csv[1][i]});
                    }
                }
            }
        }
    },
    create: function () {
        let json_string = document.querySelector('textarea').value;
        controller.getJson(json_string);
        controller.createTable();

    },
// [{"name":"name1", "value":"value1"},{"name":"name2", "value":"value2"}]
    createTable: function () {
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
        this.create_table_structure(head_tr, body_tr, this.model.json);
        fragment.appendChild(table);
        container.innerHTML = "";
        container.appendChild(fragment);
        this.downloadJson();
        this.downloadCsv();
    },
    create_table_structure: function (head, body, _json) {
        _json.forEach(function (item, index) {

            let th_head = document.createElement("th");
            th_head.textContent = item.name;
            th_head.dataset.cellNum = index;
            th_head.dataset.fieldName = "name";
            th_head.setAttribute("title", item.name);
            let th_body = document.createElement("th");
            th_body.setAttribute("title", item.value);
            th_body.textContent = item.value;
            th_body.dataset.cellNum = index;
            th_body.dataset.fieldName = "value";
            head.appendChild(th_head);
            body.appendChild(th_body);
        });
        this.soundPlay();
    },
    createJsonString: function () {

        return JSON.stringify(this.model.json);
    },
    createStringCSV: function (_arr, paramName) {
        let _string = "";
        _arr.forEach(function (item, index) {
            console.log(_string, item[paramName])
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
        this.soundPlay();

    },
    addTextAreaCSV: function () {
        let _string = this.createCSV();
        this.addToTextArea(_string)
        this.soundPlay();
    },
    showHideMenu(ev) {

        if (ev.srcElement.nodeName != "TH") {
            return;
        }
        let _menu = document.querySelector('.menu');
        _menu.style.top = ev.clientY + "px";
        _menu.style.left = ev.clientX + "px";
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


        // this.soundPlay();
        this.selectСell(ev);


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
            this.model.cellNum = event.target.dataset.cellNum;
            this.model.fieldName = event.target.dataset.fieldName;
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
                        console.log(controller)
                        controller.model.json[controller.model.cellNum][controller.model.fieldName] = ev.target.value;
                        console.log(controller.model.json)
                        controller.changeModelRemoveSelectField(ev);
                        controller.createTable();
                    }

                });
                this.model.cellectedField.classList.remove("active");
                console.log(this.model.cellectedField)
                this.model.cellectedField.innerHTML = "";
                this.model.cellectedField.appendChild(_input);
                break;
            case "delete":
                this.model.json.splice(this.model.cellNum, 1);
                // this.model.showMenu = false;
                this.changeModelRemoveSelectField();
                this.createTable();
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
                console.log(typeof this.result);
            });
            reader.readAsText(inputFile.files[0]);
        }
    }
};
