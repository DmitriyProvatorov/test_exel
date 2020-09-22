window.onload = function(){
    document.querySelector('.create').addEventListener('click', controller.create);
    document.querySelector('.get_json').addEventListener('click', controller.addTextAreaJson.bind(controller));
    document.querySelector('.get_csv').addEventListener('click', controller.addTextAreaCSV.bind(controller));
    document.querySelector('.table_container').addEventListener('click', controller.showHideMenu.bind(controller));
    document.querySelector('.menu').addEventListener('click', controller.events.bind(controller));
    document.querySelector('.get_file').addEventListener('click', controller.loadFile.bind(controller));
    getWord();
}

