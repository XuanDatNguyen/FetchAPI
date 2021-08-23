
var courseAPI  = 'http://localhost:3000/course';

function start () {
    getCourses(renderCourses);
    handleCreateForm();
}

start();

function getCourses(callback) {
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function createCourses(data, callback) {
    fetch(courseAPI, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)      
    })
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function handleDeleteCourses(id) {
    fetch(courseAPI + '/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
          },
    })
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var deleteItem = document.querySelector('.course-item-' + id);
            deleteItem.remove();
        })
}

function updateCourses(id, data, callback) {
    fetch(courseAPI + '/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    })
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function renderCourses(courses) {
    var listCourseBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h1>${course.name}</h1>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourses(${course.id})">Xóa</button>
                <button onclick="handleUpdateCourses(${course.id})">Sửa</button>
            </li>
        `;
    })
    listCourseBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name = "name"]').value;
        var description = document.querySelector('input[name = "description"]').value;

        var formData = {
            name: name,
            description: description
        }
        createCourses(formData, function() {
            getCourses(renderCourses);
        });
    }    
}

function handleUpdateCourses(id) {
    var courseItem = document.querySelector(".course-item-" + id);
    var getName = courseItem.querySelector("h1").innerText;
    var getDescription = courseItem.querySelector("p").innerText;



    var newName = document.querySelector('input[name="name"]');
    var newDescription = document.querySelector('input[name="description"]');

    newDescription.value = getDescription;
    newName.value = getName;
    console.log(newName, newDescription)
    

    if(!document.querySelector("#update")) {
        document.querySelector("#create").id = "update";
    }
    document.querySelector("#update").innerText = "Lưu"

    var updateBtn = document.querySelector("#update");

    updateBtn.onclick = function() {
        var formData = {
            name: newName.value,
            description: newDescription.value
        }


        updateCourses(id, formData, function() {
            getCourses(renderCourses);
        });
    }
}


