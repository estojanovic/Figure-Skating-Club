const res = require("express/lib/response");

function init() {
    
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            // moderator: document.getElementById('moderator').checked
            role: document.getElementById('role').value
        };


        //RADIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

        fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)

        })

            .then( res => res.json() )
            .then( el => {
                
                document.cookie = `token=${el.token};SameSite=Lax`;
                if (data.role=="moderator")
                window.location.href = 'indexmoderator.html';
            });

        // NE DIRAAAAAJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ





    //     try{

    //     fetch('http://localhost:9000/register', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify(data)

    //     })
    //     // .catch( err => {
    //     //         res.status(500).json(err);
    //     //         console.log("registration unsuccessfull");
            
    
    //     //     }).catch(err => {
    //     //          res.status(600).json(err);
    //     //          console.log("registration unsuccessfull");
    //     //     })
        
    //     .then( res => res.json() )
    //     .then( el => {

    //         // if(error){
    //         //             document.cookie = `token=${el.token};SameSite=Lax`;
    //         //             window.location.href = 'register.html';
    //         // } else {

    //             document.cookie = `token=${el.token};SameSite=Lax`;
    //             window.location.href = 'index.html';
    //         // }
    //     });
    // }catch(err){
    //     window.location.href = 'register.html';
    // }

        
        // // fetch('http://localhost:9000/register', {
        // //     method: 'POST',
        // //     headers: { 'Content-Type': 'application/json'},
        // //     body: JSON.stringify(data)
            
        // // }).catch( err => {
        // //     res.status(500).json(err);
        // //     console.log("registration unsuccessfull");
        

        // // }).catch(err => {
        // //      res.status(600).json(err);
        // //      console.log("registration unsuccessfull");
        // // })

        // //     if(err){
        // //         document.cookie = `token=${el.token};SameSite=Lax`;
        //         window.location.href = 'register.html';
        //     }else{
        //     then( res => res.json() )
        //     .then( el => {
                
        //         document.cookie = `token=${el.token};SameSite=Lax`;
        //         window.location.href = 'index.html';
        //     });
        // }
    });
}