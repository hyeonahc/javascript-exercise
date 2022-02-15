let body = document.querySelector('body');

let members = [
  'Olivia',
  'Liam',
  'Emma',
  'Noah',
  'Amelia',
  'Oliver',
  'Ava',
  'Elijah',
  'Sophia',
  'Lucas',
  'Charlotte',
  'Levi',
  'Isabella',
  'Mason',
  'Mia',
  'Asher',
  'Luna',
  'James',
  'Harper',
  'Ethan',
];

function showNotAssigned() {
  let notAssignedMembers = '';
  for (let i = 0; i < members.length; i++) {
    if (i !== 0) {
      notAssignedMembers = notAssignedMembers + ' ' + members[i];
    } else {
      notAssignedMembers = notAssignedMembers + members[i];
    }
  }
  document.querySelector('#not_assigned').innerHTML = notAssignedMembers;
}
showNotAssigned();

function assignMemberToTeam(teamNumber) {
  if (members.length === 0) return;
  let member = members.splice(0, 1);
  showNotAssigned();
  document.querySelector(
    `#team_${teamNumber}`
  ).innerHTML += `<li>${member}</li>`;
}
