const section = document.getElementsByClassName('section');
const icons = document.getElementsByClassName('icons');
const home = document.getElementById('section_1');
const sing_in = document.getElementById('section_2');
const profile = document.getElementById('section_5');
const sing_up = document.getElementById('section_6');


for (let i = 0; i < section.length; i++) {
  section[i].addEventListener('mouseover', () => {
      icons[i].style.setProperty('--color-icon', 'var(--accent-color)');
      icons[i].style.setProperty('transition', 'all 0.5s ease');
    }
  );
  section[i].addEventListener('mouseout', () => {
    icons[i].style.setProperty('--color-icon', 'var(--text-color)');
    icons[i].style.setProperty('transition', 'all 0.5s ease');
});
}

home.addEventListener('click', () => {
    window.location.href = '/';
});

sing_in.addEventListener('click', () => {
    window.location.href = "/user/log/page";
});

profile.addEventListener('click', ()=>{
    window.location.href = '/user/profile';
})

sing_up.addEventListener('click', () => {
  window.location.href = '/user/reg/page';
})
