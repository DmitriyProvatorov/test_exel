let _DICTIONARY;

function getWord(_string) {
    // return

    let defaultLang = "en";
    const DICTIONARY = {
        en: {
            "Create table": "Create table",
            "Get Json": "Get Json",
            "Get CSV": "Get CSV",
            "Create file json": "Create file json",
            "Create file csv": "Create file csv",
            "json or csv for create table": "json or csv for create table",
            "Add": "Add",
            "Change": "Change",
            "Delete": "Delete",
            "Load from file": "Load from file",
            "download json file": "download json file",
            "download csv file": "download csv file",
            "check CSV": "check CSV",
            "Not valid Json": "Not valid Json"
        },
        ru: {
            "Create table": "Создать таблицу",
            "Get Json": "Получить Json",
            "Get CSV": "Получить CSV",
            "Create file json": "Создать файл json",
            "Create file csv": "Создать файл csv",
            "json or csv for create table": "json or csv для создания таблицы",
            "Add": "Добавить",
            "Change": "Изменить",
            "Delete": "Удалить",
            "Load from file": "Загрузить из файла",
            "download json file": "скачать  json файл",
            "download csv file": "скачать csv файл",
            "check CSV": "Проверка CSV",
            "Not valid Json": "Не валидный Json"
        }
    }



    if (!DICTIONARY[controller.model.lang]) {
        _DICTIONARY = DICTIONARY[defaultLang]
    } else {
        _DICTIONARY = DICTIONARY[controller.model.lang ]
    }
    if(_string){
        console.log(_DICTIONARY, _string)
        return _DICTIONARY[ _string]
    } else {

        document.querySelectorAll("button,textarea, a").forEach(function (node) {


            if (node.textContent || node.getAttribute("placeholder")) {


                changeContent(node)

            }

        });
    }

    function changeContent(node) {

        let inscription = node.textContent || node.getAttribute("placeholder");

        if (node.hasAttribute("placeholder")) {

            if (!_DICTIONARY[inscription]) {

                node.setAttribute("placeholder", DICTIONARY[defaultLang][inscription]);
            } else {

                node.setAttribute("placeholder", _DICTIONARY[inscription]);

            }
        } else if (node.textContent) {

            if (!_DICTIONARY[inscription]) {


                node.textContent = DICTIONARY[defaultLang][inscription];
            } else {

                node.textContent = _DICTIONARY[inscription]
            }
        }
    }


}