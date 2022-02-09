function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    // if(data.name == "admin@gmail.com" && data.password == "admin"){
                    //     window.location.href = 'index.html';
                    // } else window.location.href = 'indexmoderator.html';
                    
                }
            });
    });
}