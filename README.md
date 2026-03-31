#  Jogo de Pênalti em Canvas (HTML5 + JavaScript)

##  Descrição do Projeto

Este projeto é um jogo simples de cobrança de pênalti desenvolvido utilizando **HTML5 Canvas** e **JavaScript**.

O jogador controla a bola e pode chutar em direção ao gol utilizando o mouse. Um goleiro se movimenta automaticamente tentando defender as cobranças. O sistema contabiliza gols e exibe mensagens de acordo com o resultado da jogada.

O projeto foi desenvolvido com foco no uso de **transformações geométricas 2D**, animação e manipulação de estado em jogos.

---

##  Funcionalidades

- Movimento da bola com o mouse  
- Controle lateral da bola com o teclado (setas)  
- Goleiro com movimento automático  
- Sistema de colisão (defesa do goleiro)  
- Detecção de gol ou erro  
- Sistema de pontuação (placar)  
- Animação contínua com `requestAnimationFrame`  

---

## Estrutura do Projeto

### 1. Estado do jogo

Objetos principais:

- `bola`: posição, escala (profundidade), rotação e movimento  
- `goleiro`: posição, tamanho e direção  
- `placar` e `mensagem`  

---

### 2. Funções de desenho

- `desenhaGol()`  
- `desenhaGoleiro()`  
- `desenhaBola()`  

Todas utilizam **coordenadas relativas (0,0)**, permitindo o uso eficiente de transformações.

---

### 3. Loop de animação

Função principal:

```js
function animar()
```

Responsável por:

- Limpar a tela  
- Atualizar lógica do jogo  
- Aplicar transformações  
- Redesenhar os elementos  

Utiliza:

```js
requestAnimationFrame(animar);
```

---

## Transformações Utilizadas

O projeto faz uso intensivo das transformações do Canvas 2D:

---

###  1. Translação (`translate`)

Move o sistema de coordenadas para posicionar objetos na tela.

```js
ctx.translate(goleiro.x, goleiro.y);
```

```js
ctx.translate(bola.x, bola.y);
```

---

###  2. Escala (`scale`)

Altera o tamanho dos objetos, simulando profundidade.

```js
ctx.scale(bola.z, bola.z);
```

---

###  3. Rotação (`rotate`)

Aplica rotação na bola para simular movimento.

```js
ctx.rotate(bola.angulo);
```

---

###  4. Transformação composta (Sombra)

```js
ctx.translate(bola.x, bola.y + 40);
ctx.scale(bola.z * 1.5, 0.4);
ctx.translate(-bola.x, -(bola.y + 40));
```

---

###  5. Salvamento e restauração (`save` / `restore`)

```js
ctx.save();
// transformações
ctx.restore();
```

---

###  6. Reset de transformações

```js
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

---

##  Tecnologias Utilizadas

- HTML5 Canvas  
- JavaScript  

---

##  Autor - João Carlos Barbosa Da Silva