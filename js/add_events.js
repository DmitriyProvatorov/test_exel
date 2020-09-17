window.onload = function(){
    document.querySelector('.create').addEventListener('click', controller.create);
    document.querySelector('.get_json').addEventListener('click', controller.addTextAreaJson.bind(controller));
    document.querySelector('.get_csv').addEventListener('click', controller.addTextAreaCSV.bind(controller));

    document.querySelector('.table_container').addEventListener('click', controller.showHideMenu.bind(controller));

    getWord();



    /*
    let inputFile = document.querySelector("#input_file");
    console.log(inputFile)
    inputFile.onchange =function() {


        var reader = new FileReader();
        reader.addEventListener('load', function () {
            document.getElementById('file').innerText = this.result;
        });
        reader.readAsText(inputFile.files[0]);
    }

     */

}
    //на документ и по дата атрибутам смотреть что есть что ну или по тегу
