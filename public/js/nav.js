const section = document.getElementsByClassName('section');
const icons = document.getElementsByClassName('icons');


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