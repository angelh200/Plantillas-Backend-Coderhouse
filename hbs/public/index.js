const socket = io();

fetch('tabla.hbs').then(res => {
  return res.text();
}).then(data => {
  let template = Handlebars.compile(data);
  document.getElementById('table').innerHTML = template({items: [{title: 'ss', price: '10.00'}]});
});