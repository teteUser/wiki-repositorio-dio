import logo from '../assets/github-logo-64x64.png';
import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';
import { useState } from 'react';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    if(!currentRepo){
      alert("Digite algo!");
    }else{
      await api.get(`repos/${currentRepo}`)
      .then((result) => {
        let data = result.data;
        console.log(data);
        if(data.id){
          const isExist = repos.find(repo => repo.id === data.id);
          if(!isExist){
            setRepos(prev => [...prev, data]);
            setCurrentRepo('')
            return
          }
          alert('Repositório já está na lista');
        }
      })
      .catch(() => {
        alert('Repositório não encontrado');
      })
    }
    
    
  }


  return (
    <Container>
      <img src={logo} alt="logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo repo={repo}/>)}
    </Container>
  );
}

export default App;