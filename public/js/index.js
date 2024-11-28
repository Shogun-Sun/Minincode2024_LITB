    const home = document.getElementById('section_1');
    const log_in = document.getElementById('section_2');

    home.addEventListener('click', () => {
        window.location.href = '/';
    });

    log_in.addEventListener('click', () => {
        window.location.href = "/user/reg/page";
    });
