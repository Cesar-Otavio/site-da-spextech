const qaPairs = {
  "1": "Ótimo! Podemos desenvolver soluções personalizadas para sua empresa, como sistemas de gestão, automação de processos, e-commerce, aplicativos móveis e muito mais. Conte-nos mais sobre o que você precisa!",
  "2": "Que bom que já nos conhece! A SpexTech é especializada em desenvolvimento de software por demanda para pequenas empresas que ainda não têm tecnologia ou automação. Como podemos ajudar você hoje?",
  "3": "Claro! Nossos atendentes estão prontos para ajudar. Por favor, nos informe seu nome e e-mail para entrarmos em contato com você.",
  "default": "Desculpe, não entendi. Por favor, digite 1, 2 ou 3 para continuar."
};

// Função para obter a resposta do chatbot
function getAnswer(question) {
  return qaPairs[question] || qaPairs["default"];
}

// Função para alternar a visibilidade do chat
function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
  
  // Esconde a notificação e para a animação de flutuação quando o chat é aberto
  hideNotification();
  stopFloatAnimation();
}

// Função para enviar uma mensagem
function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (message === '') return;
  
  const chatBody = document.getElementById('chatBody');
  chatBody.innerHTML += `<p><strong>Você:</strong> ${message}</p>`;
  input.value = '';
  
  // Simula um delay para o chatbot "processar" a mensagem
  setTimeout(() => {
    handleUserResponse(message);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Mostra a notificação e inicia a animação de flutuação
    showNotification();
    startFloatAnimation();
  }, 500);
}

// Função para mostrar a notificação
function showNotification() {
  const notification = document.getElementById('notification');
  const chatBox = document.getElementById('chatBox');
  
  // Mostra a notificação apenas se o chat estiver fechado
  if (chatBox.style.display === 'none') {
    notification.style.display = 'flex';
  }
}

// Função para esconder a notificação
function hideNotification() {
  const notification = document.getElementById('notification');
  notification.style.display = 'none';
}

// Função para iniciar a animação de flutuação
function startFloatAnimation() {
  const chatBubble = document.querySelector('.chat-bubble');
  const chatBox = document.getElementById('chatBox');
  
  // Inicia a animação apenas se o chat estiver fechado
  if (chatBox.style.display === 'none') {
    chatBubble.classList.add('float');
  }
}

// Função para parar a animação de flutuação
function stopFloatAnimation() {
  const chatBubble = document.querySelector('.chat-bubble');
  chatBubble.classList.remove('float');
}

// Função para gerenciar o fluxo da conversa
function handleUserResponse(message) {
  const chatBody = document.getElementById('chatBody');
  
  if (!window.chatState) {
    // Estado inicial: Apresentação e primeira pergunta
    chatBody.innerHTML += `
      <p><strong>Boltz:</strong> Olá! Bem-vindo à SpexTech. Somos especializados em desenvolvimento de software por demanda para pequenas empresas que ainda não têm tecnologia ou automação. Como podemos ajudar você hoje?</p>
      <p><strong>Boltz:</strong> Por favor, escolha uma opção:</p>
      <p><strong>1</strong> - Qual é o tipo de solução em software que você precisa?</p>
      <p><strong>2</strong> - Você já conhece a SpexTech?</p>
      <p><strong>3</strong> - Quer fazer um orçamento direto com nossos atendentes?</p>
    `;
    window.chatState = "awaitingResponse";
  } else if (window.chatState === "awaitingResponse") {
    // Resposta do usuário às opções iniciais
    const botAnswer = getAnswer(message);
    chatBody.innerHTML += `<p><strong>Boltz:</strong> ${botAnswer}</p>`;
    
    if (message === "3") {
      // Se o usuário escolher a opção 3, solicitar nome e e-mail
      chatBody.innerHTML += `<p><strong>Boltz:</strong> Por favor, informe seu nome e e-mail para entrarmos em contato.</p>`;
      window.chatState = "collectingContact";
    } else {
      // Reiniciar o estado para novas perguntas
      window.chatState = null;
    }
  } else if (window.chatState === "collectingContact") {
    // Coletar informações de contato
    chatBody.innerHTML += `<p><strong>Boltz:</strong> Obrigado! Nossos atendentes entrarão em contato em breve.</p>`;
    window.chatState = null;
  }
}

// Mensagem de boas-vindas ao carregar o site
window.onload = function() {
  const chatBody = document.getElementById('chatBody');
  chatBody.innerHTML = ''; // Limpa o conteúdo inicial do chat
  
  // Envia a mensagem de boas-vindas e as perguntas iniciais
  chatBody.innerHTML += `
    <p><strong>Boltz:</strong> Olá! Bem-vindo à SpexTech. Somos especializados em desenvolvimento de software por demanda para pequenas empresas que ainda não têm tecnologia ou automação. Como podemos ajudar você hoje?</p>
    <p><strong>Boltz:</strong> Por favor, escolha uma opção:</p>
    <p><strong>1</strong> - Qual é o tipo de solução em software que você precisa?</p>
    <p><strong>2</strong> - Você já conhece a SpexTech?</p>
    <p><strong>3</strong> - Quer fazer um orçamento direto com nossos atendentes?</p>
  `;
  
  // Mostra a notificação e inicia a animação de flutuação
  showNotification();
  startFloatAnimation();
};