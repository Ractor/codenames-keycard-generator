const default_seeds = ['slunce', 'majak', 'brambora', 'kolotoc', 'kocka'];
let seed = default_seeds[Math.floor(Math.random() * default_seeds.length)];

function generate_board(seed) {
  let random = new alea(seed);
  let random_pos = function() {
    return Math.floor(5*random());
  }

  let row; // Row number for randomizer (0-4)
  let col; // Column number for randomizer (0-4)
  let element; // Cell element
  let starts = Math.round(random()) ? 'red' : 'blue'; // Which team starts
  let red_count = 0; // Number of blue fields placed
  let blue_count = 0; // Number of blue fields placed


	//
  element = document.getElementById('seed');
  element.classList.add(starts);
  
  // Black agent
  row = random_pos();
  col = random_pos();
  element = document.getElementById('cell-' + row + '-' + col);
  element.classList.add('black');

  while (red_count < 8 + (starts==='red')) {
    row = random_pos();
    col = random_pos();
    element = document.getElementById('cell-' + row + '-' + col);
    if (element.classList.contains('black') || element.classList.contains('red')) {
      continue;
    }

    element.classList.add('red');
    red_count++;
  }

  while (blue_count < 8 + (starts==='blue')) {
    row = random_pos();
    col = random_pos();
    element = document.getElementById('cell-' + row + '-' + col);
    if (element.classList.contains('black') || element.classList.contains('red') || element.classList.contains('blue')) {
      continue;
    }

    element.classList.add('blue');
    blue_count++;
  }	
}

function clear_board() {
	let elements = document.querySelectorAll('#board div');
  elements.forEach(function(e) {
  	e.classList.remove('black');
    e.classList.remove('red');
    e.classList.remove('blue');
  });
  
  let element = document.getElementById('seed');
  element.classList.remove('red');
  element.classList.remove('blue');
}

document.getElementById('seed').addEventListener('keyup', function() {
	let element = document.getElementById('seed');
  element.value = element.value.toLowerCase();
  element.value = element.value.replace(/[^0-9a-z]/g, "");
  
  if (seed != element.value) {
  	seed = element.value;
    clear_board();
    if (seed != '') {
    	generate_board(seed);
    }
  }
});

document.getElementById('seed').value = seed;
generate_board(seed);