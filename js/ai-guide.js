// if student is in the URL hash (after the #) then teacher elements are hidden
// otherwise student elements are hidden
window.addEventListener(
     'DOMContentLoaded',
     function () {
        var style = document.createElement('link');
        style.rel="stylesheet";
        if (window.location.search.indexOf("student") >= 0) {
           style.href = "/ai/css/student.css"; 
        } else {
           style.href = "/ai/css/teacher.css";
        }
        document.head.appendChild(style);
});

// copy over search query and hash from ULR to appropriate links
window.addEventListener(
     'DOMContentLoaded',
     function () {
         var elements = document.getElementsByClassName('guide-link');
         var hash   = window.location.hash;
         var search = window.location.search;
         var add_search_and_hash = function (element) {
             var href = element.getAttribute('href');
             var search_start = href.indexOf("?");
             var hash_start   = href.indexOf("#");
             var new_search = search_start >= 0 &&
                              (hash_start >= 0 ?
                                  href.substring(search_start, hash_start) :
                                  href.substring(search_start));
             var new_hash   = hash_start >= 0 && href.substring(hash_start);
             var url = href;
             if (search_start >= 0) {
                url = href.substring(0, search_start);
             }
             if (hash_start >= 0) {
                url = url.substring(0, hash_start);
             }
             if (new_search) {
                if (search) {
                    new_search += "&" + search.substring(1);
                }
             } else {
                new_search = search;
             }
             if (new_hash) {
                if (hash) {
                    new_hash += "&" + hash.substring(1);
                }
             } else {
                new_hash = hash;
             }
             element.setAttribute('href', url + new_search + new_hash);
         };
         Array.prototype.forEach.call(elements, add_search_and_hash);
});

// hide the next sibling of advanced-topic elements until clicked
window.addEventListener(
     'load', // using load instead of DOMContentLoaded since hidden iframes when made visible are empty
     function () {
         var elements = document.getElementsByClassName('advanced-topic');
         var hide_next_sibling_until_click = function (element) {
             if (window.location.search.indexOf("student") < 0)  {
                 // for teacher's always show the advanced material
                 return;
             }
             element.nextElementSibling.style.display = 'none';
             element.addEventListener('click',
                                      function () {
                                          if (element.nextElementSibling.style.display === 'none') {
                                              element.nextElementSibling.style.display = 'block';    
                                          } else {
                                              element.nextElementSibling.style.display = 'none';
                                          }                                             
                                      }); 
         };
         Array.prototype.forEach.call(elements, hide_next_sibling_until_click);
     });

// stop translation of block name elements
window.addEventListener(
     'DOMContentLoaded', 
     function () {
         var elements = document.getElementsByClassName('block-name');
         var notranslate = function (element) {
             element.classList.add("notranslate");
             element.setAttribute("translate", "no");
         };
         Array.prototype.forEach.call(elements, notranslate);
     });

// create Snap! iframes for embedded projects
window.addEventListener(
     'DOMContentLoaded', 
     function () {
         let elements = document.getElementsByClassName('snap-iframe');
         let snap_iframe = function(element) {
             let name = element.id;
             let style = element.getAttribute('iframe_style');
             let caption = element.getAttribute('caption');
             let full_screen = element.getAttribute('full_screen');
             let figure     = document.getElementById(name);
             let iframe     = document.createElement('iframe');
             let figcaption = document.createElement('figcaption');
             let img        = document.createElement('img');
             img.src = "/ai/AI-teacher-guide-projects/" + name + ".png";
             let replace_with_iframe = function (event) {
                 // add a loading div for a few seconds...
                 let loading = document.createElement('div');
                 let project_folder;
                 loading.innerHTML = "<b>Loading. Please wait.</b>";
                 figure.insertBefore(loading, figcaption);
                 setTimeout(function () {
                                loading.remove();
                            },
                            3000);
                 img.remove();
                 iframe.src = "/ai/snap/snap.html";
                 iframe.setAttribute('scrolling', 'no');
                 if (full_screen) {
                     project_folder = "/ai/projects/";
                     iframe.setAttribute('full_screen', 'true');
                     iframe.style = style;
                     figure.insertBefore(iframe, figcaption);
                 } else {
                     project_folder = "/ai/AI-teacher-guide-projects/";
                     iframe.className = "iframe-clipped";
                     let div = document.createElement('div');
                     div.className = "iframe-container";
                     div.style = style;
                     div.appendChild(iframe);
                     figure.insertBefore(div, figcaption);
                 }
                 iframe.setAttribute('project_path', project_folder + name + ".xml"); 
             };
             img.addEventListener('click', replace_with_iframe);
             img.addEventListener('touchstart', replace_with_iframe);
             figcaption.innerHTML = caption;
             figure.appendChild(img);
             figure.appendChild(figcaption);
         }
         Array.prototype.forEach.call(elements, snap_iframe);
     });


 

