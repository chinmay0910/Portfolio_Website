let isSignIn = false;

const checkIfuserIsSignin = async () => {
  try {
    const response = await fetch('/getuser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-token": localStorage.getItem('Auth-token')
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const json = await response.json();
    if (json.email) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error:', error);
    return false; // Return false in case of error
  }
}

// Call the function to check if the user is signed in
checkIfuserIsSignin().then((signedIn) => {
  isSignIn = signedIn;
  if (isSignIn) {
    // Update the DOM with the fetched data
    const skillList = document.querySelector('.AddSkill_Btn');
    const AddSkill_Btn = document.createElement("button");
    AddSkill_Btn.setAttribute('onClick', "openModal('Add Skill')")
    AddSkill_Btn.textContent = 'Add Skill';

    const AddProject_Btn = document.createElement("button");
    AddProject_Btn.setAttribute('onClick', "openModal('Add Project')")
    AddProject_Btn.textContent = 'Add Project';

    skillList.appendChild(AddSkill_Btn);
    skillList.appendChild(AddProject_Btn);
  }
});
  