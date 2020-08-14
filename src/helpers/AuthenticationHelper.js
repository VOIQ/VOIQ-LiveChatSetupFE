module.exports.logout = (history) => {
  history.push("/login");
}

module.exports.highestHierarchyRole = (roles) => {
  // This is inverse the highest hierarchy is the number 1:super_admin
  let highestHierarchy = Number.MAX_VALUE;
  let highestRole = null;
  roles.forEach(function(role, index) {
    if (role.hierarchy < highestHierarchy) {
      highestHierarchy = role.hierarchy;
      highestRole = role;
    }
  })

  return highestRole.name;
}
