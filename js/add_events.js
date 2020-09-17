window.onload = function(){
    document.querySelectorAll('button')[0].addEventListener('click', controller.create);
    document.querySelectorAll('button')[1].addEventListener('click', controller.addTextAreaJson.bind(controller));
    document.querySelectorAll('button')[2].addEventListener('click', controller.addTextAreaCSV.bind(controller));

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
