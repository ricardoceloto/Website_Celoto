// Espera o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const header = document.querySelector('.header');
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    
    // Elementos de abas no portfólio
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Função para tornar o cabeçalho "sticky" durante o scroll
    function stickyHeader() {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    // Adiciona evento de scroll para o cabeçalho
    window.addEventListener('scroll', stickyHeader);
    
    // Toggle do menu mobile
    menuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Fechamento do menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Menu ativo baseado na posição do scroll
    function setActiveNav() {
        let scrollPosition = window.scrollY;
        
        // Verifica cada seção e atualiza a classe ativa no link correspondente
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Verifica a posição do scroll para atualizar o menu ativo
    window.addEventListener('scroll', setActiveNav);
    
    // Abas do Portfólio
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active no botão clicado
            this.classList.add('active');
            
            // Obtém o ID da aba a ser mostrada
            const tabId = this.getAttribute('data-tab');
            
            // Esconde todas as abas
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Mostra a aba correspondente
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Filtro do Portfólio
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            // Obtém a categoria de filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Filtra os itens do portfólio
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Normalmente aqui você enviaria os dados para um servidor
            // Para este exemplo, apenas mostraremos uma mensagem de sucesso
            alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
            
            // Limpa o formulário
            this.reset();
        });
    }
    
    // Animação suave de scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de revelação durante o scroll (elementos aparecem conforme scroll)
    function revealOnScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('active');
            }
        });
    }
    
    // Verifica revelação de elementos durante scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Executa a verificação inicial
    revealOnScroll();
    
    // Adiciona a classe para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}); 