
// var typed = new Typed('#element', {
//     strings: [`I'm into Development...`, 'I Build Websites','I Solve Problems'],
//     typeSpeed: 60,
//     loop: true,
//   });

function toggleNavbar() {
  var navLinks = document.querySelector('.alignRight');
  navLinks.style.display = (navLinks.style.display === 'none' || navLinks.style.display === '') ? 'flex' : 'none';
}


// Trying to fetch all the Skills and show it in skills Section
fetch('/viewSkills')
  .then(response => response.json())
  .then(data => {
    // Update the DOM with the fetched data
    const skillList = document.getElementById('AllSkills');
    data.forEach(item => {
      // <div class="skill_box"><img src="Images/gitHub.png" alt=""><p>GitHub</p></div>
      const listItem = document.createElement('div');
      listItem.setAttribute('class', 'skill_box');

      const itemImg = document.createElement('img');
      itemImg.setAttribute('src', `${item.ImgLink}`)
      itemImg.setAttribute('alt', `${item.SkillName}`)

      const itemPara = document.createElement('p');
      itemPara.textContent = `${item.SkillName}`;

      listItem.appendChild(itemImg);
      listItem.appendChild(itemPara);

      skillList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching data:', error.message));

fetch('/Viewprojects')
  .then(response => response.json())
  .then(data => {
    // Update the DOM with the fetched data
    const ProjectList = document.querySelector('.projects_row');
    data.forEach((item, index) => {
      // Create project box container
      const projectBox = document.createElement('div');
      projectBox.classList.add('project_box', 'card');

      // Create project image
      const projectImg = document.createElement('img');
      projectImg.src = item.ImgLink;
      projectImg.classList.add('projectImg');
      projectImg.alt = item.projectTitle;

      // Create project intro container
      const projectIntro = document.createElement('div');
      projectIntro.classList.add('intro', 'skills_row');

      // Create project tag
      const projectTag = document.createElement('div');
      projectTag.classList.add('tag');

      const projectName = document.createElement('h1');
      projectName.textContent = item.projectTitle;

      projectTag.appendChild(projectName);

      // Create project description container
      const projectDesc = document.createElement('div');
      projectDesc.classList.add('desc');

      const projectDescText = document.createElement('p');
      projectDescText.textContent = item.projectDescription;

      // Create buttons container
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('flexRow', 'buttons');

      // Create View button
      const viewBtn = document.createElement('button');
      viewBtn.classList.add('btn');
      viewBtn.setAttribute('type', 'buttton')
      viewBtn.setAttribute('onClick', `window.open('${item.projectLink}')`)
      viewBtn.textContent = 'View';
      
      // Create Code button
      const codeBtn = document.createElement('button');
      codeBtn.classList.add('btn');
      codeBtn.setAttribute('type', 'buttton')
      codeBtn.setAttribute('onClick', `window.open('${item.projectCodeLink}')`)
      codeBtn.textContent = 'Code';

      // Append elements to their respective containers
      buttonsContainer.appendChild(viewBtn);
      buttonsContainer.appendChild(codeBtn);

      projectDesc.appendChild(projectDescText);
      projectDesc.appendChild(buttonsContainer);

      projectIntro.appendChild(projectTag);
      projectIntro.appendChild(projectDesc);

      projectBox.appendChild(projectImg);
      projectBox.appendChild(projectIntro);

      // Append the project box to the document body or another container
      if (index < 3) {
        ProjectList.appendChild(projectBox);
      }

    });
  })
  .catch(error => console.error('Error fetching data:', error.message));



// Model Code to show and hide
const modal = document.getElementById('myModal');
// const openBtn = document.querySelector('.openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');
const skillNameInput = document.getElementById('skillName');
const imageInput = document.getElementById('image');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');

// openBtn.addEventListener('click', () => {
//   modal.style.display = 'block';
// });

let SELECTED_MODAL;

// Open Modal Code starts
function openModal(title) {
  const modal = document.getElementById('myModal');
  const modalTitle = document.getElementById('modalTitle');
  const skillFields = document.getElementById('skillFields');
  const projectFields = document.getElementById('projectFields');

  // Set the modal title
  modalTitle.innerText = title;

  // Show/hide fields based on the button clicked
  if (title === 'Add Skill') {
    skillFields.style.display = 'block';
    SELECTED_MODAL = "Skill";
    projectFields.style.display = 'none';
  } else if (title === 'Add Project') {
    skillFields.style.display = 'none';
    SELECTED_MODAL = "PROJECT";
    projectFields.style.display = 'block';
  }


  // Display the modal
  modal.style.display = 'block';
}
// Open Modal Code ends


closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Update image preview on file input change
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      previewContainer.style.display = 'block'; // Show the preview container
    };

    reader.readAsDataURL(file);
  } else {
    // Hide the preview container if no file is selected
    previewContainer.style.display = 'none';
  }
});

// handle modal submit request 
const form = document.getElementById('addSkillForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData();
  let skillName, projectTitle, projectDescription, projectLink, projectCodeLink;
  if (SELECTED_MODAL == 'Skill') {
    skillName = document.getElementById('skillName').value;
    formData.append('SkillName', skillName);
  }
  if (SELECTED_MODAL == 'PROJECT') {
    projectTitle = document.getElementById('title').value;
    projectDescription = document.getElementById('description').value;
    projectLink = document.getElementById('link').value;
    projectCodeLink = document.getElementById('code').value;

    formData.append('projectTitle', projectTitle)
    formData.append('projectDescription', projectDescription)
    formData.append('projectLink', projectLink)
    formData.append('projectCodeLink', projectCodeLink)
  }
  const imageInput = document.getElementById('image');

  formData.append('image', imageInput.files[0]);

  try {
    const response = await fetch(`http://localhost:3300/${SELECTED_MODAL == 'Skill' ? "addskill" : "addproject"}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      closeBtn.click()
      // Optionally, update the UI or perform other actions
    } else {
      const errorData = await response.json();
      console.error(errorData.msg);
      // Handle error, display a message, or perform other actions
    }
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Handle error, display a message, or perform other actions
  }
});


// Modal Code ends here

