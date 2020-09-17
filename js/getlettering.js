let _DICTIONARY;

function getWord(){
   // return
    console.log('get')
    let defaultLang = "en";
    const DICTIONARY = {
        en: {
            "Create table" : "Create table",
            "Get Json": "Get Json",
            "Get CSV": "Get CSV",
            "Create file json": "Create file json",
            "Create file csv":  "Create file csv",
            "json or csv for create table": "json or csv for create table",
            "Add": "Add",
            "Change": "Change",
            "Delete": "Delete"
        },
        ru: {
            "Create table" : "Создать таблицу",
            "Get Json": "Получить Json",
            "Get CSV": "Получить CSV",
            "Create file json": "Создать файл json",
            "Create file csv":  "Создать файл csv",
            "json or csv for create table" : "json or csv для создания таблицы",
            "Add": "Добавить",
            "Change": "Изменить",
            "Delete": "Удалить"
        }
    }



    document.querySelectorAll("button,textarea").forEach(function(node) {

        console.log('in node')


        if(node.textContent || node.getAttribute("placeholder")) {







            if (!DICTIONARY[controller.model.lang]) {
                _DICTIONARY = DICTIONARY[defaultLang]
            } else {
                _DICTIONARY = DICTIONARY[controller.model.lang]
            }



            changeContent(node)

        }
    });

    function changeContent(node){
        console.log(node)
        let inscription = node.textContent || node.getAttribute("placeholder");

        if( node.hasAttribute("placeholder")){
            console.log(1)
            if (!_DICTIONARY[inscription]) {

                node.setAttribute("placeholder",  DICTIONARY[defaultLang][inscription]);
            } else {

                node.setAttribute("placeholder",  _DICTIONARY[inscription]);

            }
        }
        else if( node.textContent ){
            console.log(2)
            if (!_DICTIONARY[inscription]) {


                node.textContent =  DICTIONARY[defaultLang][inscription];
            } else {

                node.textContent =  _DICTIONARY[inscription]
            }
        }
    }



}