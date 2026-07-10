# IVLinG

## O que é isto

IVLinG é o início de uma plataforma conceptual de interpretação de Língua Gestual Portuguesa. Este repositório contém a peça que já está construída: uma ferramenta de recolha de dados.

## O que esta app faz (e o que não faz)

- Grava clips de vídeo da webcam do utilizador
- O utilizador escolhe manualmente, de uma lista fixa, a palavra que está a gesticular
- Envia o vídeo etiquetado para um bucket S3, para futuramente construir um dataset

**Não** faz reconhecimento automático de gestos nem usa IA para identificar o que está a ser gesticulado — a etiquetagem é sempre manual, feita pela pessoa que grava.

## Stack

React (Create React App) + AWS S3 (upload via URLs assinados, gerados por uma função serverless em `/api`, sem credenciais expostas no frontend).

## Desenvolvimento local

```
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000) no browser.

## Variáveis de ambiente

O endpoint `/api/get-upload-url` precisa destas variáveis de ambiente do lado do servidor (nunca no frontend):

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`
