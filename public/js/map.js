ymaps.ready(init);

function init() {
    var map = new ymaps.Map("map", {
        center: [56.326797, 44.006516], // Координаты центра карты (Москва, например)
        zoom: 10 // Уровень приближения
    });

    // Пример добавления метки
    ymaps.geocode("Нижний Новгород ул челюскинцев 9").then(function (res) {
        var coord = res.geoObjects.get(0).geometry.getCoordinates();
        var myPlacemark = new ymaps.Placemark(coord, {
            balloonContentHeader: "Заголовок",
            balloonContentBody: "Содержимое",
            balloonContentFooter: "Подвал",
            hintContent: "Подсказка"
        }, {
            preset: 'islands#blueDotIcon'
        });
        map.geoObjects.add(myPlacemark); 
    });

}
