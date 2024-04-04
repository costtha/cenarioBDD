describe("Criar uma nova tarefa", () => {
    it("Deve ser possível adicionar uma nova tarefa", () => {
        const tituloDaTarefa = "Compra pão";

        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#digite_sua_tarefa').click().type(tituloDaTarefa);
        cy.get('#criar_tarefa').click();
        cy.contains('.tarefas-cadastradas', tituloDaTarefa);
    });

    it("Deve exibir mensagem de erro ao tentar criar uma tarefa sem digitar nada", () => {
        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#criar_tarefa').click();
        cy.contains('.erro', 'Campo de tarefa é obrigatório');
        cy.get('.tarefas-cadastradas').should('not.exist');
    });

    it("Deve exibir mensagem de erro ao tentar criar uma tarefa com caracteres inválidos", () => {
        const tarefaComCaracteresInvalidos = "Tarefa com caracteres inválidos @!#";

        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#digite_sua_tarefa').click().type(tarefaComCaracteresInvalidos);
        cy.get('#criar_tarefa').click();
        cy.contains('.erro', 'Tarefa contém caracteres inválidos');
        cy.get('.tarefas-cadastradas').should('not.exist');
    });

    it("Deve cancelar a operação de criação de tarefa ao clicar em 'Cancelar'", () => {
        const tituloDaTarefa = "Compra pão";

        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#digite_sua_tarefa').click().type(tituloDaTarefa);
        cy.get('#cancelar').click();
        cy.get('.tarefas-cadastradas').should('not.exist');
    });

    it("Deve redirecionar para a página de tarefas cadastradas após criar uma nova tarefa", () => {
        const tituloDaTarefa = "Compra pão";

        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#digite_sua_tarefa').click().type(tituloDaTarefa);
        cy.get('#criar_tarefa').click();
        cy.url().should('include', '/tarefas-cadastradas');
        cy.contains('.tarefas-cadastradas', tituloDaTarefa);
    });

    it("Deve exibir mensagem de erro ao tentar criar uma tarefa com uma quantidade excessiva de caracteres", () => {
        const tarefaComExcessoDeCaracteres = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#digite_sua_tarefa').click().type(tarefaComExcessoDeCaracteres);
        cy.get('#criar_tarefa').click();
        cy.contains('.erro', 'Tarefa excede o limite de caracteres permitido');
        cy.get('.tarefas-cadastradas').should('not.exist');
    });

    it("Deve verificar se a nova tarefa está presente na lista de tarefas cadastradas após a criação", () => {
        const tituloDaTarefa = "Compra pão";

        cy.visit("http://127.0.0.1:5500/index.html");
        cy.get('#digite_sua_tarefa').click().type(tituloDaTarefa);
        cy.get('#criar_tarefa').click();
        cy.contains('.tarefas-cadastradas', tituloDaTarefa);
    });
});