const dataJson = './data/data.json';
const switcher = document.querySelector('.switch');
const layout = document.querySelector('.layout-container');
const loadMoreBtnEl = document.getElementById('loadMore');
console.log(switcher);
let counter = 4;

function load(arr) {
  const content = arr.slice(0, 4);
  renderEl(layout, content);

  switcher.addEventListener('change', () => {
    toggleSwitch();
    if (switcher.value === true) {
      loadMoreBtnEl.style.backgroundColor = 'rgba(159,20,194,1)';
      loadMoreBtnEl.style.color = '#fff';
      document.body.style.backgroundColor = 'black';
      const containerSh = document
        .querySelectorAll('.container')
        .forEach((el) => (el.style.boxShadow = '0 0 5px rgba(159,20,194,1)'));
      const profileSh = document
        .querySelectorAll('.profile--img')
        .forEach(
          (el) =>
            (el.style.boxShadow = ' 0px -10px 30px -5px rgba(159,20,194,0.65)')
        );
    }

    if (!switcher.value) {
      document.body.style.backgroundColor = '#f9fafd';
      document
        .querySelectorAll('container')
        .forEach((el) => (el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'));
      loadMoreBtnEl.style.backgroundColor = '#ffbe0b';
      loadMoreBtnEl.style.color = '#fff';
      const containerSh = document
        .querySelectorAll('.container')
        .forEach((el) => (el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'));
      const profileSh = document
        .querySelectorAll('.profile--img')
        .forEach(
          (el) => (el.style.boxShadow = '3px -4px 26px 6px rgba(0, 0, 0, 0.18)')
        );
    }
  });
}

function loadMore(arr) {
  load(arr.slice(counter, counter + 4));

  if (!(counter + 4 > arr.length)) {
    counter += 4;
  }

  if (counter === arr.length) {
    loadMoreBtnEl.style.display = 'none';
  }
}

function renderEl(el, arr) {
  for (let item of arr) {
    el.innerHTML += ` 
    
    <div class="container dark--container">
      <div class="profile--img dark--profile" style="background-image: url(${item.profile_image})"></div>
      <div class="main--img dark--main" style="background-image: url(${item.image})"></div>
      <div class="text--info dark--text">
      <div class="title dark--title">
        <h2>${item.name}</h2>
        <p >${item.source_type}</p>
      </div>

      <p class="desc dark--desc">
        ${item.caption}
      </p>
      <hr class="hr dark--hr"/>
      <div class="date dark--date">
        <p>${item.date}</p>
        <p>${item.likes}</p>
      </div>
    </div>
`;
  }
}

function toggleSwitch() {
  switcher.value = !switcher.value;
}

async function getData() {
  const response = await fetch(dataJson);
  const data = await response.json();

  load(data);

  loadMoreBtnEl.addEventListener('click', () => {
    loadMore(data);
  });
}
getData();
