import React, { useState } from 'react';

function Passo2() {
  const [nome, setNome] = useState('');

  return (
    <div className="passo1">
      <h3>Passo 2: Informações Iniciais</h3>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      {/* Você pode adicionar mais campos aqui */}
    </div>
  );
}

export default Passo2;
