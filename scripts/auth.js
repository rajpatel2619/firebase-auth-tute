//get data
// db.collection('guides').get().then(snapshot=>{
//     setupGuides(snapshot.docs);
// });


//listen auth state 
auth.onAuthStateChanged(user=>{
    // console.log(user);
    if(user){
        // db.collection('guides').get().then(snapshot=>{
        //     setupGuides(snapshot.docs);
        //     setupUI(user);
        // });
        db.collection('guides').onSnapshot(snapshot=>{
            setupGuides(snapshot.docs);
            setupUI(user);
        },err =>{
            console.log(err.message);
        });
    }else{
        setupGuides([]);
        setupUI();
    }

});



//create new guide
const  createForm = document.querySelector('#create-form');
// create
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    db.collection('guides').add({
        title:createForm['title'].value,
        content:createForm['content'].value
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
        console.log('new guide created');
    }).catch(err =>{
        console.log(err.message);
    })
    
});



//sign up 
const  signupForm = document.querySelector('#signup-form');
// sgn up
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    //get user info
    const email  = signupForm['signup-email'].value; 
    const password  = signupForm['signup-password'].value;
    
    //sign up user
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['signup-bio'].value
        });
        
    }).then(()=>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        console.log('new user created and logged in');
    });
    
});

//logout
const  logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
e.preventDefault();
auth.signOut().then(()=>{
    console.log('user logout');
});
});


//sign in 
const  loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    //get user info
    const email  = loginForm['login-email'].value; 
    const password  = loginForm['login-password'].value;
    
    //sign in user
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        console.log(cred.user);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        console.log('user  logged in');
        
    });
    
});
