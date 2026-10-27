// Central de Peças - Frontend Vanilla JS
const API_URL = '/api/items';

// Elementos do DOM
const form = document.getElementById('item-form');
const inputId = document.getElementById('item-id');
const inputName = document.getElementById('item-name');
const inputPrice = document.getElementById('item-price');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnSubmitText = document.getElementById('btn-submit-text');
const btnCancel = document.getElementById('btn-cancel');
const btnRefresh = document.getElementById('btn-refresh');

const alertContainer = document.getElementById('alert-container');
const loadingElement = document.getElementById('loading');
const emptyStateElement = document.getElementById('empty-state');
const tableElement = document.getElementById('items-table');
const tbodyElement = document.getElementById('items-tbody');

// Formatação monetária em BRL
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

// Exibir alertas de feedback (sucesso ou erro)
function showAlert(message, type = 'success') {
  alertContainer.innerHTML = '';

  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;

  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  alertDiv.appendChild(messageSpan);

  const closeButton = document.createElement('button');
  closeButton.className = 'alert-close';
  closeButton.setAttribute('aria-label', 'Fechar');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => alertDiv.remove());
  alertDiv.appendChild(closeButton);

  alertContainer.appendChild(alertDiv);

  // Auto-remover após 5 segundos
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Carregar todas as peças (GET /api/items)
async function loadItems() {
  loadingElement.style.display = 'block';
  emptyStateElement.style.display = 'none';
  tableElement.style.display = 'none';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha ao buscar as peças.`);
    }

    const items = await response.json();
    renderTable(items);
  } catch (error) {
    showAlert(error.message || 'Não foi possível carregar as peças.', 'error');
  } finally {
    loadingElement.style.display = 'none';
  }
}

// Renderizar tabela de peças usando textContent (seguro contra XSS)
function renderTable(items) {
  tbodyElement.innerHTML = '';

  if (!items || items.length === 0) {
    emptyStateElement.style.display = 'block';
    tableElement.style.display = 'none';
    return;
  }

  emptyStateElement.style.display = 'none';
  tableElement.style.display = 'table';

  items.forEach(item => {
    const tr = document.createElement('tr');

    // Coluna ID
    const tdId = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'badge-id';
    badge.textContent = `#${item.id}`;
    tdId.appendChild(badge);
    tr.appendChild(tdId);

    // Coluna Nome
    const tdName = document.createElement('td');
    tdName.textContent = item.name;
    tr.appendChild(tdName);

    // Coluna Preço
    const tdPrice = document.createElement('td');
    const priceSpan = document.createElement('span');
    priceSpan.className = 'price-tag';
    priceSpan.textContent = currencyFormatter.format(item.price);
    tdPrice.appendChild(priceSpan);
    tr.appendChild(tdPrice);

    // Coluna Ações
    const tdActions = document.createElement('td');
    tdActions.style.textAlign = 'center';

    // Botão Editar
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-sm btn-edit';
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => startEdit(item.id));
    tdActions.appendChild(editBtn);

    // Botão Excluir
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-sm btn-delete';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => deleteItem(item.id, item.name));
    tdActions.appendChild(deleteBtn);

    tr.appendChild(tdActions);
    tbodyElement.appendChild(tr);
  });
}

// Iniciar edição de uma peça (GET /api/items/{id})
async function startEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Peça não encontrada para edição.');
      }
      throw new Error(`Erro ${response.status}: Não foi possível carregar a peça.`);
    }

    const item = await response.json();

    inputId.value = item.id;
    inputName.value = item.name;
    inputPrice.value = item.price;

    formTitle.textContent = `Editar Peça #${item.id}`;
    btnSubmitText.textContent = 'Salvar Alterações';
    btnCancel.style.display = 'inline-flex';

    inputName.focus();
    form.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    showAlert(error.message, 'error');
  }
}

// Cancelar modo de edição
function cancelEdit() {
  form.reset();
  inputId.value = '';
  formTitle.textContent = 'Cadastrar Nova Peça';
  btnSubmitText.textContent = 'Cadastrar Peça';
  btnCancel.style.display = 'none';
}

// Submeter formulário (POST /api/items ou PUT /api/items/{id})
async function handleFormSubmit(event) {
  event.preventDefault();

  const name = inputName.value.trim();
  const price = parseFloat(inputPrice.value);
  const id = inputId.value ? parseInt(inputId.value, 10) : null;

  if (!name || isNaN(price) || price < 0) {
    showAlert('Por favor, informe um nome válido e um preço maior ou igual a zero.', 'error');
    return;
  }

  btnSubmit.disabled = true;

  try {
    if (id) {
      // Modo Edição: PUT /api/items/{id}
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Peça não encontrada para atualização.');
        }
        throw new Error(`Erro ${response.status} ao atualizar a peça.`);
      }

      showAlert(`Peça "${name}" atualizada com sucesso!`, 'success');
      cancelEdit();
      await loadItems();
    } else {
      // Modo Cadastro: POST /api/items
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao cadastrar a peça.`);
      }

      showAlert(`Peça "${name}" cadastrada com sucesso!`, 'success');
      form.reset();
      await loadItems();
    }
  } catch (error) {
    showAlert(error.message, 'error');
  } finally {
    btnSubmit.disabled = false;
  }
}

// Excluir peça com confirmação (DELETE /api/items/{id})
async function deleteItem(id, name) {
  const confirmed = window.confirm(`Deseja realmente excluir a peça "${name}" (ID #${id})?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Peça não encontrada para exclusão.');
      }
      throw new Error(`Erro ${response.status} ao excluir a peça.`);
    }

    showAlert(`Peça "${name}" excluída com sucesso!`, 'success');

    // Se a peça excluída estava em edição, limpa o formulário
    if (inputId.value === String(id)) {
      cancelEdit();
    }

    await loadItems();
  } catch (error) {
    showAlert(error.message, 'error');
  }
}

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
btnCancel.addEventListener('click', cancelEdit);
btnRefresh.addEventListener('click', loadItems);

// Carga inicial
document.addEventListener('DOMContentLoaded', loadItems);
