document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // Load the navbar
    fetch('/src/common/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').outerHTML = data;
            initializeNavbar();
        });

    function initializeNavbar() {
        document.getElementById('btnSideBar').addEventListener('click', () => {
            console.log('Sidebar button clicked');
            // Your sidebar toggle code here
            navbar = document.getElementById('navbar');
            btnSideBar = document.getElementById('btnSideBar');
            navList = document.getElementById('navList');

            navbar.classList.add('sideNav');
            navList.style.display = 'flex';
            btnSideBar.style.display = 'none';
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.sideNav') && document.querySelector('.sideNav')) {
                document.querySelectorAll('.sideNav').forEach((element) => {
                    element.classList.remove('sideNav');
                    element.classList.add('simpleNav');
                });
                navList.style.display = 'none';
                btnSideBar.style.display = 'flex';
            }
        });

        if (document.cookie) {
            const connectBtn = document.getElementById('connectBtn');
            if (!connectBtn.classList.contains('inactive-btn')) {
            connectBtn.classList.add('inactive-btn');
            disconnectBtn.classList.remove('inactive-btn');
            }
        } else {
            const disconnectBtn = document.getElementById('disconnectBtn');
            if (!disconnectBtn.classList.contains('inactive-btn')) {
            disconnectBtn.classList.add('inactive-btn');
            connectBtn.classList.remove('inactive-btn');
            }
        }

        document.getElementById('connectBtn').addEventListener('click', () => {
            if (window.location.pathname !== 'src/connexion_page.html') {
                window.location.href = 'src/connexion_page.html';
            }
        });

        document.getElementById('disconnectBtn').addEventListener('click', () => {
            document.cookie = document.cookie.split(';').map(cookie => cookie.split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/').join(';');
            if (window.location.pathname !== '/index.html') {
                window.location.href = '/index.html';
            }
            else {
                location.reload(); 
            }
        });
    }

    // Load the footer
    fetch('/src/common/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').outerHTML = data;
            initializeFooter();
        });

        function initializeFooter() {
            const homeBtns = document.getElementsByClassName('homeBtn');
            for (let btn of homeBtns) {
                btn.addEventListener('click', () => {
                    if (window.location.pathname !== '/index.html') {
                        window.location.href = '/index.html';
                    }
                });
            }
        
            const aboutBtns = document.getElementsByClassName('aboutUsBtn');
            for (let btn of aboutBtns) {
                btn.addEventListener('click', () => {
                    if (window.location.pathname !== '/about.html') {
                        window.location.href = '/about.html';
                    }
                });
            }
        
            const contactBtns = document.getElementsByClassName('contactBtn');
            for (let btn of contactBtns) {
                btn.addEventListener('click', () => {
                    if (window.location.pathname !== '/contact.html') {
                        window.location.href = '/contact.html';
                    }
                });
            }
        }
});