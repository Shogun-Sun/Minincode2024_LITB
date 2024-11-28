ymaps.ready(init);

function init() {
    var map = new ymaps.Map("map", {
        center: [55.751574, 37.573856], // Координаты центра карты (Москва, например)
        zoom: 10 // Уровень приближения
    });

    // Пример добавления метки
    var placemark = new ymaps.Placemark([55.751574, 37.573856], {
        hintContent: 'Это Москва!',
        balloonContent: 'Столица России'
    });

    map.geoObjects.add(placemark);
}
