/**
 * Máscaras de Input - Quintal do Céu
 * Implementação de máscaras para CPF, Telefone e CEP
 */

// Máscara para CPF: 000.000.000-00
function maskCPF(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length <= 3) {
    input.value = value;
  } else if (value.length <= 6) {
    input.value = value.substring(0, 3) + '.' + value.substring(3);
  } else if (value.length <= 9) {
    input.value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6);
  } else {
    input.value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
  }
}

// Máscara para Telefone: (00) 00000-0000 ou (00) 0000-0000
function maskPhone(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length <= 2) {
    input.value = value ? '(' + value : '';
  } else if (value.length <= 6) {
    input.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
  } else if (value.length <= 10) {
    input.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6);
  } else {
    input.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
  }
}

// Máscara para CEP: 00000-000
function maskCEP(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length <= 5) {
    input.value = value;
  } else {
    input.value = value.substring(0, 5) + '-' + value.substring(5, 8);
  }
}

// Inicializar máscaras quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Máscara para CPF
  const cpfInput = document.getElementById('cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', function(e) {
      maskCPF(e.target);
    });
  }
  
  // Máscara para Telefone
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      maskPhone(e.target);
    });
  }
  
  // Máscara para CEP
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('input', function(e) {
      maskCEP(e.target);
    });
  }
});
