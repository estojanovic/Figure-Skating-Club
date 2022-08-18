function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:7000/admin/privatelessons', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('plLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Day: ${el.day}, Time: ${el.time}, Coach: ${el.coach}</li>`;
            });
        });


    document.getElementById('post').addEventListener('click', e => {
            e.preventDefault();
    
        const data = {
            day: document.getElementById('day').value,
            time: document.getElementById('time').value,
            coach: document.getElementById('coach').value,
            UserID: 0
        };
       
        console.log("ovde radim nesto");
        console.log(data.user);
        console.log(data.day);
            
        fetch('http://localhost:7000/admin/privatelessons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
                
        })
                
            .then( res => res.json() )
            .then( el => {
                    
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'privatelessons.html';
            });
    }); 

    document.getElementById('delete').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        day: document.getElementById('day').value,
        time: document.getElementById('time').value,
        coach: document.getElementById('coach').value,
        UserID: 0
    };
        
    fetch('http://localhost:7000/admin/privatelessons/'+id.value, {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json'}       
    })
            
        .then( res => res.json() )
        .then( el => {
                
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'privatelessons.html';
        });
    }); 


    document.getElementById('put').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        day: document.getElementById('day').value,
        time: document.getElementById('time').value,
        coach: document.getElementById('coach').value,
        UserID: 0
    };
        
    fetch('http://localhost:7000/admin/privatelessons/'+id.value, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json'},  
        body: JSON.stringify(data)     
    })
            
        .then( res => res.json() )
        .then( el => {
                
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'privatelessons.html';
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