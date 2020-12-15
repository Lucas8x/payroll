import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';
import DatePicker from 'react-date-picker';

import './styles.css';
import api from '../../services/api';
import Input from '../../components/Input';

export default function CreateEmployee() {
  const history = useHistory();

  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(true);
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo_id, setCargoID] = useState(null);
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [rg, setRG] = useState('');
  const [cargos, setCargos] = useState([]);

  const [avatarURL, setAvatarURL] = useState('');
  const [error, setError] = useState('');

  function handleCreateEmployee(e) {
    e.preventDefault();

    /*setError('');

    if (!nome || !cpf || !telefone || !cargo || !dataNascimento || !rg) {
      return setError('Todos os campos são obrigatórios');
    }*/

    const data_nascimento = dataNascimento
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '')
      .split(' ')[0];

    const data = new FormData();
    data.append('active', active);
    data.append('nome', nome);
    data.append('cpf', cpf);
    data.append('telefone', telefone);
    data.append('cargo_id', parseInt(cargo_id));
    data.append('avatar', avatar || '');
    data.append('data_nascimento', data_nascimento);
    data.append('rg', rg);

    api
      .post('funcionarios', data)
      .then(() => {
        alert('Cadastrado com sucesso');
        history.push('/employees');
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

  function handleAvatar(e) {
    const files = e.target.files;
    setAvatar(files[0]);
    const url = URL.createObjectURL(files[0]);
    setAvatarURL(url);
  }

  useEffect(() => {
    api.get('/cargos').then((response) => {
      setCargos(response.data);
    });
  }, []);

  return (
    <div className='create-employee-page'>
      <form onSubmit={handleCreateEmployee}>
        <fieldset>
          <legend>Dados do funcionario</legend>
          <label className='avatar'>
            <Plus size={38} color='white' />
            <input
              type='file'
              name='avatar'
              id='avatar'
              onChange={handleAvatar}
            />
            {avatarURL && <img src={avatarURL} alt='' id='avatarImg' />}
          </label>
          <Input
            name='Nome'
            label='Nome completo'
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
          <Input
            name='CPF'
            label='CPF'
            value={cpf}
            type='number'
            onChange={(e) => {
              setCPF(e.target.value);
            }}
          />
          <Input
            name='Telefone'
            label='Telefone'
            value={telefone}
            type='number'
            onChange={(e) => {
              setTelefone(e.target.value);
            }}
          />
          <Input
            name='rg'
            label='RG'
            value={rg}
            type='number'
            onChange={(e) => {
              setRG(e.target.value);
            }}
          />
          <div className='input-block'>
            <label htmlFor='data_nascimento'>Data Nascimento</label>
            <>
              <DatePicker
                name='data_nascimento'
                onChange={setDataNascimento}
                value={dataNascimento}
                dayPlaceholder='dd'
                monthPlaceholder='mm'
                yearPlaceholder='yyyy'
              />
            </>
          </div>
        </fieldset>

        <fieldset>
          <legend>Cargo</legend>
          <select onChange={(e) => setCargoID(e.target.value)}>
            <option value='' disabled hidden>
              Selecione o cargo
            </option>
            {cargos.map((cargo_item) => (
              <option key={cargo_item.id} value={cargo_item.id}>
                {cargo_item.nome}
              </option>
            ))}
          </select>
        </fieldset>

        <footer>
          <button type='submit'>Cadastrar</button>
        </footer>
      </form>
    </div>
  );
}
