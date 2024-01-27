const isSignIn = false;
if (isSignIn) {
  // Update the DOM with the fetched data
  const skillList = document.querySelector('.AddSkill_Btn');
  const AddSkill_Btn = document.createElement("button");
  // AddSkill_Btn.setAttribute('class', 'openModalBtn')
  AddSkill_Btn.setAttribute('onClick', "openModal('Add Skill')")
  AddSkill_Btn.textContent = 'Add Skill';

  const AddProject_Btn = document.createElement("button");
  AddProject_Btn.setAttribute('onClick', "openModal('Add Project')")
  // AddProject_Btn.setAttribute('class', 'openModalBtn')
  AddProject_Btn.textContent = 'Add Project';


  skillList.appendChild(AddSkill_Btn);
  skillList.appendChild(AddProject_Btn);
}