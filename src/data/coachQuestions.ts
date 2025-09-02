export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const questions: QuizQuestion[] = [
  {
    question: "Qual é a melhor mão inicial no Texas Hold'em?",
    options: ["A♠A♥", "K♠Q♠", "7♣2♦"],
    correct: 0,
    explanation: "Par de ases é a melhor mão inicial."
  },
  {
    question: "Quantas cartas comunitárias são reveladas no flop?",
    options: ["2", "3", "4"],
    correct: 1,
    explanation: "O flop revela três cartas."
  },
  {
    question: "O que significa VPIP?",
    options: ["Voluntariamente colocar dinheiro no pote", "Valor de probabilidade implícita", "Variação padrão"],
    correct: 0,
    explanation: "VPIP mede a porcentagem de mãos que o jogador decide jogar."
  },
  {
    question: "Qual posição age primeiro pós-flop?",
    options: ["Small Blind", "Big Blind", "UTG"],
    correct: 0,
    explanation: "Após o flop, o small blind age primeiro."
  },
  {
    question: "Qual é o objetivo do c-bet?",
    options: ["Proteger mãos fortes", "Continuar a iniciativa da aposta pré-flop", "Aumentar o pote com nuts"],
    correct: 1,
    explanation: "A continuation bet mantém a iniciativa do agressor pré-flop."
  },
  {
    question: "Qual a probabilidade aproximada de acertar um flush draw até o river?",
    options: ["35%", "50%", "63%"],
    correct: 0,
    explanation: "Um flush draw no flop acerta cerca de 35% das vezes até o river."
  },
  {
    question: "O que é 3-bet?",
    options: ["A terceira carta do flop", "Um re-raise pré-flop", "Triplicar o pote"],
    correct: 1,
    explanation: "3-bet é um re-raise antes do flop."
  },
  {
    question: "Qual mão tem maior valor: straight ou flush?",
    options: ["Straight", "Flush", "Depende"],
    correct: 1,
    explanation: "Flush é superior ao straight no ranking de mãos."
  },
  {
    question: "Quantas outs possui um open-ended straight draw?",
    options: ["4", "8", "9"],
    correct: 1,
    explanation: "Um open-ended straight draw tem 8 outs."
  },
  {
    question: "O que significa 'tilt'?",
    options: ["Jogador agressivo", "Estado emocional que afeta decisões", "Estratégia GTO"],
    correct: 1,
    explanation: "Tilt descreve um estado emocional negativo que prejudica o jogo."
  },
  {
    question: "Qual é o número máximo de jogadores em uma mesa full ring?",
    options: ["6", "8", "9"],
    correct: 2,
    explanation: "Uma mesa full ring possui até 9 jogadores."
  },
  {
    question: "O que é PFR?",
    options: ["Pre-Flop Raise", "Post-Flop Reaction", "Pot Final Result"],
    correct: 0,
    explanation: "PFR mede a porcentagem de mãos em que o jogador aumenta pré-flop."
  },
  {
    question: "Qual par de cartas é conhecido como 'cowboys'?",
    options: ["QQ", "KK", "AA"],
    correct: 1,
    explanation: "O par de reis (KK) é apelidado de 'cowboys'."
  },
  {
    question: "Qual é o ranking de mãos mais alto?",
    options: ["Flush", "Straight Flush", "Four of a Kind"],
    correct: 1,
    explanation: "Straight flush é apenas superado por royal flush."
  },
  {
    question: "Qual é a melhor ação em late position com mãos marginais?",
    options: ["Fold sempre", "Abrir mais mãos", "Só pagar"],
    correct: 1,
    explanation: "Em late position podemos abrir um range mais amplo."
  },
  {
    question: "Quantas cartas um jogador recebe no Omaha?",
    options: ["2", "3", "4"],
    correct: 2,
    explanation: "No Omaha cada jogador recebe quatro cartas."
  },
  {
    question: "Qual é o buy-in típico de um torneio freeroll?",
    options: ["0", "1", "10"],
    correct: 0,
    explanation: "Freerolls não exigem buy-in."
  },
  {
    question: "Qual ajuste fazer contra um jogador muito loose?",
    options: ["Jogar mais tight", "Jogar mais loose", "Blefar mais"],
    correct: 0,
    explanation: "Contra jogadores loose, devemos jogar mais tight e extrair valor."
  },
  {
    question: "Quantas combinações tem um pocket pair específico?",
    options: ["3", "6", "12"],
    correct: 1,
    explanation: "Cada pocket pair tem 6 combinações possíveis."
  },
  {
    question: "Qual mão inicial é apelidada de 'Big Slick'?",
    options: ["AK", "AQ", "KQ"],
    correct: 0,
    explanation: "A combinação AK é conhecida como 'Big Slick'."
  },
  {
    question: "Qual a probabilidade aproximada de receber um par no pré-flop?",
    options: ["3%", "6%", "12%"],
    correct: 1,
    explanation: "Recebemos um par inicial cerca de 6% das vezes."
  },
  {
    question: "O que significa 'fold equity'?",
    options: ["Equidade do stack", "Chance do oponente desistir", "Valor esperado de blefes"],
    correct: 1,
    explanation: "Fold equity é a chance de ganhar quando o oponente folda."
  },
  {
    question: "Em torneios, o que representa 'ICM'?",
    options: ["Independent Chip Model", "International Championship Main", "Initial Chip Metric"],
    correct: 0,
    explanation: "ICM avalia o valor dos stacks em termos de premiação."
  },
  {
    question: "Qual é a melhor mão: flush de Ás alto ou straight de Rei alto?",
    options: ["Flush", "Straight", "Empate"],
    correct: 0,
    explanation: "Flush é superior a straight."
  },
  {
    question: "O que é uma 4-bet?",
    options: ["Quarta carta do board", "Segundo re-raise", "Quatro vezes o big blind"],
    correct: 1,
    explanation: "4-bet é o segundo re-raise em uma rodada."
  },
  {
    question: "O que é 'the nuts'?",
    options: ["A melhor mão possível", "Uma mão especulativa", "Uma mão perdida"],
    correct: 0,
    explanation: "'The nuts' é a melhor mão possível em determinada situação."
  },
  {
    question: "O que significa 'check-raise'?",
    options: ["Checar e depois aumentar", "Checar duas vezes seguidas", "Checar e pagar"],
    correct: 0,
    explanation: "Check-raise é checar e, após aposta do oponente, aumentar."
  },
  {
    question: "Quantas outs tem um flush draw no flop?",
    options: ["7", "9", "13"],
    correct: 1,
    explanation: "Um flush draw possui 9 outs."
  },
  {
    question: "Qual é o pote mínimo para fazer uma aposta de valor?",
    options: ["Depende da mão", "Metade do pote", "Uma big blind"],
    correct: 0,
    explanation: "O tamanho da aposta de valor depende da situação e da mão."
  },
  {
    question: "Qual mão é mais forte: full house ou four of a kind?",
    options: ["Full house", "Four of a kind", "Ambas iguais"],
    correct: 1,
    explanation: "Four of a kind vence um full house."
  },
  {
    question: "O que é 'bankroll'?",
    options: ["Stack na mão", "Dinheiro reservado para jogar", "Lucro total"],
    correct: 1,
    explanation: "Bankroll é o dinheiro reservado exclusivamente para o poker."
  },
  {
    question: "Qual estratégia é melhor contra jogadores passivos?",
    options: ["Blefar mais", "Valor apostar mais", "Jogar menos mãos"],
    correct: 1,
    explanation: "Contra jogadores passivos, faça mais value bets."
  },
  {
    question: "O que é 'slow play'?",
    options: ["Jogar mãos fracas rápido", "Disfarçar mão forte jogando passivamente", "Blefar no river"],
    correct: 1,
    explanation: "Slow play é agir passivamente com mão forte para induzir apostas."
  },
  {
    question: "Quantas cartas o dealer queima antes de cada rua?",
    options: ["0", "1", "2"],
    correct: 1,
    explanation: "O dealer queima uma carta antes de cada rua."
  },
  {
    question: "Qual posição é considerada a melhor na mesa?",
    options: ["UTG", "Middle", "Button"],
    correct: 2,
    explanation: "O botão atua por último pós-flop, sendo a melhor posição."
  },
  {
    question: "O que significa 'pot odds'?",
    options: ["Relação entre stack e blinds", "Relação entre aposta a pagar e tamanho do pote", "Probabilidade de ganhar a mão"],
    correct: 1,
    explanation: "Pot odds comparam o valor a pagar com o pote atual."
  },
  {
    question: "Qual é a sequência correta de ações pré-flop?",
    options: ["Fold, call, raise", "Call, raise, fold", "Raise, call, fold"],
    correct: 0,
    explanation: "As opções de ação são fold, call ou raise."
  },
  {
    question: "O que é 'overpair'?",
    options: ["Par na mão maior que cartas do board", "Par formado no board", "Dois pares na mão"],
    correct: 0,
    explanation: "Overpair é um par na mão maior que qualquer carta comunitária."
  },
  {
    question: "Qual é a quantidade de blinds de um stack curto?",
    options: ["Menos de 40bb", "Menos de 20bb", "Menos de 10bb"],
    correct: 1,
    explanation: "Stacks com menos de 20 blinds são considerados curtos."
  },
  {
    question: "O que é 'freeroll'?",
    options: ["Torneio sem rake", "Torneio gratuito com premiação", "Torneio somente para profissionais"],
    correct: 1,
    explanation: "Freerolls são torneios gratuitos que oferecem prêmios."
  },
  {
    question: "Qual é a melhor ação com 'nuts' no river?",
    options: ["Check", "Fold", "Apostar/raise"],
    correct: 2,
    explanation: "Com a melhor mão, devemos apostar ou aumentar para extrair valor."
  },
  {
    question: "O que significa 'cold call'?",
    options: ["Pagar sem ter investido antes", "Pagar uma aposta após aumentar", "Pagar com mão muito forte"],
    correct: 0,
    explanation: "Cold call é pagar uma aposta sem ter colocado fichas anteriormente."
  },
  {
    question: "O que é um 'bad beat'?",
    options: ["Perder com mão forte para mão improvável", "Ganhar com blefe", "Foldar a melhor mão"],
    correct: 0,
    explanation: "Bad beat ocorre quando uma mão forte perde para uma mão improvável."
  },
  {
    question: "Qual a probabilidade de flopar um set com par na mão?",
    options: ["2%", "12%", "17%"],
    correct: 1,
    explanation: "Um pocket pair acerta um set no flop cerca de 12% das vezes."
  },
  {
    question: "O que é 'rake'?",
    options: ["Comissão da casa por pote", "Aposta mínima", "Tipo de blefe"],
    correct: 0,
    explanation: "Rake é a comissão cobrada pela casa em cada pote."
  },
  {
    question: "Qual mão é conhecida como 'snowmen'?",
    options: ["88", "77", "99"],
    correct: 0,
    explanation: "O par de oitos é apelidado de 'snowmen'."
  },
  {
    question: "O que é 'gutshot' straight draw?",
    options: ["Straight draw com 4 outs", "Straight draw com 8 outs", "Flush draw"],
    correct: 0,
    explanation: "Gutshot é um straight draw interno com 4 outs."
  },
  {
    question: "O que significa 'MTT'?",
    options: ["Multi Table Tournament", "Medium Tilt Table", "Minimum Time Tournament"],
    correct: 0,
    explanation: "MTT é a sigla para torneios disputados em várias mesas."
  },
  {
    question: "Qual é a aposta inicial obrigatória no Texas Hold'em?",
    options: ["Bring-in", "Blind", "Ante"],
    correct: 1,
    explanation: "O jogo utiliza blinds como apostas obrigatórias."
  },
  {
    question: "Qual a estratégia ideal com stack muito profundo (>200bb)?",
    options: ["Jogar muitas mãos especulativas", "Jogar apenas mãos premium", "Aumentar tamanho das apostas"],
    correct: 0,
    explanation: "Stacks profundos permitem jogar mãos especulativas por valor implícito."
  }
];
