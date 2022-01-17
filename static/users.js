function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Lastname: ${el.lastname}, E-mail: ${el.email}</li>`;
            });
        });


    document.getElementById('post').addEventListener('click', e => {
            e.preventDefault();
    
        const data = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            // moderator: document.getElementById('moderator').checked
            role: document.getElementById('role').value
        };
            
        fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
                
        })
                
            .then( res => res.json() )
            .then( el => {
                    
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'users.html';
            });
    }); 

    document.getElementById('delete').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        // moderator: document.getElementById('moderator').checked
        role: document.getElementById('role').value
    };
        
    fetch('http://localhost:8000/admin/users/'+id.value, {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json'}       
    })
            
        .then( res => res.json() )
        .then( el => {
                
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'users.html';
        });
    }); 


    document.getElementById('put').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        // moderator: document.getElementById('moderator').checked
        role: document.getElementById('role').value
    };
        
    fetch('http://localhost:8000/admin/users/'+id.value, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json'},  
        body: JSON.stringify(data)     
    })
            
        .then( res => res.json() )
        .then( el => {
                
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'users.html';
        });
    }); 


    // document.getElementById('get').addEventListener('click', e => {
    //     e.preventDefault();

    // const data = {
    //     id: document.getElementById('id').value
    // };
        
    // fetch('http://localhost:8000/admin/users/'+id.value, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json'}
            
    // })
            
    //     .then( res => res.json() )
    //     .then( el => {
                
    //         document.cookie = `token=${el.token};SameSite=Lax`;
    //         window.location.href = 'users.html';
    //     });
    // }); 
        
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}