const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
//setup ui
const setupUI = (user)=>{
    if(user){
        db.collection('users').doc(user.uid).get().then(doc =>{

            const html=`
            <div>Logged In as ${user.email}</div>
            <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML = html;
        })
        //toggle ui elements
        loggedInLinks.forEach(item=>{
            item.style.display = 'block'
        });
        loggedOutLinks.forEach(item=>{
            item.style.display = 'none'
        });
    }else{
        accountDetails.innerHTML = '';
          //toggle ui elements
          loggedInLinks.forEach(item=>{
            item.style.display = 'none'
        });
        loggedOutLinks.forEach(item=>{
            item.style.display = 'block'
        });
    }
}
//setup guides
const setupGuides =(data)=>{
    if(data.length){

        let html ='';
        data.forEach(doc=>{
            const guide = doc.data();
            // console.log(guide);
            const li  = `
            <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
            </li>
            `;
            html+=li;
            guideList.innerHTML= html;
        });
    }else{
        guideList.innerHTML='<h4>Please login first to see the site contents ( ^ _ ^ )  </h4>';
        
        }

}




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });


