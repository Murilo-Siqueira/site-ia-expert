/**
 * Script para funcionalidades interativas do site AI Expert
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Mobile Toggle ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (mobileMenuButton && mainNavUl) {
        mobileMenuButton.addEventListener('click', () => {
            // Alterna a classe 'nav-active' na lista UL
            mainNavUl.classList.toggle('nav-active');

            // Alterna o atributo aria-expanded para acessibilidade
            const isExpanded = mainNavUl.classList.contains('nav-active');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);

            // Opcional: Alternar classe no botão para mudar ícone (ex: hambúrguer para X)
            mobileMenuButton.classList.toggle('menu-open');
        });

        // Fechar o menu se um link for clicado (útil em SPAs ou navegação na mesma página)
        mainNavUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavUl.classList.contains('nav-active')) {
                    mainNavUl.classList.remove('nav-active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileMenuButton.classList.remove('menu-open');
                }
            });
        });

         // Fechar o menu se clicar fora dele (opcional)
         document.addEventListener('click', (event) => {
            const isClickInsideNav = mainNavUl.contains(event.target);
            const isClickOnButton = mobileMenuButton.contains(event.target);

            if (!isClickInsideNav && !isClickOnButton && mainNavUl.classList.contains('nav-active')) {
                mainNavUl.classList.remove('nav-active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.classList.remove('menu-open');
            }
        });
    }

    // --- (Opcional) Animação de Scroll Simples (sem bibliotecas externas) ---
    // Para usar isso, adicione a classe 'fade-in-element' aos elementos
    // que você quer animar no HTML e descomente este bloco.
    
    const fadeInElements = document.querySelectorAll('.fade-in-element');

    if (fadeInElements.length > 0) {
        const observerOptions = {
            root: null, // Relativo ao viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% do elemento visível para disparar
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Opcional: Animar apenas uma vez
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

        fadeInElements.forEach(el => {
            intersectionObserver.observe(el);
        });
    }
    
    // Adicione o CSS correspondente para .fade-in-element e .visible se usar esta opção:
    /*
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-element.visible {
        opacity: 1;
        transform: translateY(0);
    }
    */


    // --- (Opcional) Filtro Simples para Áreas de Atuação ---
    // Requereria adicionar botões com atributos data-filter no HTML (areas.html)
    // e atributos data-category nos cards.
    
    const filterButtons = document.querySelectorAll('.filter-container button');
    const areaCards = document.querySelectorAll('.area-card');

    if (filterButtons.length > 0 && areaCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                // Atualiza estado ativo dos botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filtra os cards
                areaCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex'; // Ou 'block', dependendo do display original
                         // Adicionar animação de entrada/saída seria mais complexo
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    

}); // Fim do DOMContentLoaded