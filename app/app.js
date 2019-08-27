//local storage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

// https://developer.mozilla.org/en-US/docs/Web/API/storage#Methods

var KEY = "my.funko.collection.list";

var load = function() {
  var str = window.localStorage.getItem(KEY);
  return str != null ? JSON.parse(str) : {};
}
var save = function(data) {
  var str = data != null ? JSON.stringify(data) : "{}";
  window.localStorage.setItem(KEY, str);
}
var clear = function() {
  window.localStorage.removeItem(KEY);
}

var gather = function() {
  return {
    key: $('#key').val().trim(),
    date: $('#date').val().trim(),
    category: $('#category').val().trim(),
    group: $('#group').val().trim(),
    purchased: $('#purchased').val().trim(),
    value: $('#value').val().trim()
  };
}

var checkInput = function(t) {
  if (t.key.length == 0) {
    alert("Name is empty!");
    return;
  }
  if (t.date.length == 0) {
    alert("Date is empty!");
    return;
  }
  if (t.category.length == 0) {
    alert("Category is empty!");
    return;
  }
  if (t.group.length == 0) {
    alert("Group is empty!");
    return;
  }
  if (t.purchased.length == 0) {
    alert("Purchased is empty!");
    return;
  }
  if (t.value.length == 0) {
    alert("Value is empty!");
    return;
  }
  return t;
}

var onCreate = function() {
  var t = gather();
  if (checkInput(t) == null) return;

  var data = load();
  if (data[t.key] != null) {
    alert(`Item already exists: ${t.key}`);
    return;
  }

  data[t.key] = t;
  save(data);
  displayData();
}

var onUpdate = function() {
  var t = gather();
  if (checkInput(t) == null) return;

  var data = load();
  if (data[t.key] == null) {
    alert(`Item does not exist: ${t.key}`);
    return;
  }

  data[t.key] = t;
  save(data);
  displayData();
}

var onRemove = function(key) {
  var t = gather();
  if (t.key.length == 0) {
    alert("Name is empty!");
    return;
  }

  var data = load();
  if (data[t.key] == null) {
    alert(`Item does not exist: ${t.key}`);
    return;
  }

  delete data[t.key];
  save(data);
  displayData();
}

var onClear = function() {
  var data = load();
  if (Object.keys(data).length == 0) {
    alert('Nothing to clear');
    return;
  }

  clear();
  displayData();
}

var displayData = function() {
  $('tbody').html('');

  var data = load();
  var values = Object.values(data);
  for (var i = 0; i < values.length; i++) {
    var t = values[i];
    $('tbody').append(
      `<tr>
        <td>${i + 1}</td>
        <td>${t.key}</td>
        <td>${t.date}</td>
        <td>${t.category}</td>
        <td>${t.group}</td>
        <td>${t.purchased}</td>
        <td>${t.value}</td>
      </tr>`
    )
  }
}

$(document).ready(function() {

  displayData();

  $('.create').click(onCreate);
  $('.update').click(onUpdate);
  $('.delete').click(onRemove);
  $('.clear').click(onClear);
  $('#clearform').on('click', function () {
    $('#submit').trigger("reset");
});

});
