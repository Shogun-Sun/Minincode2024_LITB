
let orgData;

fetch("/organization/getverified/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .then((data) => {
    console.log(data)
        orgData = data;
        ymaps.ready(init);
})

function init() {
    var map = new ymaps.Map("map", {
        center: [56.326797, 44.006516], // Координаты центра карты (Москва, например)
        zoom: 10 // Уровень приближения
    });
    console.log(orgData.data)
    orgData.data.forEach((org) => {
        ymaps.geocode(`Нижний Новгород, ${org.address}`).then(function (res) {
            var coord = res.geoObjects.get(0).geometry.getCoordinates();
            var myPlacemark = new ymaps.Placemark(coord, {
                balloonContentHeader: org.organization_name,
                balloonContentBody: null,
                balloonContentFooter: `Время работы: ${org.work_time}`,
                hintContent: org.organization_name
            }, {
                preset: 'islands#blueDotIcon'
            });
            map.geoObjects.add(myPlacemark); 
        });
    })

}

