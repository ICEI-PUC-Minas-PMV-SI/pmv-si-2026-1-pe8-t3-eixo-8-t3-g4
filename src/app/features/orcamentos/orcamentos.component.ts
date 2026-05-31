import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

interface Projeto {
  id_projeto: number;
  id_cliente: number;
  nome: string;
  orcamento: string;
  dataInicio: string;
}

interface DetalhamentoProjeto {
  projeto: Projeto;
  cliente: { id: number; nome: string };
}

interface MaterialItem {
  id: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
}

interface InsumoLista {
  id: number;
  nome: string;
  precoAtual: number;
  unidade: string;
}

interface ItemOrcamento {
  id: number;
  insumo: InsumoLista;
  precoUnitario: number;
  quantidade: number;
}

interface Orcamento {
  id: number;
  id_projeto: number;
  id_usuario: number;
  custo_total: number;
  margem_lucro: number;
  data_criacao: string;
  itensOrcamento: ItemOrcamento[];
}

interface AtualizarOrcamentoParte2Request {
  id_orcamento: number;
  margem_lucro: number;
  data_criacao: string;
}

interface CriarOrcamentoVazio {
  id_projeto: number;
  id_usuario: number;
}

interface RegistrarItemOrcamentoRequest {
  idOrcamento: number;
  idInsumo: number;
  quantidade: number;
  precoUnitario: number;
}

interface AtualizarItemOrcamentoRequest {
  id: number;
  idOrcamento: number;
  quantidade: number;
  precoUnitario: number;
}

interface ExcluirItemOrcamentoRequest {
  id: number;
}



