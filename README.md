# Trabalho 3 – Autômato Finito Não Determinístico (AFN)

Aluno **Jean Da Rocha**

## Descrição

Este projeto é um simulador de **Autômato Finito Não Determinístico (AFN)** desenvolvido para a disciplina de Teoria da Computação.  
O sistema permite que o usuário informe a quíntupla \( M = (Q, \Sigma, \delta, q_0, F) \), visualize o diagrama do AFN e teste cadeias de entrada para verificar se são aceitas ou rejeitadas pelo autômato.

## O que o sistema faz

- Permite testar:
  - Conjunto de estados \(Q\) (ex.: `q0, q1, q2, qf`);
  - Alfabeto de entrada \(\Sigma\) (ex.: `a, b` ou `0, 1, vazio`);
    - Gera uma **tabela de transição dos estados** 
- Aceita transições em vazio, representadas por `vazio` (convertido para λ no diagrama);
- Desenha o **diagrama do AFN** (estado inicial, transições e estados finais destacados);
- Permite **simular cadeias**, indicando se a palavra é **ACEITA** ou **REJEITADA** pelo AFN.


## Vídeo de demonstração

Um vídeo curto mostrando o funcionamento do sistema e um exemplo de teste de aceitação de cadeias:

🔗 https://youtu.be/URufs1-r8-k?si=25ktMN6Gp5VMoSdN