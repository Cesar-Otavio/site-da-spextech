// Seleciona o header
const header = document.getElementById('header');

// Define a altura em que o efeito será aplicado (em pixels)
const scrollTrigger = 100; // Altere conforme necessário

// Função para adicionar/remover a classe ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > scrollTrigger) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animação ao rolar até a seção Sobre Nós
const sobreSection = document.querySelector('.teste');

window.addEventListener('scroll', () => {
    const sectionTop = sobreSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
        sobreSection.classList.add('animate');
    }
});

//--------------------------------

// Função para trocar de imagem no carrossel
let count = 1;
const totalSlides = document.querySelectorAll('.slide').length;
document.getElementById("radio1").checked = true;

function mudarSlide(direcao) {
    if (direcao === 'proximo') {
        count++;
        if (count > totalSlides) {
            count = 1;
        }
    } else if (direcao === 'anterior') {
        count--;
        if (count < 1) {
            count = totalSlides;
        }
    }
    document.getElementById("radio" + count).checked = true;
}

const setaEsquerda = document.querySelector('.seta.esquerda');
const setaDireita = document.querySelector('.seta.direita');

if (setaEsquerda && setaDireita) {
    setaEsquerda.addEventListener('click', () => {
        mudarSlide('anterior');
    });

    setaDireita.addEventListener('click', () => {
        mudarSlide('proximo');
    });
} else {
    console.error("Setas não encontradas!");
}

//--------------------------------

// Função para verificar se uma seção está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Função para verificar se uma seção está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Função para ativar a animação das seções
function animateSections() {
    const sections = document.querySelectorAll('.secao-animada');

    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('animate');
        }
    });
}

// Ativar a animação ao carregar a página e ao rolar
window.addEventListener('load', animateSections);
window.addEventListener('scroll', animateSections);

//--------------------------------

// Animação fade-in geral do site
document.addEventListener("DOMContentLoaded", () => {
    fadeInOnScroll();
    window.addEventListener("scroll", fadeInOnScroll);
});

function fadeInOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add("visible");
        }
    });
}

//--------------------------------

// botão topo
document.addEventListener("DOMContentLoaded", () => {
    const btnTopo = document.getElementById("btn-topo");

    window.addEventListener("scroll", () => {
        // Verifica se o usuário passou da metade da página
        if (window.scrollY > window.innerHeight / 2) {
            btnTopo.classList.add("show");
        } else {
            btnTopo.classList.remove("show");
        }
    });

    // Quando o botão for clicado, volta ao topo suavemente
    btnTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

//--------------------------------

// Menu mobile
function toggleMenu() {
    const menu = document.querySelector(".nv_navegacao");
    menu.classList.toggle("active");
}

// Seleciona os elementos do menu
const menu = document.querySelector(".nv_navegacao");
const menuToggle = document.querySelector(".menu-toggle");
const links = document.querySelectorAll(".link_navegacao");

// Função para abrir e fechar o menu
function toggleMenu() {
    menu.classList.toggle("active");
}

// Fecha o menu ao clicar em um link
links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove("active");
    }
});
