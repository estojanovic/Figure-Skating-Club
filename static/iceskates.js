function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:7000/admin/iceskates', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('iceLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Model: ${el.model}, Size: ${el.size}</li>`;
            });
        });


    document.getElementById('post').addEventListener('click', e => {
            e.preventDefault();
    
        const data = {
            model: document.getElementById('model').value,
            size: document.getElementById('size').value
        };
            
        fetch('http://localhost:7000/admin/iceskates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
                
        })
                
            .then( res => res.json() )
            .then( el => {
                    
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'iceskates.html';
            });
    }); 

    document.getElementById('delete').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        model: document.getElementById('model').value,
        size: document.getElementById('size').value
    };
        
    fetch('http://localhost:7000/admin/iceskates/'+id.value, {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json'}       
    })
            
        .then( res => res.json() )
        .then( el => {
                
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'iceskates.html';
        });
    }); 


    document.getElementById('put').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        model: document.getElementById('model').value,
        size: document.getElementById('size').value
    };
        
    fetch('http://localhost:7000/admin/iceskates/'+id.value, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json'},  
        body: JSON.stringify(data)     
    })
            
        .then( res => res.json() )
        .then( el => {
                
            // document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'iceskates.html';
        });
    }); 


    // document.getElementById('get').addEventListener('click', e => {
    //     e.preventDefault();

    // const data = {
    //     id: document.getElementById('id').value
    // };
        
    // fetch('http://localhost:8000/admin/iceskates/'+id.value, {
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