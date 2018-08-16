/* eslint-disable */

export default {
  search () {
    let input, filter, list, p
    input = document.getElementById("friends-search");
    if(input) {
      filter = input.value.toUpperCase();
      list = document.getElementById("friends-list");
      p = list.getElementsByTagName("p");
      for (let text of p) {
        let parent = document.getElementById('friendlist-'+text.id.substring(15));
        if (text.innerHTML.toUpperCase().indexOf(filter) > -1) {
          parent.style.display = "";
        } else {
          parent.style.display = "none";
        }
      }
    }
  }
}
