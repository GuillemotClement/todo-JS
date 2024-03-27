import './style.css'

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');

form.addEventListener('submit', event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
})

const addTodo = (text) =>{
  todo.push({
    text,
    done: false,
  });
  displayTodo();
}

const todo = [
  {
    text: 'ma todo',
    done: false,
    editMode: true
  },
  {
    text: 'ma todo 2',
    done: false,
    editMode: false
  },
];

const displayTodo = () => {
  const todoNode = todo.map((todo, index) => {
    if(todo.editMode){
      return createTodoEditElement(todo, index);
    }else{
      return createTodoElement(todo, index);
    }
  })
  ul.innerHTML = '';
  ul.append(...todoNode);
};

const createTodoEditElement = (todo, index) =>{
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  const buttonSave = document.createElement('button');
  buttonSave.innerHTML = 'Save'
  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Cancel';
  //on ajoute evenement qui appelle la fonction toggle mode
  buttonCancel.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditMode(index);
  })
  buttonSave.addEventListener('click', event => {
    editTodo(index, input);
  })
  li.append(input, buttonCancel, buttonSave);
  return li;
}

const createTodoElement = (todo, index) => {
  const li = document.createElement('li');
  //on viens creer le bouton
  const buttonDelete = document.createElement('button');
  //on ajoute le texte du bouton
  buttonDelete.innerHTML = "Supprimer";
  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = 'Edit';
  buttonEdit.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditMode(index);
  })
  //on ajoute un evenement au clic sur le bouton
  buttonDelete.addEventListener('click', event => {
    //on empeche l'evenement de se propager
    event.stopPropagation();
    //via le systeme de closure, on recupere la ref de l'index
    deleteTodo(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? 'done' : ''}"></span>
    <p>${todo.text}</p>
  `;
  //permet de modifier le toggle
  li.addEventListener('click', event =>{
    toggleTodo(index);
  });
  li.appendChild(buttonEdit);
  li.appendChild(buttonDelete);
  return li;
};

//fonction pour supprimer la todo
//on lui passe l'index de l'élément à supprimer via l'évènement
const deleteTodo = index => {
  //on utilise la méthode splice
  todo.splice(index, 1);
  //on recharge la fonction pour l'affichage
  displayTodo();
}

const toggleTodo = index => {
  todo[index].done = !todo[index].done;
  displayTodo();
}

const toggleEditMode = index => {
  todo[index].editMode = !todo[index].editMode;
  displayTodo();
}

const editTodo = (index, input) => {
  const value = input.value;
  todo[index].text = value;
  todo[index].editMode = false;
  displayTodo();
}

displayTodo();

