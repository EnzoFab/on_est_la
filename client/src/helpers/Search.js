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
  },

  searchPlace () {
    let input, filter, list, tr, change
    input = document.getElementById("place-search");
    if (input) {
      filter = input.value.toUpperCase();
      list = document.getElementById("place-table");
      tr = list.getElementsByTagName("tr");
      change = 0
      for (let row of tr) {
        let td = row.children
        if (td[1].innerHTML.toUpperCase().indexOf(filter) > -1) {
          row.style.display = "";
        } else {
          row.style.display = "none";
          change += 1
        }
      }
      console.log(change === tr.length)
      return change === tr.length
    } else {
      console.log('rien')
      return tr.length === 0
    }
  }
}
