import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
createServer({
  models: {
    transaction: Model
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Código Limpo',
          type: 'withdraw',
          amount: 87,
          category: 'Livros',
          createdAt: new Date('2022-12-12 09:00:00')
        },
        {
          id: 2,
          title: 'Freelance de Website',
          type: 'deposit',
          amount: 7000,
          category: 'Trabalho',
          createdAt: new Date('2022-12-16 11:00:00')
        }
      ]
    });
  },
  routes(){
    this.namespace = 'api';

    this.get('/transactions', ()=>{
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
