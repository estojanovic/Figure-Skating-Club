function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    document.getElementById('iceskates').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'iceskates.html';
    });

    document.getElementById('privatelessons').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'privatelessons.html';
    });

    document.getElementById('trainings').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'trainings.html';
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}