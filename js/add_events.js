window.onload = function(){
    let button_create_table = document.querySelector('button').addEventListener('click', creater.create);



    let inputFile = document.querySelector("#input_file");
    console.log(inputFile)
    inputFile.onchange =function() {


        var reader = new FileReader();
        reader.addEventListener('load', function () {
            document.getElementById('file').innerText = this.result;
        });
        reader.readAsText(inputFile.files[0]);
    }

}
    //на документ и по дата атрибутам смотреть что есть что ну или по тегу
