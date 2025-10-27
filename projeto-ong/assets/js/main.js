document.addEventListener('DOMContentLoaded', () => {
    
    // --- CÓDIGO DO MENU RESPONSIVO E ACESSÍVEL ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            mainMenu.classList.toggle('menu-active');
            menuToggle.setAttribute('aria-expanded', !isMenuOpen);
        });
    }

    // --- LÓGICA DE ENVIO DO FORMULÁRIO DE VOLUNTÁRIO ---
    const voluntarioForm = document.getElementById('form-voluntario');
    const notification = document.getElementById('notification');

    // A verificação 'if' garante que o código só rode se os elementos existirem na página
    if (voluntarioForm && notification) {
        
        voluntarioForm.addEventListener('submit', function(event) {
            
            // ESTA É A LINHA MAIS IMPORTANTE: Impede o envio padrão e o erro 405
            event.preventDefault();

            // Mostra a notificação customizada
            notification.textContent = 'Cadastro Enviado com Sucesso!';
            notification.classList.add('show');

            // Esconde a notificação após 3 segundos
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);

            // Limpa os campos do formulário
            voluntarioForm.reset();
        });
    }

    // --- CÓDIGO DAS MÁSCARAS DE FORMULÁRIO ---
    const cpfInput = document.querySelector('#cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }
    const telInput = document.querySelector('#telefone');
    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11);
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
    const cepInput = document.querySelector('#cep');
    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 8);
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
        cepInput.addEventListener('blur', (e) => {
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.querySelector('#rua').value = data.logradouro;
                            document.querySelector('#bairro').value = data.bairro;
                            document.querySelector('#cidade').value = data.localidade;
                            document.querySelector('#estado').value = data.uf;
                        }
                    })
                    .catch(error => console.error('Erro ao buscar CEP:', error));
            }
        });
    }
});