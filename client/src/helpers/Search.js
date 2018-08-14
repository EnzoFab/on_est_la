/* eslint-disable */

export class SearchService {
  search() {
    let input, filter, list, p, value
    input = document.getElementById("friends-search");
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
