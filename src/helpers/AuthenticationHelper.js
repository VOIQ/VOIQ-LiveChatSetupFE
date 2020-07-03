module.exports.logout = (history) => {
  localStorage.removeItem("voiqToken");
  history.push("/login");
}
