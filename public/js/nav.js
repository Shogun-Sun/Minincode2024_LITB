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

const fl_in = document.getElementById('floatingInput_1');
fl_in.addEventListener('focus', ()=>{
  document.getElementById('label_float_1').style.color = 'var(--line-color)';
});
fl_in.addEventListener('blur', ()=>{
  if(fl_in.value ===""){
    document.getElementById('label_float_1').style.color = 'var(--text-color)';
  }
});

const fl_in_2 = document.getElementById('float_input_2');
fl_in_2.addEventListener('focus', ()=>{
  document.getElementById('label_float_2').style.color = 'var(--line-color)';
});
fl_in_2.addEventListener('blur', ()=>{
  if(fl_in_2.value ===""){
    document.getElementById('label_float_2').style.color = 'var(--text-color)';
  }
});