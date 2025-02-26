function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var content = document.getElementById("content");
  
  if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      content.classList.remove("shift");
  } else {
      sidebar.classList.add("open");
      content.classList.add("shift");
  }
}
