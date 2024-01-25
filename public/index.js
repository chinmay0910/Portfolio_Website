
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
fetch('http://localhost:3300/viewSkills')
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

const isSignIn = false;
if (isSignIn) {
  // Update the DOM with the fetched data
  const skillList = document.querySelector('.AddSkill_Btn');
  const AddSkill_Btn = document.createElement("button");
  AddSkill_Btn.setAttribute('id', 'openModalBtn')
  AddSkill_Btn.textContent = 'Add Skill';
  skillList.appendChild(AddSkill_Btn);
}

// Model Code to show and hide
const modal = document.getElementById('myModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');
const skillNameInput = document.getElementById('skillName');
const imageInput = document.getElementById('image');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');

openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  previewContainer.style.display = 'none'; // Hide the preview container when the modal opens
});

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

// Submit button click handler
submitBtn.addEventListener('click', () => {
  // Perform actions with skillNameInput.value and imageInput.files[0]
  // For now, let's just log the values
  console.log('Skill Name:', skillNameInput.value);
  console.log('Image File:', imageInput.files[0]);

  // You can add your logic to send the data to the server here

  // Close the modal
  modal.style.display = 'none';
});

// handle modal submit request 
const form = document.getElementById('addSkillForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const skillName = document.getElementById('skillName').value;
    const imageInput = document.getElementById('image');

    const formData = new FormData();
    formData.append('SkillName', skillName);
    formData.append('image', imageInput.files[0]);

    try {
        const response = await fetch('http://localhost:3300/addskill', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
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

