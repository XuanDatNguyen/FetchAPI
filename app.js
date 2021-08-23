
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

function renderCourses(courses) {
    var listCourseBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
            <li>
                <h1>${course.name}</h1>
                <p>${course.description}</p>
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
        createCourses(formData);
    }    
}