@Component({
  selector: 'app-orcamentos',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './orcamentos.component.html',
  styleUrl: './orcamentos.component.scss'
})
export class OrcamentosComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  step = 1;
  selectedMaterialId = '';
  selectedProjetoId = '';
  projetoNome = '';
  projetoCliente = '';
  projetoData = '';
  projetoMargem = 15;


  listaInsumos: InsumoLista[] = [
    /*{ id: 1, nome: 'Vergalhão de Aço (#4, 20ft)', precoAtual: 18.75, unidade: 'unidade' },
    { id: 2, nome: 'Cimento Portland (saco de 50kg)', precoAtual: 12.50, unidade: 'saco' },
    { id: 3, nome: 'Bloco Cerâmico 14x19x29', precoAtual: 4.20, unidade: 'unidade' },
    { id: 4, nome: 'Tinta Acrílica Semibrilho 18L', precoAtual: 189.00, unidade: 'galão' },
    { id: 5, nome: 'Madeira de Pinus 6m', precoAtual: 32.00, unidade: 'metro' },
    { id: 6, nome: 'Tubo PVC 100mm (6m)', precoAtual: 28.50, unidade: 'metro' },*/
  ];

  itensSelecionados: MaterialItem[] = [
    /*{ id_projeto: 1, id: 1, nome: 'Vergalhão de Aço (#4, 20ft)', precoUnitario: 18.75, quantidade: 1 },
    { id_projeto: 1, id: 2, nome: 'Cimento Portland (saco de 50kg)', precoUnitario: 12.50, quantidade: 1 },*/
  ];

  projetos: Projeto[] = [
    /*{ id_projeto: 1, id_cliente: 1, nome: 'Reforma do Escritório Central', orcamento: 'R$525.000', dataInicio: '15-03-2026' },
    { id_projeto: 2, id_cliente: 1, nome: 'Complexo Residencial - Fase 2', orcamento: 'R$950.000', dataInicio: '05-01-2026' },
    { id_projeto: 3, id_cliente: 1, nome: 'Expansão do Armazém', orcamento: 'R$580.000', dataInicio: '20-02-2026' },*/
  ];

  detalhamentoprojetos: DetalhamentoProjeto[] = [
    /*{ projeto: { id_projeto: 1, id_cliente: 1, nome: 'Reforma do Escritório Central', orcamento: 'R$525.000', dataInicio: '15-03-2026' }, cliente: { id: 1, nome: 'Anderson Construction LLC' } },
    { projeto: { id_projeto: 2, id_cliente: 1, nome: 'Complexo Residencial - Fase 2', orcamento: 'R$950.000', dataInicio: '05-01-2026' }, cliente: { id: 1, nome: 'Anderson Construction LLC' } },
    { projeto: { id_projeto: 3, id_cliente: 1, nome: 'Expansão do Armazém', orcamento: 'R$580.000', dataInicio: '20-02-2026' }, cliente: { id: 1, nome: 'Anderson Construction LLC' } },*/
  ];

  listaOrcamentos: Orcamento[] = [
  /*{ id_orcamento: 1, id_projeto: 1, id_usuario: 1, custo_total: 525000, data_criacao: '2026-03-15', itensOrcamento: [
    { id: 1, nome: 'Vergalhão de Aço (#4, 20ft)', precoUnitario: 18.75, quantidade: 100 },
    { id: 2, nome: 'Cimento Portland (saco de 50kg)', precoUnitario: 12.50, quantidade: 200 }] },
   */ ];

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.recuperarListaInsumos();
    this.recuperarInsumosSelecionados();
    this.recuperarDadosProjetos();
    this.recuperarDadosOrcamentos();
  }

  private resposta: any;

  //INTEGRAÇÃO COM A API - PRODUTOS


  recuperarListaInsumos() {
    // O interceptor vai adicionar o token automaticamente
    this.http.get(`${environment.apiUrl}/insumo`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.listaInsumos = this.resposta.content;
            console.log('Insumos atualizados:', this.listaInsumos);
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }

  //INTEGRAÇÃO COM A API - PRODUTOS

  recuperarInsumosSelecionados() {
    // O interceptor vai adicionar o token automaticamente
    this.http.get(`${environment.apiUrl}/insumo`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.listaInsumos = this.resposta.content;
            console.log('Insumos atualizados:', this.listaInsumos);
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }



  //INTEGRAÇÃO COM A API - PROJETOS

  recuperarDadosProjetos() {
    this.http.get(`${environment.apiUrl}/projeto`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.projetos = this.resposta.content;
            console.log('Projetos recuperados:', this.projetos);

            // para cada projeto recuperado da base de dados, inicializar um 'detalhamentoProjeto' com os dados do projeto e cliente vazio
            this.detalhamentoprojetos = this.projetos.map((projeto: Projeto) => ({
              projeto: projeto,
              cliente: { id: projeto.id_cliente, nome: '' }
            }));


            // para cada projeto, recuperar o cliente associado
            this.detalhamentoprojetos.forEach((projeto: DetalhamentoProjeto) => {
              const id = projeto.projeto.id_projeto;
              const id_cliente = this.projetos.find(p => p.id_projeto === id)?.id_cliente;
              if (id_cliente) {
                this.http.get(`${environment.apiUrl}/cliente/${id_cliente}`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
                  .subscribe({
                    next: (clienteResponse) => {
                      const clienteData = clienteResponse as any;
                      projeto.cliente = { id: clienteData.id, nome: clienteData.nome }; // Atualiza o cliente do projeto com os dados completos
                      console.log(`Cliente atualizado para projeto ${projeto.projeto.id_projeto}:`, projeto);
                      this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
                    },
                    error: (error) => {
                      console.error(`Erro ao recuperar cliente para projeto ${projeto.projeto.id_projeto}:`, error);
                    }
                  });
              } else {
                console.warn(`Cliente não encontrado para projeto ${projeto.projeto.id_projeto}`);
              }
            });
            console.log('Projetos atualizados:', this.detalhamentoprojetos);
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }


  // sempre que um projeto for selecionado, projetoMargem deve ser atualizado para ter o valor da margem de lucro recuperada através da API para o orçamento selecionado. Se a margem de lucro do projeto for NULL, não fazer a alteração
  lerMargemDoProjetoSelecionado() {
    const id_projeto = Number(this.selectedProjetoId);
    const orcamento = this.listaOrcamentos.find(o => o.id_projeto === id_projeto);
    if (orcamento && orcamento.margem_lucro !== null) {
      this.projetoMargem = orcamento.margem_lucro;
    }
  }

  //INTEGRAÇÃO COM A API - ORCAMENTOS

  // os orçamentos estão sendo recuperados de forma incorreta. O id_projeto está sendo atribuido a "id_usuario". Faça a correção e, por enquanto, registre "id_usuario" sempre como 1
  recuperarDadosOrcamentos() {
    this.http.get(`${environment.apiUrl}/orcamento`,
       { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.listaOrcamentos = this.resposta.content;
            console.log('PARA VERIFICAÇAO - Orçamentos recuperados:', this.resposta.content);

            //para cada orcamento, recuperar os itens já inseridos nele e adicionar ao objeto do orçamento
            this.listaOrcamentos.forEach((orcamento: Orcamento) => {
              const id_orcamento = orcamento.id;
              console.log(`Recuperando itens para orçamento ${id_orcamento}...`);
              this.http.get(`${environment.apiUrl}/item_orcamento/orcamento/${id_orcamento}`,
                 { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
                .subscribe({
                  next: (itensResponse) => {
                    const itensData = itensResponse as any;
                    orcamento.itensOrcamento = itensData.content.map((item: any) => ({
                      id: item.id,
                      nome: this.listaInsumos.find(i => i.id === item.idInsumo)?.nome || 'Nome do insumo não encontrado',
                      precoUnitario: item.precoUnitario,
                      quantidade: item.quantidade,
                      // para cada item, recuperar os dados do insumo conforme a interface 'InsumoLista' e adicionar ao objeto do item do orçamento
                      insumo: {
                        id: item.idInsumo,
                        nome: this.listaInsumos.find(i => i.id === item.idInsumo)?.nome || 'Nome do insumo não encontrado',
                        precoAtual: this.listaInsumos.find(i => i.id === item.idInsumo)?.precoAtual || 0,
                        unidade: this.listaInsumos.find(i => i.id === item.idInsumo)?.unidade || 'Unidade não encontrada'
                      }
                    }));
                    console.log(`Itens do orçamento ${id_orcamento} atualizados:`, orcamento.itensOrcamento);
                    this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
                  },
                  error: (error) => {
                    console.error(`Erro ao recuperar itens para orçamento ${id_orcamento}:`, error);
                  }
                });
              });

              console.log('Orçamentos recuperados:', this.listaOrcamentos);
              this.cdr.detectChanges();
            }
          },
          error: (error) => {
            console.error('Erro:', error);
          }
        });
  }

// sempre que um orçamento for selecionado, refazer a consulta à API para atualizar os itens e atualizar a view para que os itens do orçamento selecionado sejam os únicos que aparecem na tela
  exibirItensProjetoSelecionado() {
    const id_projeto = Number(this.selectedProjetoId);
    const orcamento = this.listaOrcamentos.find(o => o.id_projeto === id_projeto);
    if (orcamento) {
      console.log(`Orçamento encontrado para projeto ${id_projeto}:`, orcamento);
      // Atualiza os itens selecionados com os itens do orçamento encontrado
      this.itensSelecionados = orcamento.itensOrcamento.map(item => ({
        id: item.id,
        nome: this.listaInsumos.find(i => i.id === item.insumo.id)?.nome || 'Nome do insumo não encontrado',
        precoUnitario: item.precoUnitario,
        quantidade: item.quantidade
      }));
      console.log('Itens selecionados atualizados:', this.itensSelecionados);
      this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
    } else {
      console.warn(`Nenhum orçamento encontrado para projeto ${id_projeto}`);
      this.itensSelecionados = []; // Limpa os itens selecionados se nenhum orçamento for encontrado
      this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
    }
  }

  // a criação de um novo projeto deve atender à interface 'CriarOrcamentoVazio', sendo que, por enquanto, o id_usuario pode ser fixo, sempre no valor 1, e o id_projeto deve ser o id do projeto selecionado
  criarOrcamentoParaProjeto(id_projeto: number) {
    const requestBody: CriarOrcamentoVazio = {
      id_projeto: id_projeto,
      id_usuario: 1
    };

    // verifique se o projeto já tem um orçamento antes de prosseguir
    if (this.listaOrcamentos.some(o => o.id_projeto === id_projeto)) {
      console.warn(`O projeto ${id_projeto} já tem um orçamento.`);
      return;
    }

    this.http.post(`${environment.apiUrl}/orcamento`, requestBody, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Orçamento criado com sucesso:', response);
          // Após criar o orçamento, recuperar os dados dos orçamentos para atualizar a lista e permitir a adição de itens ao novo orçamento
          this.recuperarDadosOrcamentos();
          this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
        },
        error: (error) => {
          console.error('Erro ao criar orçamento:', error);
        }
      });
  }

  // na parte 2 do Assistente de Orçamento, deve ser possível atualizar a data de início e a margem de lucro através da interface 'AtualizarOrcamentoParte2Request'. Para isso, crie um método que faça uma chamada para a API no endpoint "/orcamento", com o verbo PUT, para atualizar os dados do orçamento do projeto selecionado. O id do orçamento a ser atualizado pode ser recuperado da lista de orçamentos, buscando pelo id_projeto igual ao id do projeto selecionado.
  atualizarOrcamentoParte2() {
    console.warn("A FUNÇÃO FOI CHAMADA");
    const id_projeto = Number(this.selectedProjetoId);
    const orcamento = this.listaOrcamentos.find(o => o.id_projeto === id_projeto);

    if (!orcamento) {
      console.error(`Nenhum orçamento encontrado para o projeto ${id_projeto}. Certifique-se de criar um orçamento antes de atualizar seus dados.`);
      return;
    }

    const requestBody: AtualizarOrcamentoParte2Request = {
      id_orcamento: orcamento.id,
      margem_lucro: this.projetoMargem,
      data_criacao: orcamento.data_criacao
    };

    this.http.put(`${environment.apiUrl}/orcamento`, requestBody, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Orçamento atualizado com sucesso:', response);
          // Após atualizar o orçamento, recuperar os dados dos orçamentos para atualizar a lista e refletir as mudanças
          this.recuperarDadosOrcamentos();
          this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
        },
        error: (error) => {
          console.error('Erro ao atualizar orçamento:', error);
        }
      });
  }

  // crie um método para ser usado sempre que um item for adicionado. Sempre que isso acontecer, deverá ser feita uma chamada para a API no endpoint "/item_orcamento" para adicionar o item ao orçamento do projeto selecionado.
  // o corpo da requisição deve atender à interface 'RegistrarItemOrcamentoRequest'
  adicionarItemAoOrcamento(item: MaterialItem) {
    const id_projeto = Number(this.selectedProjetoId);

    this.criarOrcamentoParaProjeto(id_projeto);

    const orcamento = this.listaOrcamentos.find(o => o.id_projeto === id_projeto);

    if (!orcamento) {
      console.error(`Nenhum orçamento encontrado para o projeto ${id_projeto}. Certifique-se de criar um orçamento antes de adicionar itens.`);
      return;
    }

    

    const requestBody: RegistrarItemOrcamentoRequest = {
      idOrcamento: orcamento.id,
      idInsumo: item.id,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario
    };

    this.http.post(`${environment.apiUrl}/item_orcamento`, requestBody, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Item adicionado ao orçamento com sucesso:', response);
          // Após adicionar o item, atualizar a lista de itens do orçamento para refletir a mudança
          this.recuperarDadosOrcamentos();
          this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
        },
        error: (error) => {
          console.error('Erro ao adicionar item ao orçamento:', error);
        }
      });
  }


  // sempre que a quantidade de um item for alterada, deve ser feita uma chamada para a API no endpoint "/item_orcamento" para atualizar a quantidade do item no orçamento do projeto selecionado. O corpo da requisição deve atender à interface 'RegistrarItemOrcamentoRequest', e o método HTTP deve ser PUT.
  atualizarItemOrcamento(item: MaterialItem) {
    const id_projeto = Number(this.selectedProjetoId);
    const orcamento = this.listaOrcamentos.find(o => o.id_projeto === id_projeto);

    if (!orcamento) {
      console.error(`Nenhum orçamento encontrado para o projeto ${id_projeto}. Certifique-se de criar um orçamento antes de atualizar itens.`);
      return;
    }

    const requestBody: AtualizarItemOrcamentoRequest = {
      id: item.id,
      idOrcamento: orcamento.id,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario
    };

    this.http.put(`${environment.apiUrl}/item_orcamento`, requestBody, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Item do orçamento atualizado com sucesso:', response);
          // Após atualizar o item, atualizar a lista de itens do orçamento para refletir a mudança
          this.recuperarDadosOrcamentos();
          this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
        },
        error: (error) => {
          console.error('Erro ao atualizar item do orçamento:', error);
        }
      });
  }

  // sempre que um item for excluído, deve ser feita uma chamada para a API no endpoint "/item_orcamento", com o verbo DELETE, atendendo à interface 'ExcluirItemOrcamentoRequest'
  excluirItemOrcamento(id: number) {
    const requestBody: ExcluirItemOrcamentoRequest = {
      id: id
    };

    this.http.request('delete', `${environment.apiUrl}/item_orcamento`, { body: requestBody, headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Item do orçamento excluído com sucesso:', response);
          // Após excluir o item, atualizar a lista de itens do orçamento para refletir a mudança
          this.recuperarDadosOrcamentos();
          this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
        },
        error: (error) => {
          console.error('Erro ao excluir item do orçamento:', error);
        }
      });
  }


  get subtotal(): number {
    return this.itensSelecionados.reduce((sum, i) => sum + i.precoUnitario * i.quantidade, 0);
  }

  get margem(): number {
    return this.subtotal * (this.projetoMargem / 100);
  }

  get finalTotal(): number {
    return this.subtotal + this.margem;
  }

  get subtotalStr(): string { return this.formatMoney(this.subtotal); }
  get margemStr(): string { return this.formatMoney(this.margem); }
  get totalStr(): string { return this.formatMoney(this.finalTotal); }
  

  
  formatMoney(val: number): string {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  itemTotal(item: MaterialItem): string {
    return this.formatMoney(item.precoUnitario * item.quantidade);
  }

  addMaterial() {
    const id = Number(this.selectedMaterialId);
    if (!id) return;
    const mat = this.listaInsumos.find(m => m.id === id);
    if (!mat) return;
    const existing = this.itensSelecionados.find(i => i.id === id);
    if (existing) {
      return;
    } else {
      const newItem: MaterialItem = {
        id: mat.id,
        nome: mat.nome,
        precoUnitario: mat.precoAtual,
        quantidade: 1
      };
      this.itensSelecionados.push(newItem);
      const itemOrcamento: ItemOrcamento = {
        id: newItem.id,
        insumo: {
          id: mat.id,
          nome: mat.nome,
          precoAtual: mat.precoAtual,
          unidade: mat.unidade
        },
        precoUnitario: newItem.precoUnitario,
        quantidade: newItem.quantidade
      };
      this.adicionarItemAoOrcamento(newItem);
    }
    this.selectedMaterialId = '';
  }

  removeMaterial(id: number) {
    this.itensSelecionados = this.itensSelecionados.filter(i => i.id !== id);
    this.excluirItemOrcamento(id);
  }

  onQtyChange(item: MaterialItem) {
    if (item.quantidade < 1) item.quantidade = 1;
    this.atualizarItemOrcamento(item);
  }

  onProjetoChange() {
    this.exibirItensProjetoSelecionado();
    this.lerMargemDoProjetoSelecionado();
  }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

}
