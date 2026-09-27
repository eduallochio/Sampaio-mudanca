import type { StaticImageData } from "next/image"
import type { ReactNode } from "react"
import checklistImg from "@/assets/dicas/checklist.jpg"
import frageisImg from "@/assets/dicas/frageis.jpg"
import etiquetarImg from "@/assets/dicas/etiquetar.jpg"

export type Dica = {
  slug: string
  title: string
  description: string
  excerpt: string
  image: StaticImageData
  imageAlt: string
  /** Tempo estimado de leitura, em minutos (ajuste manualmente ao editar o conteúdo). */
  readingMinutes: number
  content: ReactNode
}

// Para publicar uma dica nova, adicione um item neste array.
export const dicas: Dica[] = [
  {
    slug: "checklist-mudanca",
    title: "Checklist da Mudança: O Guia Completo",
    description:
      "Um guia passo a passo para organizar sua mudança sem estresse, desde 4 semanas antes até o grande dia.",
    excerpt:
      "Não sabe por onde começar? Criamos um checklist completo para você organizar todas as etapas da sua mudança, desde a triagem de itens até a alteração de endereço nos serviços.",
    image: checklistImg,
    imageAlt: "Caixas organizadas para mudança",
    readingMinutes: 5,
    content: (
      <>
        <p>
          Organizar uma mudança pode parecer uma tarefa gigantesca, mas com um bom planejamento, tudo flui de maneira
          mais tranquila. Preparamos um checklist detalhado, baseado em nossa experiência em Vila Velha e região, para
          ajudar você a não esquecer de nada.
        </p>

        <h2>4 Semanas Antes da Mudança</h2>
        <p>O planejamento começa bem antes do dia do caminhão chegar. Esta é a fase de organização geral.</p>
        <ul>
          <li>
            <strong>Defina o orçamento:</strong> Saiba quanto você pode investir na mudança, incluindo o transporte e
            possíveis novos itens.
          </li>
          <li>
            <strong>Pesquise e contrate:</strong> Este é o momento ideal para solicitar seu orçamento com a Sampaio
            Fretes e Mudanças e garantir sua data.
          </li>
          <li>
            <strong>Comece a triagem:</strong> Separe o que será doado, vendido ou descartado. Menos itens significam
            uma mudança mais rápida e econômica.
          </li>
          <li>
            <strong>Organize documentos:</strong> Reúna documentos importantes (pessoais, da casa nova, etc.) em uma
            pasta de fácil acesso.
          </li>
        </ul>

        <h2>2 Semanas Antes da Mudança</h2>
        <p>Com a data se aproximando, é hora de começar a empacotar e resolver as pendências burocráticas.</p>
        <ul>
          <li>
            <strong>Providencie materiais:</strong> Adquira caixas de papelão de vários tamanhos, fita adesiva, plástico
            bolha e canetas marcadoras. Lembre-se que nossos pacotes já podem incluir isso!
          </li>
          <li>
            <strong>Comece a empacotar:</strong> Embale itens que você não usa com frequência, como livros, roupas de
            outra estação e decorações.
          </li>
          <li>
            <strong>Notifique as mudanças de endereço:</strong> Altere o endereço de correspondências, assinaturas,
            contas de consumo (água, luz, internet) e serviços bancários.
          </li>
        </ul>

        <h2>A Semana da Mudança</h2>
        <p>A contagem regressiva começou! O foco agora é nos detalhes finais.</p>
        <ul>
          <li>
            <strong>Prepare a &ldquo;Caixa da Primeira Noite&rdquo;:</strong> Separe uma caixa com itens essenciais que
            você precisará assim que chegar na casa nova: roupas de cama, toalhas, itens de higiene pessoal,
            carregadores de celular, um kit básico de limpeza e alguns lanches.
          </li>
          <li>
            <strong>Descongele a geladeira e o freezer:</strong> Faça isso 24 a 48 horas antes da mudança para evitar
            vazamentos.
          </li>
          <li>
            <strong>Confirme os detalhes:</strong> Entre em contato conosco para confirmar o horário de chegada da equipe
            e repassar os últimos detalhes.
          </li>
          <li>
            <strong>Separe objetos de valor:</strong> Joias, documentos importantes e notebooks devem ser transportados
            por você, em seu carro pessoal.
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "embalar-frageis",
    title: "Como Embalar Itens Frágeis Corretamente",
    description:
      "Aprenda as técnicas corretas para embalar pratos, copos, quadros e outros itens frágeis para garantir que cheguem intactos ao seu destino.",
    excerpt:
      "Aprenda as técnicas e os materiais certos para proteger seus pratos, copos e objetos de decoração. Evite surpresas desagradáveis ao abrir as caixas no novo lar.",
    image: frageisImg,
    imageAlt: "Pessoa embalando um objeto frágil",
    readingMinutes: 4,
    content: (
      <>
        <p>
          Um dos maiores medos durante uma mudança é encontrar um item querido quebrado ao abrir uma caixa. A boa
          notícia é que, com a técnica e os materiais certos, é possível proteger praticamente tudo. Veja nossas dicas
          profissionais.
        </p>

        <h2>Materiais Essenciais</h2>
        <ul>
          <li>
            <strong>Caixas resistentes:</strong> Dê preferência a caixas de papelão de parede dupla para itens mais
            pesados ou muito frágeis.
          </li>
          <li>
            <strong>Plástico bolha:</strong> Seu melhor amigo para proteger superfícies e absorver impactos.
          </li>
          <li>
            <strong>Papel de embalagem (ou jornal):</strong> Ótimo para preencher espaços vazios e embalar
            individualmente.
          </li>
          <li>
            <strong>Fita adesiva de qualidade:</strong> Para garantir que as caixas fiquem bem fechadas.
          </li>
          <li>
            <strong>Etiquetas &ldquo;FRÁGIL&rdquo;:</strong> Deixe claro para a equipe de mudança quais caixas exigem
            mais cuidado.
          </li>
        </ul>

        <h2>Técnica para Pratos e Copos</h2>
        <p>A cozinha costuma ter a maior quantidade de itens frágeis. A técnica correta faz toda a diferença.</p>
        <ul>
          <li>
            <strong>Prepare a caixa:</strong> Forre o fundo da caixa com uma camada de plástico bolha ou papel amassado
            para criar uma &ldquo;cama&rdquo; macia.
          </li>
          <li>
            <strong>Embale pratos na vertical:</strong> Enrole cada prato individualmente em papel ou plástico bolha. Ao
            colocá-los na caixa, posicione-os de lado (na vertical), como se estivessem em um escorredor. Eles são muito
            mais resistentes a impactos nessa posição.
          </li>
          <li>
            <strong>Copos e taças:</strong> Enrole cada um individualmente. Coloque um pouco de papel amassado dentro
            dos copos maiores para dar mais estrutura. Posicione-os sempre de pé (com a boca para baixo) na caixa.
          </li>
          <li>
            <strong>Preencha os espaços:</strong> Use papel amassado ou toalhas de pano para preencher todos os espaços
            vazios na caixa. Nada deve se mover quando você a balança suavemente.
          </li>
        </ul>

        <h2>Protegendo Quadros, Espelhos e TVs</h2>
        <p>Objetos grandes e planos precisam de uma proteção especial nas quinas e na superfície.</p>
        <ul>
          <li>
            <strong>Proteja as quinas:</strong> Use protetores de quina de papelão ou isopor. Se não tiver, dobre várias
            camadas de papelão e fixe com fita.
          </li>
          <li>
            <strong>Enrole com plástico bolha:</strong> Dê várias voltas com plástico bolha em toda a peça.
          </li>
          <li>
            <strong>Técnica do &ldquo;X&rdquo; (opcional):</strong> Em espelhos e vidros grandes, alguns especialistas
            recomendam fazer um &ldquo;X&rdquo; de ponta a ponta com fita crepe. Isso não impede a quebra, mas ajuda a
            manter os cacos no lugar caso o pior aconteça.
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "etiquetar-caixas",
    title: "A Importância de Etiquetar Suas Caixas",
    description:
      "Saiba como etiquetar suas caixas de mudança de forma eficiente, indicando cômodo, conteúdo e fragilidade.",
    excerpt:
      "Uma dica simples que economiza horas de trabalho na hora de desempacotar. Saiba como etiquetar suas caixas de forma eficiente, indicando o cômodo e o conteúdo.",
    image: etiquetarImg,
    imageAlt: "Caixa com a etiqueta 'cozinha'",
    readingMinutes: 4,
    content: (
      <>
        <p>
          Pode parecer um detalhe pequeno, mas um bom sistema de etiquetagem é o segredo para uma pós-mudança tranquila.
          Imagine chegar na casa nova, cansado, e não ter ideia de onde está a cafeteira ou o pijama. Uma etiqueta
          clara resolve esse problema e otimiza o trabalho da equipe de transporte.
        </p>

        <h2>Por que Etiquetar é Crucial?</h2>
        <ul>
          <li>
            <strong>Economia de tempo:</strong> Você e a equipe de mudança saberão exatamente em qual cômodo cada caixa
            deve ser deixada.
          </li>
          <li>
            <strong>Priorização:</strong> Fica fácil identificar as caixas que precisam ser abertas primeiro (como a
            &ldquo;Caixa da Primeira Noite&rdquo;).
          </li>
          <li>
            <strong>Segurança:</strong> A identificação de &ldquo;FRÁGIL&rdquo; alerta sobre o conteúdo e a necessidade
            de manuseio cuidadoso.
          </li>
          <li>
            <strong>Redução de estresse:</strong> Saber onde encontrar cada coisa diminui a ansiedade de viver em meio a
            um mar de caixas de papelão.
          </li>
        </ul>

        <h2>O Sistema de Etiquetagem Ideal</h2>
        <p>
          Para ser eficiente, uma etiqueta precisa ter três informações principais. Use uma caneta marcadora de ponta
          grossa para garantir a visibilidade.
        </p>

        <h3>1. O Cômodo de Destino</h3>
        <p>
          Escreva em letras grandes o nome do cômodo onde a caixa deve ser colocada. Por exemplo:{" "}
          <strong>COZINHA, QUARTO CASAL, ESCRITÓRIO.</strong>
        </p>

        <h3>2. O Conteúdo da Caixa</h3>
        <p>
          Logo abaixo do nome do cômodo, liste de forma resumida o conteúdo principal. Isso ajuda você a encontrar itens
          específicos sem ter que abrir tudo. Por exemplo: <strong>Panelas e potes plásticos</strong> ou{" "}
          <strong>Livros de suspense e decoração</strong>.
        </p>

        <h3>3. Indicação de Fragilidade ou Posição</h3>
        <p>
          Se a caixa contém itens frágeis, escreva <strong>FRÁGIL</strong> em letras grandes e, se possível, em mais de
          uma face da caixa. Para caixas com itens que não podem ser virados, indique com setas para cima e a palavra{" "}
          <strong>ESTE LADO PARA CIMA</strong>.
        </p>

        <h2>Dica de Ouro: O Sistema de Cores</h2>
        <p>
          Para uma organização ainda mais visual, atribua uma cor para cada cômodo. Você pode usar fitas adesivas
          coloridas ou comprar etiquetas de cores diferentes. Por exemplo:
        </p>
        <ul>
          <li>
            <strong>Verde:</strong> Cozinha
          </li>
          <li>
            <strong>Azul:</strong> Quartos
          </li>
          <li>
            <strong>Vermelho:</strong> Sala de Estar
          </li>
          <li>
            <strong>Amarelo:</strong> Banheiros
          </li>
        </ul>
        <p>
          Dessa forma, a equipe pode identificar o destino da caixa de longe, agilizando todo o processo de descarga e
          organização na sua nova casa em Vila Velha.
        </p>
      </>
    ),
  },
]

export function getDica(slug: string) {
  return dicas.find((d) => d.slug === slug)
}
